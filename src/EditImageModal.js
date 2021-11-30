import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useCallback, useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";


function EditImageModal({open, image, onDelete, onCreate, onClose}) {
    const [selectedImage, setSelectedImage] = useState(image);

    useEffect(() => {
        setSelectedImage(image);
    }, [image])

    const webcamRef = useRef(null);
    const capture = () => {
        setSelectedImage(webcamRef.current.getScreenshot());
    };

    return (
        <Dialog
            maxWidth={false}
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Edit image
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {selectedImage ?
                        <div>
                            <img src={selectedImage}/>
                            <button onClick={() => {
                                onDelete();
                                setSelectedImage(null);
                            }}>Retake?</button>
                        </div> :
                        <div>
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
                    onCreate(selectedImage);
                    onClose();
                }} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditImageModal;