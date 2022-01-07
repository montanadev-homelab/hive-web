import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useRef, useState} from "react";
import Webcam from "react-webcam";


function NewItemModal({open, onClose, onCreate}) {
    const [name, setName] = useState();
    const [print, setPrint] = useState(true);
    const [includeImage, setIncludeImage] = useState(true);

    const webcamRef = useRef(null);

    return (
        <Dialog
            maxWidth={false}
            open={open}
            onClose={() => {
                setPrint(true);
                setName(null);
                onClose();
            }}
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

                    <label>Capture an image</label>
                    <input type='checkbox' checked={includeImage} onChange={() => setIncludeImage(!includeImage)}/>

                    <br/>
                    {includeImage && <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/png"
                    />}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {
                    let image;
                    if (includeImage) {
                        image = webcamRef.current.getScreenshot()
                    }
                    onCreate(name, print, image);
                    onClose();
                }} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewItemModal;