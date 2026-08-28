import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Spinner,
  SpinnerSize,
  Text,
  mergeStyleSets,
  type IDropdownOption,
} from "@fluentui/react";

import Breadcrumb from "../components/layout/Breadcrumb";
import DeleteDialog from "../components/common/DeleteDialog";
import SurveyTable from "../components/survey/SurveyTable";

import SurveyFilter, {
  type SurveyFilterValue,
} from "../components/survey/SurveyFilter";

import AddSurveyPanel from "../components/survey/AddSurveyPanel";

import {
  createSurvey,
  getSurveys,
  exportSurveys,
  deleteSurvey,
  updateSurvey
} from "../services/surveyServices";

import type {
  CreateSurveyDto,
  Survey,
  SurveyQueryDto,
} from "../types/survey";
import SurveyPagination from "../components/survey/SurveyPagination";
import SurveyToolbar from "../components/survey/SurveyToolbar";


const styles = mergeStyleSets({
  titleSection: {
    padding: "10px 14px 4px 14px",
  },

  title: {
    fontSize: 16,
    fontWeight: 600,
    color: "#323130",
  },

  tabs: {
    height: 35,
    display: "flex",
    alignItems: "flex-end",
    borderBottom: "1px solid #edebe9",
    paddingLeft: 10,
  },

  tab: {
    padding: "8px 12px",
    fontSize: 13,
    color: "#323130",
    cursor: "pointer",
    borderBottom: "2px solid #d83b01",
  },

  toolbar: {
    padding: "8px 10px",
    minHeight: 46,
    boxSizing: "border-box",
  },

  spacer: {
    flexGrow: 1,
  },

  search: {
    width: 180,
    marginRight: 8,
  },

  tableContainer: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
  },

  footer: {
    height: 52,
    borderTop: "1px solid #edebe9",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    boxSizing: "border-box",
  },

  pageInfo: {
    color: "#605e5c",
    fontSize: 12,
  },

  pagination: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  pageNumber: {
    minWidth: 28,
    textAlign: "center",
    padding: "4px 6px",
    cursor: "pointer",
    fontSize: 12,
  },

  activePage: {
    color: "#d83b01",
    fontWeight: 600,
    borderBottom: "2px solid #d83b01",
  },
});


const pageSizeOptions: IDropdownOption[] = [
  {
    key: 5,
    text: "5",
  },
  {
    key: 10,
    text: "10",
  },
  {
    key: 15,
    text: "15",
  },
  {
    key: 20,
    text: "20",
  },
  {
    key: 30,
    text: "30",
  },
];

