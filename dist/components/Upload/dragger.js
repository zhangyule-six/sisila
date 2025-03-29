import classNames from "classnames";
import { useState } from "react";
import React from "react";
export const Dragger = (props) => {
    const { onFile, children } = props;
    const [dragOver, setDragOver] = useState(false);
    const classes = classNames("sisila-upload-dragger", {
        "is-dragover": dragOver,
    });
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    const handleDrag = (e, over) => {
        e.preventDefault();
        setDragOver(over);
    };
    return (React.createElement("div", { className: classes, onDragOver: (e) => {
            handleDrag(e, true);
        }, onDragLeave: (e) => {
            handleDrag(e, false);
        }, onDrop: handleDrop }, children));
};
export default Dragger;
