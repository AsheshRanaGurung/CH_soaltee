import React, { useEffect, useState } from "react";
import { Button, Box, Avatar } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import styled from "styled-components";
import { CrossIcon } from "@src/assets/svgs";
import { imageList } from "@src/assets/images";

interface IProps {
  setValue?: any;
  required?: boolean;
  imageSrc?: string;
  isUser?: boolean;
  name?: string;
  imageUploadStyle?: string;
  show?: boolean;
  error?: any;
}

const ImageWithPreview = styled.div<any>`
  display: flex;
  flex-direction: ${(props) =>
    props.imageUploadStyle === "row" ? "row" : "column"};
  gap: 10px;
  img {
    height: 200px;
    width: 200px;
  }
  svg {
    position: absolute;
    top: 0;
    right: 0;
    background-color:${colors.white}
    cursor: pointer;
    padding: 4px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #f5f5f5;
    padding: 0 9px;
    path {
      fill: var(--chakra-colors-gray-400);
    }
    cursor:pointer
  }
  svg:hover {
    background: var(--chakra-colors-blackAlpha-100);
  }
  .error-msg {
    font-size: 12px;
    color: ${colors.red};
    text-align:left;
    margin-bottom:4px;
    margin-top:4px;
  }
`;

const ImageStyled = styled.div<any>`
  display: flex;
  position: relative;
  border-radius: 7px;
  border: solid 1px ${colors.light_gray_border};
  color: ${colors.text};
  height: ${(props) => props.imageUploadStyle === "row" && "fit-content"};
  width: ${(props) => props.imageUploadStyle === "row" && "100%"};
  label {
    border-right: solid 1px ${colors.light_gray_border};
    padding: 10px;
    background-color: ${colors.light_white};
    cursor: pointer;
  }
  p {
    padding: 10px;
  }
  #fileInput {
    display: none;
  }
`;
const ImageUpload: React.FC<IProps> = ({
  setValue,
  required,
  imageSrc,
  isUser,
  name = "image",
  show,
  error,
  ...rest
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [imageName, setImageName] = useState("");
  const handleImageChange = (event: any) => {
    const selectedImage = event?.target?.files[0];
    if (selectedImage) {
      setSelectedImage(URL.createObjectURL(selectedImage));
      setImageName(selectedImage?.name);
      setValue(name, event.target.files[0]);
    }
  };
  const handleClearImage = () => {
    if (!isUser) {
      setSelectedImage(null);
      setImageName("");
    } else {
      setImageName("");
      setSelectedImage(imageList.AvatarImg);
    }
  };
  useEffect(() => {
    if (imageSrc) {
      const splitData = imageSrc.split("/");
      setImageName(splitData[splitData.length - 1] + ".jpg");
    }
  }, [imageSrc]);

  return (
    <Box textAlign="center">
      {isUser && (
        <>
          {imageSrc ? (
            <img
              src={selectedImage ? selectedImage : imageSrc}
              alt="Uploaded Image"
              style={{
                width: "100px",
                height: "100px",
                margin: "0 auto",
                cursor: "pointer",
                marginBottom: "12px",
                position: "relative",
                borderRadius: "50%",
              }}
            />
          ) : (
            <Avatar
              src={selectedImage}
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
                marginBottom: "10px",
              }}
            />
          )}
          <Button
            variant="link"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Change Image
          </Button>
        </>
      )}
      <ImageWithPreview {...rest} style={{ display: show ? "none" : "block" }}>
        <ImageStyled {...rest}>
          <label htmlFor="fileInput">Choose a file</label>
          <input
            id="fileInput"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required={required}
          />
          {imageName ? (
            <div>
              <p id="selectedFileName">{imageName}</p>
              <div onClick={handleClearImage}>{!imageSrc && <CrossIcon />}</div>
            </div>
          ) : (
            <p>No file selected</p>
          )}
        </ImageStyled>
        {(selectedImage || imageSrc) && !isUser && (
          <div style={{ marginTop: "12px" }}>
            <img src={selectedImage || imageSrc} />
          </div>
        )}
        {error && <p className="error-msg">{error}</p>}
      </ImageWithPreview>
    </Box>
  );
};

export default ImageUpload;
