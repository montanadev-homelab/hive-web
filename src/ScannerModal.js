import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {createRef, useState} from "react";


function ScannerModal({open, onClose}) {
    const [text, setText] = useState('');
    const [command, setCommand] = useState(null);
    const submit = () => {
        if (!command) {
            setCommand(text);
            setText('');
            return;
        }

        console.log(command);
        if (command && (command === 'hive mv' || command === 'hv mv')) {
            console.log("Moving to ", text);
            setText('');
            setCommand(null);
        }

    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Scanner
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p>{command}</p>

                    <input autoFocus type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submit();
                        }}} />

                    <br/>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ScannerModal;