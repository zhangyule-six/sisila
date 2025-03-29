import { FC } from "react";
import { UploadProps } from "./upload";
import { UploadListProps } from "./uploadList";
import { DraggerProps } from "./dragger";
export type IUploadComponent = FC<UploadProps> & {
    List: FC<UploadListProps>;
    Dragger: FC<DraggerProps>;
};
declare const TransUpload: IUploadComponent;
export default TransUpload;
