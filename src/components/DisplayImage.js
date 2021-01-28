import React, { useEffect, useState } from "react";
import CropProfilePictureModal from "./CropProfilePictureModal.js";

function DisplayImage(props) {
  const [image, setImage] = useState(props.currentImg);
  const [showCropModal, setShowCropModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState({ src: null, crop: { x: 10, y: 10, width: 80, height: 80, aspect: 1 } });
  const [cropBlob, setCropBlob] = useState();

  useEffect(() => {
    if (cropBlob === undefined) return;
    setImage(URL.createObjectURL(cropBlob));
    props.setImg(cropBlob);
  }, [cropBlob]);

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageType = event.target.files[0].type;
      if ((imageType === "image/png") || (imageType === "image/jpg") || (imageType === "image/jpeg")) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => (
            setCroppedImage({
              ...croppedImage,
              src: reader.result
            })
          ),
          false
        );
        reader.readAsDataURL(event.target.files[0]);
        setShowCropModal(true);
      }
      else {
        props.setDisplayImageTypeValidationMessage(true);
      }
    } 
  }

  // const onImageChange = event => {
  //   if (event.target.files && event.target.files[0]) {
  //     const compress = new Compress();

  //     let img = event.target.files[0];
  //     setImage(URL.createObjectURL(img));
  //     props.setImageType(img.type);
  //     if ((img.type !== "image/png") && (img.type !== "image/jpg") && (img.type !== "image/jpeg")) {
  //       return;
  //     }
  //     else if ((img.type === "image/png") || (img.type === "image/gif")) {
  //       props.setImg(img);
  //     }
  //     else {
  //       compress.compress([img], {
  //         size: 5,
  //         quality: .9,
  //         maxWidth: 1200,
  //         maxHeight: 675,
  //         resize: true
  //       }).then((data) => {
  //         const imgToCompress = data[0];
  //         let compressedImage = Compress.convertBase64ToFile(imgToCompress.data, imgToCompress.ext);

  //         props.setImg(compressedImage);
  //       });
  //     }
  //   }
  //   props.changedInfo();
  // };

  return (
    <div>
      <div>
        <div className="mx-auto">

          <label htmlFor={props.id} >
            <img src={image || props.currentImg || "https://assets.dryicons.com/uploads/icon/svg/9920/974969e2-49be-4625-99be-25daca02778c.svg"}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                cursor: "pointer",
                boxShadow: "3px 3px 25px #060508"
              }}
              alt="profile picture" />
          </label>
          <input
            id={props.id}
            type="file"
            name="UserImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onSelectFile}
          />
          <CropProfilePictureModal show={showCropModal} 
          setShowCropModal={setShowCropModal} 
          croppedImage={croppedImage} 
          setImage={setImage} 
          setCropBlob={setCropBlob} />
        </div>
      </div>
    </div>
  );
}
export default DisplayImage;