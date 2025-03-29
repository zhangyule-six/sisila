import { FC } from "react";
import Upload, { UploadProps } from "./upload";
import UploadList, { UploadListProps } from "./uploadList";
import Dragger, { DraggerProps } from "./dragger";

export type IUploadComponent = FC<UploadProps> & {
  List: FC<UploadListProps>;
  Dragger: FC<DraggerProps>;
};

const TransUpload = Upload as IUploadComponent;

TransUpload.List = UploadList;
TransUpload.Dragger = Dragger;

export default TransUpload;
