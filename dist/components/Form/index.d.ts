import { FC } from "react";
import Form from "./form";
import { FormItemProps } from "./formItem";
export type IFormComponent = typeof Form & {
    Item: FC<FormItemProps>;
};
declare const TransForm: IFormComponent;
export default TransForm;
