import { Meta } from "@storybook/react/*";
import { action } from "@storybook/addon-actions";
import Upload, { UploadFile } from "./upload";
import Icon from "../Icon/icon";

const defaultFileList: UploadFile[] = [
  { uid: "123", size: 1234, name: "hel.md", status: "uploading", percent: 30 },
  { uid: "12", size: 1234, name: "hl.md", status: "success", percent: 30 },
  { uid: "1", size: 1234, name: "he.md", status: "error", percent: 30 },
];
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file too big");
    return false;
  }
  return true;
};

const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};

export default {
  title: "第十章：Upload",
  id: "Upload",
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as Meta<typeof Upload>;

export const SimpleUpload = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/482f8401-c58b-4ec5-9052-962a6a7d27cb"
      onChange={action("changed")}
      onRemove={action("removedd")}
      name="fileName"
      drag={true}
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};
