import React, { useState } from "react";
import { Button, Box, Avatar } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import styled from "styled-components";
interface IProps {
  setValue?: any;
  required?: boolean;
  imageSrc?: string;
  isUser?: boolean;
  name?: string;
}

const ImageStyled = styled.div`
  display: flex;
  border-radius: 7px;
  border: solid 1px ${colors.light_gray_border};
  color: ${colors.text};
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
  return (
    <Box textAlign="center">
      {isUser && (
        <>
          {imageSrc ? (
            <img
              src={selectedImage || imageSrc}
              alt="Uploaded Image"
              style={{
                width: "100px",
                height: "100px",
                margin: "0 auto",
                cursor: "pointer",
                marginBottom: "12px",
                position: "relative",
                borderRadius: 0,
              }}
            />
          ) : (
            <Avatar
              src={selectedImage}
              style={{
                borderRadius: 0,
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
      <ImageStyled>
        <label htmlFor="fileInput">Choose a file</label>
        <input
          id="fileInput"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required={required}
        />
        <p id="selectedFileName">
          {imageName ? imageName : "No file selected"}
        </p>
      </ImageStyled>
    </Box>
  );
};

export default ImageUpload;
