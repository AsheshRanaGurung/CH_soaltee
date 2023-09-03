import React from "react";
interface IProps {
  setValue?: any;
}
const ImageUpload: React.FC<IProps> = ({ setValue }) => {
  const handleImageChange = (event: any) => {
    setValue("image", event.target.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUpload;
