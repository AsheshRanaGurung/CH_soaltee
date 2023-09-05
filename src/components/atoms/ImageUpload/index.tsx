import React from "react";
interface IProps {
  setValue?: any;
  required?: boolean;
}
const ImageUpload: React.FC<IProps> = ({ setValue, required }) => {
  const handleImageChange = (event: any) => {
    setValue("image", event.target.files[0]);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required={required}
      />
    </div>
  );
};

export default ImageUpload;
