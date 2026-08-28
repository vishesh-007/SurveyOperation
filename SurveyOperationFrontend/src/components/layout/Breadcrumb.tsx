import {
    Breadcrumb as FluentBreadcrumb,
    type IBreadcrumbItem,
    mergeStyleSets,
} from "@fluentui/react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

const styles = mergeStyleSets({
    container: {
        padding: "7px 10px",
        borderBottom: "1px solid #edebe9",
    },
});

const Breadcrumb = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const isSurvey =
        location.pathname === "/surveys";

    const isPracticeDataRequest =
        location.pathname ===
        "/practice-data-request";

    const currentPage =
        isPracticeDataRequest
            ? "Practice Data Request Form"
            : "Surveys";

    const items: IBreadcrumbItem[] = [
        {
            text: "Home",
            key: "home",
            onClick: () =>
                navigate("/surveys"),
        },

        {
            text: currentPage,
            key: location.pathname,
            isCurrentItem: true,
        },
    ];

    return (
        <div className={styles.container}>
            <FluentBreadcrumb
                items={items}
                ariaLabel={`${currentPage} breadcrumb`}
            />
        </div>
    );
};

export default Breadcrumb;