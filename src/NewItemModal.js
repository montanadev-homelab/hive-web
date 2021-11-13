import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useState} from "react";


function NewItemModal({open, onClose, onCreate}) {
    const [name, setName] = useState();
    const [print, setPrint] = useState(true);

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Create new item
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <label>Name</label>
                    <input autoFocus onChange={(e) => setName(e.target.value)} type='text'/>

                    <br/>

                    <label>Print a new label</label>
                    <input type='checkbox' checked={print} onChange={() => setPrint(!print)}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {
                    onClose();
                    onCreate(name, print);
                }} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewItemModal;