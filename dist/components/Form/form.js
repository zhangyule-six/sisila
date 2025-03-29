var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { forwardRef, useImperativeHandle } from "react";
import useStore from "./useStore";
import { createContext } from "react";
import React from "react";
export const FormContext = createContext({});
export const Form = forwardRef((props, ref) => {
    const { name = "sisila-form", children, initialValues, onFinish, onFinishFailed, } = props;
    const _a = useStore(initialValues), { form, fields, dispatch } = _a, restProps = __rest(_a, ["form", "fields", "dispatch"]);
    const { validateField, validateAllFields } = restProps;
    //自定义Ref
    useImperativeHandle(ref, () => {
        return Object.assign({}, restProps);
    });
    const passedContext = {
        dispatch,
        fields,
        initialValues,
        validateField,
    };
    const submitForm = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        e.stopPropagation();
        const { isValid, errors, values } = yield validateAllFields();
        if (isValid && onFinish) {
            onFinish(values);
        }
        else if (!isValid && onFinishFailed) {
            onFinishFailed(values, errors);
        }
    });
    let childrenNode;
    if (typeof children === "function") {
        childrenNode = children(form);
    }
    else {
        childrenNode = children;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { name: name, className: "sisila-form", onSubmit: submitForm },
            React.createElement(FormContext.Provider, { value: passedContext }, childrenNode)),
        React.createElement("div", null,
            React.createElement("pre", { style: { whiteSpace: "pre-wrap" } }, JSON.stringify(fields)),
            React.createElement("pre", { style: { whiteSpace: "pre-wrap" } }, JSON.stringify(form)))));
});
export default Form;
