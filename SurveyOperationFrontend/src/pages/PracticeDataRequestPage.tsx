import {
    mergeStyleSets,
} from "@fluentui/react";

import Breadcrumb
    from "../components/layout/Breadcrumb";

import PracticeDataRequestForm
    from "../components/practice/PracticeDataRequestForm";

const styles = mergeStyleSets({
    page: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },

    content: {
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
    },
});

const PracticeDataRequestPage = () => {
    return (
        <div className={styles.page}>

            <Breadcrumb />

            <div className={styles.content}>
                <PracticeDataRequestForm />
            </div>

        </div>
    );
};

export default PracticeDataRequestPage;