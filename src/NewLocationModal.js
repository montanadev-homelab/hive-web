import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useState} from "react";


function NewLocationModal({locations, open, onClose, onCreate}) {
    const [name, setName] = useState();

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Create new location
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p>Current locations:</p>
                    <ul>
                        {locations.map(l => <li key={l.id}>{l.name}</li>)}
                    </ul>

                    <label>Name</label>
                    <input autoFocus onChange={(e) => setName(e.target.value)} type='text'/>

                    <br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {
                    onClose();
                    onCreate(name);
                }} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewLocationModal;