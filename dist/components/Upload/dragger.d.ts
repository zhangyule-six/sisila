import { FC } from "react";
import React from "react";
export interface DraggerProps {
    onFile: (file: FileList) => void;
    children?: React.ReactNode;
}
export declare const Dragger: FC<DraggerProps>;
export default Dragger;
