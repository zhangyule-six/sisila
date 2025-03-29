import axios from "axios";
import React from "react";
const App: React.FC = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  return (
    <div className="App">
      <header className="App-header">
        <input type="file" name="myFile" onChange={handleFileChange}></input>
      </header>
    </div>
  );
};

export default App;
