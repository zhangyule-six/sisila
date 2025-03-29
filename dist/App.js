import axios from "axios";
import React from "react";
const App = () => {
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files) {
            const uploadFile = files[0];
            const formData = new FormData();
            formData.append(uploadFile.name, uploadFile);
            axios
                .post("https://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                console.log(res);
            });
        }
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement("input", { type: "file", name: "myFile", onChange: handleFileChange }))));
};
export default App;
