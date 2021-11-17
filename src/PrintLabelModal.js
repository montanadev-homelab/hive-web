import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useState} from "react";


function PrintLabelModal({open, onClose, onPrint}) {
    const [upc, setUPC] = useState();
    const [description, setDescription] = useState();


    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Print new label
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <label>UPC</label>
                    <input onChange={(e) => setUPC(e.target.value)} type='text'/>

                    <br/>

                    <label>Description</label>
                    <input onChange={(e) => setDescription(e.target.value)} type='text'/>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {
                    onClose();
                    onPrint(upc, description);
                }} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PrintLabelModal;