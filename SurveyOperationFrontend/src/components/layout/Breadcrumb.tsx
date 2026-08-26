import {
    Breadcrumb as FluentBreadcrumb,
    type IBreadcrumbItem,
    mergeStyleSets,
} from "@fluentui/react";

const styles = mergeStyleSets({
    container: {
        padding: "7px 10px",
        borderBottom: "1px solid #edebe9",
    },
});

const Breadcrumb = () => {
    const items: IBreadcrumbItem[] = [
        {
            text: "Home",
            key: "home",
        },
        {
            text: "Surveys",
            key: "surveys",
            isCurrentItem: true,
        },
    ];

    return (
        <div className={styles.container}>
            <FluentBreadcrumb
                items={items}
                ariaLabel="Survey breadcrumb"
            />
        </div>
    );
};

export default Breadcrumb;