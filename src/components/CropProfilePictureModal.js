import React, { useRef, useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function CropProfilePictureModal(props) {

    const [show, setShow] = useState(false);
    const [croppedImage, setCroppedImage] = useState({ src: null, crop: { x: 10, y: 10, width: 80, height: 80, aspect: 1 }, image: null });

    useEffect(() => {
        if (props.show === true) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [props.show])

    useEffect(() => {
        setCroppedImage(props.croppedImage);
    }, [props.croppedImage])

    const buttonStyle = {
        height: 48,
        marginLeft: "auto",
        marginRight: "40px",
        backgroundColor: "#BF9AFC",
        color: "#292833",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
    }; 
    
    const modalContentStyle = {
        color: "#BF9AFC",
        backgroundColor: "#292833",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0",
        borderBottom: "0",
    }
    const modalHeaderStyle = {
        borderBottom: "0 none",
        textAlign: "center"
    }

    const clearFields = () => {
        setCroppedImage({ src: null, crop: { x: 10, y: 10, width: 80, height: 80, aspect: 1 } });
        props.setShowCropModal(false);
    }

    const getCroppedImg = (image, crop, fileName) => {

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / document.getElementsByClassName("ReactCrop__image")[0].clientWidth; //image size from modal
        const scaleY = image.naturalHeight / document.getElementsByClassName("ReactCrop__image")[0].clientHeight; //464 x 416
        canvas.width = Math.ceil(crop.width * scaleX);
        canvas.height = Math.ceil(crop.height * scaleY);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        canvas.toBlob(blob => {
            if (blob === null) return;
            blob.name = fileName;
            props.setCropBlob(blob);
        }, 'image/png', 1);
    }

    const handleCropClick = () => { //return img file
        getCroppedImg(document.getElementById("imageId"), croppedImage.crop, "profile_picture.png");
        props.setShowCropModal(false);
    }

    const onCropChange = (crop) => {
        setCroppedImage({ ...croppedImage, crop });
    };

    const modalBody = (croppedImage) => {
        if (croppedImage.src !== undefined) {
            return (
                <Modal.Body className="text-center" >
                    {croppedImage.src && (
                        <ReactCrop
                            src={croppedImage.src}
                            crop={croppedImage.crop}
                            onChange={onCropChange}
                            circularCrop={true}
                        />
                    )}
                </Modal.Body>
            )
        }
    }

    return (
        <div className="CropProfilePictureModal">
            <img src={croppedImage.src} id="imageId" style={{ display: "none" }} />
            <Modal show={show} onHide={() => props.setShowCropModal(false)} dialogClassName="modal-100w" centered scrollable>
                <div className="modal-content" style={modalContentStyle}>
                    <div className="modal-header" style={modalHeaderStyle}>
                        <h5 className="modal-title" id="cropProfilePictureModalLabel">Crop Profile Picture</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"  style={{ color: "#BF9AFC" }} onClick={() => clearFields()}>
                            <span aria-hidden="true"  style={{ color: "#BF9AFC" }}>&times;</span>
                        </button>
                    </div>
                    {modalBody(croppedImage)}
                    <div style={{ display: "flex", paddingBottom: "5%" }}>
                        <button type="button" className="btn btn-primary" style={buttonStyle} onClick={() => handleCropClick()} data-dismiss="modal">Crop</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CropProfilePictureModal;