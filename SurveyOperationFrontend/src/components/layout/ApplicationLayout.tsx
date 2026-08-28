import {
    Outlet,
} from "react-router-dom";

import {
    mergeStyleSets,
} from "@fluentui/react";

import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

const styles = mergeStyleSets({
    page: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },

    body: {
        display: "flex",
        flex: 1,
        minHeight: 0,
    },

    content: {
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        backgroundColor: "#ffffff",
    },
});

const ApplicationLayout = () => {
    return (
        <div className={styles.page}>

            <TopHeader />

            <div className={styles.body}>

                <Sidebar />

                <main className={styles.content}>
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default ApplicationLayout;