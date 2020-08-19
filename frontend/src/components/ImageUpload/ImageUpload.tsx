import React, { useRef, useState, useEffect } from "react";

import Button from "../Button/Button";

import "./ImageUpload.scss";

interface IImageUploadProps {
  alt: string;
}

export default (props: IImageUploadProps): JSX.Element => {
  const [imageData, setImageData] = useState<File>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef();

  const onClick = () => {
    inputRef.current.click();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      setImageData(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (!imageData) {
      setImageUrl(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(imageData);
  }, [imageData]);

  return (
    <div className="image-upload">
      <input
        onChange={onChange}
        className="image-upload__input"
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
      />
      <div>
        {imageUrl && <img alt={props.alt} src={imageUrl} />}
        <Button onClick={onClick}>Upload image</Button>
      </div>
    </div>
  );
};
