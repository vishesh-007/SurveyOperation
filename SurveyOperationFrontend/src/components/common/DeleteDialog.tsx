import { DefaultButton, PrimaryButton } from "@fluentui/react"
import Dialog, { DialogFooter, DialogType } from "@fluentui/react/lib/Dialog"

interface DeleteProps {
    showDeleteDialog: boolean,
    cancelDeleteSurvey: () => void,
    confirmDeleteSurvey : () => void
}

const DeleteDialog = ({showDeleteDialog, cancelDeleteSurvey, confirmDeleteSurvey}: DeleteProps) => {


    return (
        <Dialog
            hidden={!showDeleteDialog}
            onDismiss={cancelDeleteSurvey}
            dialogContentProps={{
                type: DialogType.normal,
                title: "Delete Survey",
                subText:
                    "Are you sure you want to delete this data?",
            }}
            modalProps={{
                isBlocking: true,
            }}
        >
            <DialogFooter>
                <DefaultButton
                    text="Cancel"
                    onClick={cancelDeleteSurvey}
                />

                <PrimaryButton
                    text="Delete"
                    onClick={confirmDeleteSurvey}
                />
            </DialogFooter>
        </Dialog>
    )
}


export default DeleteDialog;