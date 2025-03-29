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
import classNames from "classnames";
import Icon from "../Icon/icon";
import React from "react";
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'vikingship'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
export const Input = (props) => {
    const { disabled = false, size, icon, prepend, append, style, onKeyDown } = props, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style", "onKeyDown"]);
    const classes = classNames("sisila-input-wrapper", {
        [`input-size-${size}`]: size,
        "is-disabled": disabled,
        "input-group": prepend || append,
        "input-group-append": !!append,
        "input-group-prepend": !!prepend,
    });
    const valueControlled = (value) => {
        if (typeof value === undefined || value === null) {
            return "";
        }
        return value;
    };
    if ("value" in props) {
        delete restProps.defaultValue;
        restProps.value = valueControlled(props.value);
    }
    return (React.createElement("div", { className: classes, style: style },
        prepend && React.createElement("div", { className: "sisila-input-group-prepend" }, prepend),
        icon && (React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon, title: `title-${icon}` }))),
        React.createElement("input", Object.assign({ className: "viking-input-inner", disabled: disabled, onKeyDown: onKeyDown }, restProps)),
        append && React.createElement("div", { className: "viking-input-group-append" }, append)));
};
