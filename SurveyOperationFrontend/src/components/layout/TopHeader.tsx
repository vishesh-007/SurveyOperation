import {
    IconButton,
    Persona,
    PersonaSize,
    SearchBox,
    mergeStyleSets,
} from "@fluentui/react";

const styles = mergeStyleSets({
    header: {
        height: 50,
        backgroundColor: "#d83b01",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        boxSizing: "border-box",
    },

    title: {
        fontSize: 14,
        fontWeight: 600,
        color: "#ffffff",
        marginLeft: 4,
    },

    spacer: {
        flexGrow: 1,
    },

    search: {
        width: 230,
        marginRight: 8,
    },

    headerIcon: {
        color: "#ffffff",
        margin: "0 2px",
    },

    persona: {
        marginLeft: 6,
    },
});

const TopHeader = () => {
    return (
        <div className={styles.header}>
            <span className={styles.title}>
                Acting Office
            </span>

            <div className={styles.spacer} />

            <IconButton
                iconProps={{
                    iconName: "GridViewMedium",
                }}
                className={styles.headerIcon}
                title="Applications"
            />

            <IconButton
                iconProps={{
                    iconName: "Ringer",
                }}
                className={styles.headerIcon}
                title="Notifications"
            />

            <IconButton
                iconProps={{
                    iconName: "Help",
                }}
                className={styles.headerIcon}
                title="Help"
            />

            <Persona
                text="DP"
                size={PersonaSize.size32}
                hidePersonaDetails
                className={styles.persona}
            />
        </div>
    );
};

export default TopHeader;