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
import CSSTransition from "react-transition-group/CSSTransition";
import React from "react";
const Transition = (props) => {
    const { children, classNames, animation, wrapper, unmountOnExit = true, appear = true } = props, restProps = __rest(props, ["children", "classNames", "animation", "wrapper", "unmountOnExit", "appear"]);
    return (React.createElement(CSSTransition, Object.assign({ classNames: classNames ? classNames : animation }, restProps), children));
};
export default Transition;
