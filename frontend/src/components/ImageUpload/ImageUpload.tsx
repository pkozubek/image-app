import React, { useRef, useState, useEffect } from "react";

import Button from "../Button/Button";

import "./ImageUpload.scss";

interface IImageUploadProps {
  alt: string;
  onChange: any;
  id: string;
}

export default (props: IImageUploadProps): JSX.Element => {
  const [imageData, setImageData] = useState<File>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isValid, setIsValid] = useState(false);

  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef();

  const onClick = () => {
    inputRef.current.click();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      setImageData(event.target.files[0]);
      setIsValid(true);
    } else {
      setImageData(null);
      setIsValid(false);
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
    props.onChange(props.id, imageData, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData, props.id, props.onChange, isValid]);

  return (
    <div className="image-upload">
      <input
        id={props.id}
        onChange={onChange}
        className="image-upload__input"
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
      />
      <div>
        {imageUrl && (
          <>
            <label className="image-upload__preview_label">preview</label>
            <img
              className="image-upload__preview"
              alt={props.alt}
              src={imageUrl}
            />
          </>
        )}
        <Button onClick={onClick}>Upload image</Button>
      </div>
    </div>
  );
};
