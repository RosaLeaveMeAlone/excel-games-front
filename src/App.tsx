import { useState } from 'react'
import './App.css'

import axios from 'axios';

function App() {

  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [showIcon, setshowIcon] = useState(false);

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
      setshowIcon(true);
      const response = await axios({
        method: "post",
        url: "http://167.235.238.223:3000/excel/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: 'blob', 
      }).then((response) => {
        setshowIcon(false);
        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'file.xlsx'
        link.click()

        document.body.removeChild(link);

      });
    } catch(error) {
      console.log(error)
    }

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
            <i className={`fa-solid fa-circle-down ${showIcon ? 'fa-beat' : 'hide'}`}  style={{ paddingRight : "2%" }}></i>
            <button disabled={showIcon} type="submit" style={{ borderColor: '#e7e7e7', color: 'black' }}>
              Descargar
            </button>
          </div>
        </form>
      </div>
      <p className="read-the-docs">
        <strong>El primer archivo debe ser el que tenga los datos anterior con respecto al segundo.</strong>
      </p>
    </div>
  )
}

export default App
