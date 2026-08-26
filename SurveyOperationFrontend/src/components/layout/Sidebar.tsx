import {
    IconButton,
    Text,
    mergeStyleSets,
} from "@fluentui/react";

import {
    ViewDashboardIcon,
    TaskManagerIcon,
    ContactIcon,
    DocumentApprovalIcon,
    CalendarIcon,
    PeopleIcon,
    ReportDocumentIcon,
    TeamworkIcon,
    MoneyIcon,
} from "@fluentui/react-icons-mdl2";

import type { ReactNode } from "react";

const styles = mergeStyleSets({
    sidebar: {
        width: 182,
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e1e1e1",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
    },

    menuButton: {
        height: 36,
        width: 36,
        marginLeft: 4,
        marginTop: 2,
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: 600,
        color: "#242424",
        padding: "15px 14px 6px 14px",
    },

    menuItem: {
        height: 36,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        cursor: "pointer",
        color: "#323130",
        fontSize: 13,

        selectors: {
            ":hover": {
                backgroundColor: "#f3f2f1",
            },
        },
    },

    activeItem: {
        backgroundColor: "#f3f2f1",
        borderLeft: "3px solid #d83b01",
        paddingLeft: 9,
    },

    icon: {
        width: 20,
        marginRight: 10,
        color: "#605e5c",
        fontSize: 15,
        display: "flex",
        alignItems: "center",
    },

    itemText: {
        whiteSpace: "nowrap",
    },

    section: {
        marginBottom: 3,
    },
});

interface MenuItemProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
}

const MenuItem = ({
    icon,
    text,
    active = false,
}: MenuItemProps) => {
    return (
        <div
            className={`${styles.menuItem} ${active ? styles.activeItem : ""
                }`}
        >
            <span className={styles.icon}>
                {icon}
            </span>

            <Text className={styles.itemText}>
                {text}
            </Text>
        </div>
    );
};

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <IconButton
                iconProps={{
                    iconName: "GlobalNavButton",
                }}
                title="Toggle navigation"
                className={styles.menuButton}
            />

            <MenuItem
                icon={<ViewDashboardIcon />}
                text="Dashboard"
            />

            <div className={styles.section}>
                <Text className={styles.sectionTitle}>
                    Operations
                </Text>

                <MenuItem
                    icon={<ContactIcon />}
                    text="Surveys"
                    active
                />

            </div>
        </aside>
    );
};

export default Sidebar;