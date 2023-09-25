import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import styled from "styled-components";

export interface IEditor {
  data?: string;
  height?: string;
  label?: string;
  helperText?: string;
  error?: string;
  onChange?: (data: string) => void;
  onBlur?: (data: string | undefined) => void;
  onInit?: (editor: ClassicEditor) => void;
  required?: boolean;
}

const Editor = ({
  data,
  height,
  onInit,
  onChange,
  onBlur,
  label,
  helperText,
  required,
  error,
}: IEditor) => {
  const EditorStyled = styled.div`
    .ck.ck-editor__editable_inline {
      padding: 0 25px;
    }
  `;
  return (
    <FormControl isInvalid={!!error}>
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
            onInit && onInit(editor);
          }}
          onChange={(_event, editor) => {
            const data = editor.getData();
            onChange && onChange(data);
          }}
          onBlur={(_event, editor) => {
            const data = editor.getData();
            onChange && onChange(data);
            onBlur && onBlur(data);
          }}
        />
      </EditorStyled>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage fontSize={12}>{error}</FormErrorMessage>}
    </FormControl>
  );
};
export default Editor;
