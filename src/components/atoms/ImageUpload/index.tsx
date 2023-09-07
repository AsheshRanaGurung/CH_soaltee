import React, { useState } from "react";
import { Button, Box, Avatar } from "@chakra-ui/react";

interface IProps {
  setValue?: any;
  required?: boolean;
  imageSrc?: string;
  isUser?: boolean;
  name?: string;
}

const ImageUpload: React.FC<IProps> = ({
  setValue,
  required,
  imageSrc,
  isUser,
  name = "image",
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImageChange = (event: any) => {
    const selectedImage = event?.target?.files[0];
    if (selectedImage) {
      setSelectedImage(URL.createObjectURL(selectedImage));
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

      <input
        id="fileInput"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: isUser ? "none" : "block" }}
        required={required}
      />
    </Box>
  );
};

export default ImageUpload;
