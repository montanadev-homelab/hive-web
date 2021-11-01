import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

function DeleteItemModal({open, onClose, onDelete}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Are you sure?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button onClick={() => {
                    onClose();
                    onDelete();
                }} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>);
}

export default DeleteItemModal;