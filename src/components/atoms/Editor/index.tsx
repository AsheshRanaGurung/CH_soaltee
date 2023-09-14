import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Control, Controller } from "react-hook-form";

interface IEditor {
  onChange?: (data: string) => void;
  onBlur?: (data: string | undefined) => void;
  onInit?: (editor: ClassicEditor) => void;
  name: string;
  control: Control<any>;
  isRequired?: boolean;
}

const editorCss = `
  ol,ul {
    padding:unset;
  }
`;

const Editor = ({ onInit, onBlur, name, control, isRequired }: IEditor) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              isRequired={!!isRequired}
              isInvalid={!!error}
              id={name}
            >
              <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                  removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed"],
                  editorConfig: {
                    extraAllowedContent: "ul li",
                    contentsCss: [editorCss],
                  },
                }}
                onReady={(editor) => {
                  editor?.editing.view.change((writer) => {
                    writer.setStyle(
                      "height",
                      "200px",
                      editor.editing.view.document.getRoot()
                    );
                  });
                  editor?.editing.view.change((writer) => {
                    writer.setStyle(
                      "padding-left",
                      "24px",
                      editor.editing.view.document.getRoot()
                    );
                  });
                  onInit && onInit(editor);
                }}
                onChange={(_, editor) => {
                  const data = editor.getData();
                  onChange && onChange(data);
                }}
                onBlur={() => {
                  onBlur && onBlur(value);
                }}
              />
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default Editor;