const SurveyPage = () => {

  const filterButtonRef =
    useRef<HTMLDivElement>(null);

  const [showFilter, setShowFilter] =
    useState(false);

  const [filters, setFilters] =
    useState<Record<string, string>>({});

  const [showAddSurveyPanel, setShowAddSurveyPanel] =
    useState<boolean>(false);

  const [surveys, setSurveys] =
    useState<Survey[]>([]);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string>("");

  const [pageNumber, setPageNumber] =
    useState<number>(1);

  const [pageSize, setPageSize] =
    useState<number>(5);

  const [totalRecords, setTotalRecords] =
    useState<number>(0);

  const [totalPages, setTotalPages] =
    useState<number>(0);

  const [search, setSearch] =
    useState<string>("");

  const [debouncedSearch, setDebouncedSearch] =
    useState<string>("");

  const [sortBy, setSortBy] =
    useState<string>("");

  const [sortOrder, setSortOrder] =
    useState<string>("asc");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);



  const handleApplyFilter = (
    filter: SurveyFilterValue
  ) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [filter.key]: filter.value,
    }));

    setPageNumber(1);
    setShowFilter(false);
  };


  const handleRemoveFilter = (
    key: string
  ) => {
    setFilters((previousFilters) => {
      const updatedFilters = {
        ...previousFilters,
      };

      delete updatedFilters[key];

      return updatedFilters;
    });

    setPageNumber(1);
  };


  const handleClearFilters = () => {
    setFilters({});
    setPageNumber(1);
  };


  const handleSaveSurvey = async (
    data: CreateSurveyDto
  ) => {
    try {
      let response;

      if (editingSurvey) {
        response = await updateSurvey(
          editingSurvey.id,
          data
        );
      } else {
        response = await createSurvey(data);
      }

      if (!response.success) {
        setError(
          response.message ||
          "Failed to save survey."
        );

        return;
      }

      setShowAddSurveyPanel(false);
      setEditingSurvey(null);

      await fetchSurveys();

    } catch (error) {
      console.error(
        "Failed to save survey:",
        error
      );

      setError(
        editingSurvey
          ? "Failed to update survey."
          : "Failed to create survey."
      );
    }
  };



  const handleEditSurvey = (
    survey: Survey
  ) => {
    setEditingSurvey(survey);
    setShowAddSurveyPanel(true);
  };



  const handlePageSizeChange = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => {
    if (!option) {
      return;
    }

    setPageSize(option.key as number);
    setPageNumber(1);
  };



  //export csv
  const handleDownload = async () => {
    try {
      const query: SurveyQueryDto = {
        pageNumber: 1,
        pageSize: 30,

        search:
          debouncedSearch.trim() || undefined,

        filters:
          Object.keys(filters).length > 0
            ? filters
            : undefined,

        sortBy:
          sortBy || undefined,

        sortOrder:
          sortOrder || undefined,
      };

      const blob =
        await exportSurveys(query);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `Surveys-${new Date()
          .toISOString()
          .slice(0, 10)}.csv`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "Failed to download surveys:",
        error
      );
    }
  };




  //Delete
  const handleDeleteSurvey = async (
    survey: Survey
  ) => {
    setSelectedSurvey(survey);

    setShowDeleteDialog(true);
  };


  const confirmDeleteSurvey = async () => {
    if (!selectedSurvey) return;

    try {
      setLoading(true);

      const response =
        await deleteSurvey(selectedSurvey.id);

      if (!response.success) {
        setError(
          response.message ||
          "Failed to delete survey."
        );

        return;
      }

      setShowDeleteDialog(false);

      setSelectedSurvey(null);

      await fetchSurveys();

    } catch (error) {
      console.error(
        "Failed to delete survey:",
        error
      );

      setError(
        "Failed to delete survey."
      );
    }
    finally {
      setLoading(false);
    }
  }


  const cancelDeleteSurvey = async () => {
    setShowDeleteDialog(false);

    setSelectedSurvey(null);
  }



  const fetchSurveys = async () => {
    try {
      setLoading(true);
      setError("");

      const query: SurveyQueryDto = {
        pageNumber,
        pageSize,
        search: debouncedSearch.trim() || undefined,
        filters:
          Object.keys(filters).length > 0
            ? filters
            : undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
      };

      const response =
        await getSurveys(query);

      if (!response.success) {
        setError(
          response.message ||
          "Failed to retrieve surveys."
        );

        return;
      }

      if (!response.data) {
        setSurveys([]);
        setTotalRecords(0);
        setTotalPages(0);

        return;
      }

      setSurveys(response.data.items);

      setTotalRecords(
        response.data.totalRecords
      );

      setTotalPages(
        response.data.totalPages
      );
    } catch (error) {
      console.error(
        "Failed to retrieve surveys:",
        error
      );

      setError(
        "Failed to retrieve surveys."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSurveys();
  }, [
    pageNumber,
    pageSize,
    debouncedSearch,
    filters,
    sortBy,
    sortOrder,
  ]);


  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);



  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <Breadcrumb />

      <div className={styles.titleSection}>
        <Text className={styles.title}>
          Surveys
        </Text>
      </div>

      {/* <div className={styles.tabs}>
        <div className={styles.tab}>
          Surveys
        </div>
      </div> */}

      <SurveyToolbar
        search={search}
        hasFilters={
          Object.keys(filters).length > 0
        }
        activeFiltersText={
          Object.entries(filters)
            .map(
              ([key, value]) =>
                `${key} = ${value}`
            )
            .join(" | ")
        }
        onAddSurvey={() => {
          setEditingSurvey(null);
          setShowAddSurveyPanel(true);
        }}
        onRefresh={fetchSurveys}
        onDownload={handleDownload}
        onSearchChange={(value) => {
          setPageNumber(1);
          setSearch(value);
        }}
        onSearchClear={() => {
          setPageNumber(1);
          setSearch("");
        }}
        onAddFilter={() =>
          setShowFilter(true)
        }
        onClearFilters={handleClearFilters}
        filterButtonRef={filterButtonRef}
      />


      {showFilter && (
        <SurveyFilter
          target={filterButtonRef.current}
          onDismiss={() =>
            setShowFilter(false)
          }
          onApply={handleApplyFilter}
          onRemove={handleRemoveFilter}
        />
      )}


      {/* SurveyTable */}
      <div className={styles.tableContainer}>
        {loading ? (
          <Spinner
            size={SpinnerSize.medium}
            label="Loading surveys..."
          />
        ) : error ? (
          <Text
            styles={{
              root: {
                padding: 20,
                color: "#a4262c",
              },
            }}
          >
            {error}
          </Text>
        ) : <SurveyTable surveys={surveys} pageNumber={pageNumber} pageSize={pageSize} onDelete={handleDeleteSurvey} onEdit={handleEditSurvey} />}
      </div>



      {/*DeleteDialog*/}
      <DeleteDialog showDeleteDialog={showDeleteDialog} cancelDeleteSurvey={cancelDeleteSurvey} confirmDeleteSurvey={confirmDeleteSurvey} />



      {/* SurveyPagination component */}
      <SurveyPagination
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalRecords={totalRecords}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={handlePageSizeChange}
        onPageChange={setPageNumber}
      />



      {/* AddSurveyPanel */}
      <AddSurveyPanel
        isOpen={showAddSurveyPanel}
        editingSurvey={editingSurvey}
        onDismiss={() => {
          setShowAddSurveyPanel(false);
          setEditingSurvey(null);
        }}
        onSave={handleSaveSurvey}
      />
    </div>
  );
};

export default SurveyPage;