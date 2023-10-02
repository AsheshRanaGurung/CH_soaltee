import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { FormErrorMessage, FormLabel } from "@chakra-ui/react";
interface CKEditorWrapperProps {
  data: string;
  onDataChange: (newData: string) => void;
  label?: string;
  required?: boolean;
  height?: string;
  error?: string;
}
const EditorStyled = styled.div`
  .ck.ck-editor__editable_inline {
    padding: 0 25px;
  }
`;

const CKEditorWrapper: React.FC<CKEditorWrapperProps> = ({
  data,
  onDataChange,
  label,
  required,
  height,
  error,
}) => {
  const handleEditorDataChange = (_: any, editor: any) => {
    const newData = editor.getData();
    onDataChange(newData);
  };

  return (
    <>
      {label && (
        <FormLabel fontWeight={500} fontSize={"14px"}>
          {label}{" "}
          {required && (
            <sup style={{ color: "red", fontWeight: "bold" }}>*</sup>
          )}
        </FormLabel>
      )}
      <EditorStyled>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          config={{
            removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed"],
          }}
          onReady={(editor) => {
            editor?.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                `${height ?? 200}px`,
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={handleEditorDataChange}
        />
      </EditorStyled>
      {error && <FormErrorMessage fontSize={12}>{error}</FormErrorMessage>}
    </>
  );
};

export default CKEditorWrapper;
