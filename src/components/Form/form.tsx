import { forwardRef, ReactNode, useImperativeHandle } from "react";
import useStore, { FormState } from "./useStore";
import { createContext } from "react";
import { ValidateError } from "async-validator";
import React from "react";

export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
  name: string;
  initialValues?: Record<string, any>;
  children?: ReactNode | RenderProps;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
}

export type IFormRef = Omit<
  ReturnType<typeof useStore>,
  "fields" | "dispatch" | "form"
>;

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  "dispatch" | "fields" | "validateField"
> &
  Pick<FormProps, "initialValues">;

export const FormContext = createContext<IFormContext>({} as IFormContext);

export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const {
    name = "sisila-form",
    children,
    initialValues,
    onFinish,
    onFinishFailed,
  } = props;
  const { form, fields, dispatch, ...restProps } = useStore(initialValues);
  const { validateField, validateAllFields } = restProps;
  //自定义Ref
  useImperativeHandle(ref, () => {
    return {
      ...restProps,
    };
  });

  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllFields();
    if (isValid && onFinish) {
      onFinish(values);
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors);
    }
  };

  let childrenNode: ReactNode;
  if (typeof children === "function") {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }
  return (
    <>
      <form name={name} className="sisila-form" onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>
          {childrenNode}
        </FormContext.Provider>
      </form>
      <div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  );
});

export default Form;
