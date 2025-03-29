import React, { useRef, useState } from "react";
import axios from "axios";
import { UploadList } from "./uploadList";
import { Dragger } from "./dragger";
export const Upload = (props) => {
    const { action, defaultFileList, beforUpload, onProgress, onSuccess, onError, onChange, onRemove, headers, name = "file", data, withCredentials, accept, multiple, drag, children, } = props;
    const fileInput = useRef(null);
    const [fileList, setFileList] = useState(defaultFileList || []);
    //percentage更新任务
    const updateFileList = (updateFile, updataObj) => {
        setFileList((prevList) => {
            return prevList.map((file) => {
                if (file.uid === updateFile.uid) {
                    return Object.assign(Object.assign({}, file), updataObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    const handleRemove = (file) => {
        setFileList((prevList) => {
            return prevList.filter((item) => item.uid !== file.uid);
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    const uploadFiles = (files) => {
        let postFiles = Array.from(files);
        postFiles.forEach((file) => {
            if (!beforUpload) {
                post(file);
            }
            else {
                const result = beforUpload(file);
                if (result && result instanceof Promise) {
                    result.then((processedFile) => {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    const post = (file) => {
        let _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        setFileList([_file, ...fileList]);
        const formData = new FormData();
        formData.append(name || "file", file);
        //异步处理文件上传
        if (data) {
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = e.total
                    ? Math.round((e.loaded * 100) / e.total) || 0
                    : 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            },
        })
            .then((res) => {
            console.log(res);
            updateFileList(_file, { status: "success", response: res.data });
            if (onSuccess) {
                onSuccess(res.data, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        })
            .catch((err) => {
            console.error(err);
            updateFileList(_file, { status: "error", error: err });
            if (onError) {
                onError(err, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        });
        console.log(fileList);
    };
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement("div", { className: "viking-upload-input", style: { display: "inline-block" }, onClick: handleClick },
            drag ? (React.createElement(Dragger, { onFile: (files) => {
                    uploadFiles(files);
                } }, children)) : (children),
            React.createElement("input", { className: "viking-file-input", style: { display: "none" }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
export default Upload;
