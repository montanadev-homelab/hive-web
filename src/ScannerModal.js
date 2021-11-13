import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {createRef, useState} from "react";
import {say, toastError, toastSuccess} from "./utils";


function ScannerModal({open, onClose, onMoveItem}) {
    const [text, setText] = useState('');
    const [upc, setUpc] = useState(null);
    const [location, setLocation] = useState(null);
    const [command, setCommand] = useState(null);
    const submit = () => {
        if (!command) {
            if (text !== 'hive mv' && text !== 'hv mv') {
                say('error');
                toastError('Command not recognized');
                return;
            }
            say('u p c');
            setCommand(text);
        } else if (!upc) {
            setUpc(text);
            say('location');
        } else if (!location) {
            // No need to setLocation, its the last to be displayed
            setUpc(null);
            setLocation(null);
            setCommand(null);
            onMoveItem(upc, text).then(() => {
                say('success');
                toastSuccess(`Moved ${upc} to ${text} successfully`);
            }).catch(e => {
                say('failure');
                toastError(`Failed to move ${upc} to ${text}: ${e.toString()}`);
            });
        }
        setText('');
    };

    const internalOnClose = () => {
        setText('');
        setUpc(null);
        setLocation(null);
        setCommand(null)
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={internalOnClose}
        >
            <DialogTitle>
                Scanner
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p>{command}</p>
                    <p>{upc}</p>
                    <p>{location}</p>


                    <input autoFocus type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submit();
                        }}} />

                    <br/>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={internalOnClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ScannerModal;