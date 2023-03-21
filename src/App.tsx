import { useState } from 'react'
import './App.css'

import axios from 'axios';

function App() {

  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const handleFileSelect1 = (event: any) => {
    setSelectedFile1(event.target.files[0])
  }
  const handleFileSelect2 = (event: any) => {
    setSelectedFile2(event.target.files[0])
  }

  const handleSubmit = async(event : any) => {
    event.preventDefault();
    console.log('a');
    if(!selectedFile1 || !selectedFile2) return;
    const formData = new FormData();
    formData.append("file1", selectedFile1);
    formData.append("file2", selectedFile2);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/excel/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: 'blob', 
      }).then((response) => {
        // // create file link in browser's memory
        // let binaryData = [];
        // binaryData.push(response.data);
        // const href = URL.createObjectURL(new Blob(binaryData, {type: ""}));

        // // create "a" HTML element with href to file & click
        // const link = document.createElement('a');
        // link.href = href;
        // link.setAttribute('download', 'file.xlsx'); //or any other extension
        // document.body.appendChild(link);
        // link.click();

        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'file.xlsx'
        link.click()

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        // URL.revokeObjectURL(href);
      });
    } catch(error) {
      console.log(error)
    }
    // let formData = new FormData();

    // formData.append("file", file);

    // return basicHTTP.post("/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   onUploadProgress,
    // });
  }


  return (
    <div className="App">
      {/* <h1>Vite + React</h1> */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <h5>Primer Archivo</h5>
            <input type="file" onChange={handleFileSelect1}/>
          </div>
          <div>
            <h5>Segundo Archivo</h5>
            <input type="file" onChange={handleFileSelect2}/>
          </div>
          <div style={{ paddingTop : "5%" }}> 
            <button type="submit" style={{ borderColor: '#e7e7e7', color: 'black' }}>
              Descargar
            </button>
          </div>
        </form>
      </div>
      <p className="read-the-docs">
        Al descargar el archivo recuerda colocar la extension <strong>.xlsx</strong> en el nombre antes de aceptar la descarga.
      </p>
    </div>
  )
}

export default App
