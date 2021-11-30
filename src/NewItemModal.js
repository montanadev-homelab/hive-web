import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useCallback, useRef, useState} from "react";
import Webcam from "react-webcam";


function NewItemModal({open, onClose, onCreate}) {
    const [name, setName] = useState();
    const [print, setPrint] = useState(true);
    const [image, setImage] = useState();

    const webcamRef = useRef(null);
    const capture = () => {
        setImage(webcamRef.current.getScreenshot());
    };

    return (
        <Dialog
            maxWidth={false}
            open={open}
            onClose={() => {
                setImage(null);
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

                    <br/>

                    {image ? <p>Added an image!</p> :
                        <div>
                            <p>Add an image</p>
                            <Webcam
                                ref={webcamRef}
                                screenshotFormat="image/png"
                            />
                            <button onClick={capture}>Add</button>
                        </div>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {
                    onClose();
                    onCreate(name, print, image);
                }} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewItemModal;