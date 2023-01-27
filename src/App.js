import logo from './logo.svg';
import React, { useState } from 'react';





import './App.css';



 // Available size buttons.

const buttons = [
  {
    value: 'small',
    label: 'Small',
    width: 512,
    height: null,
    icon: "",
  },
  {
    value: 'medium',
    label: 'Medium',
    width: 1024,
    height: null,
    icon: "",
  },
  {
    value: 'large',
    label: 'Large',
    width: 2048,
    height: null,
    icon: "",
  },

];


function App() {

 


  const [fileChosen, setFileChosen] = useState(false);
  const [imageInfo, setImageInfo] = useState('');
  const [buttonActive, setButtonActive] = useState('');
  const [imageType, setImageType] = useState('');
  const [image, setImage] = useState('');
  const [version, setVersion] = useState('');
  const [preset, setPreset] = useState('small');
  const [width, setWidth] = useState('500');
  const [height, setHeight] = useState('500');
  const [fit, setFit] = useState('cover');
  const [gravity, setGravity] = useState('center');
  const [type, setType] = useState('image/jpeg');
  const [quality, setQuality] = useState(100);
  const [background, setBackground] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

function fileUpload(e){
     let imgInput = document.getElementById('imageInput');
      if(e.target.files) {
        let imageFile = e.target.files[0]; //here we get the image file
        let imageFileType = e.target.files[0].type;
        setFileChosen(e.target.files[0].name)
        setImageType(imageFileType);
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function (e) {
          var myImage = new Image(); // Creates image object
          myImage.src = e.target.result; // Assigns converted image to image object
          document.getElementById('image').src = myImage.src;
          myImage.onload = function(ev) {
            var myCanvas = document.getElementById("canvas"); // Creates a canvas object
            var myContext = myCanvas.getContext("2d"); // Creates a contect object
            myCanvas.width = myImage.width; // Assigns image's width to canvas
            myCanvas.height = myImage.height; // Assigns image's height to canvas
            myContext.drawImage(myImage,0,0); // Draws the image on canvas
            let imgData = myCanvas.toDataURL(imageFileType,0.75); // Assigns image base64 string in jpeg format to a variable
            setImageInfo(imgData);
          }
        }
      }
  }


function determineNewHeight(originalHeight, originalWidth, newWidth){
    return (originalHeight / originalWidth) * newWidth;
}

function resizeImage(e){
 const requestedSize = e.currentTarget.getAttribute('size');
 const refImage = document.getElementById('canvas');
 const ctx = refImage.getContext('2d');
 setButtonActive(true);
// Using the Image() constructor
let imagePath = document.getElementById('image').src;
const originalImage = new Image();
originalImage.src = imagePath;
originalImage.addEventListener('load', function() {
    const originalWidth = originalImage.naturalWidth;
    const originalHeight = originalImage.naturalHeight;
 
    const aspectRatio = originalWidth/originalHeight;
 
    let newWidth = requestedSize;
    let newHeight = newWidth/aspectRatio;
    refImage.width = newWidth;
    refImage.height = newHeight;
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
    let imgData = refImage.toDataURL(imageType,0.75);
    let canvas = document.getElementById('canvas');
    let requestedImageType = e.currentTarget.value;
    let type = "";
    if(requestedImageType == "jpeg"){
      type = "image/jpeg";
    }
    else if(requestedImageType == "png"){
      type = "image/png";
    }
    else if(requestedImageType == "webp"){
      type = "image/webp";
    }

    imgData = canvas.toDataURL(type,0.75);
   
    setImageInfo(imgData);

})



}

function changeFileType(e){
    let canvas = document.getElementById('canvas');
    let requestedImageType = e.currentTarget.value;
    let type = "";
    if(requestedImageType == "jpeg"){
      type = "image/jpeg";
    }
    else if(requestedImageType == "png"){
      type = "image/png";
    }
    else if(requestedImageType == "webp"){
      type = "image/webp";
    }

    let imgData = canvas.toDataURL(type,0.75);
   
    setImageInfo(imgData);

} 

function downloadImage(){
    let fileName = document.getElementById('file').files[0].name;
    let tempLink = document.createElement('a');
    tempLink.download = fileName;
    tempLink.href = imageInfo;
    tempLink.click();
}

  return (
   <div
    style={{textAlign:'center'}}
    className="app-mb"
   >
   <div className="logo-wrapper">
    <h2 style={{textAlign:'center',color:'#7601fd'}}>Grapecake</h2>
    </div>
    <div className="info" style={{textAlign:'center'}}>
      <p style={{maxWidth:'200px',margin:'auto',marginBottom:'15px',fontSize:'14px'}}>Upload an image and resize or convert below.</p>
    </div>
    <div
    className="upload-file"
    style={{padding:'25px'}}
    >

        {fileChosen ? fileChosen : "Upload File"}
        <input
          type="file"
          id="file"
          onChange={fileUpload}
          accept="image/png, image/jpeg, image/webp"
        />

      </div>
       <div className="convert-box">
      <select name="convert" id="convert" onChange={changeFileType}>
        <option value="">Convert Image Type</option>
        <option value="jpeg">jpeg</option>
        <option value="png">png</option>
        <option value="webp">webp</option>
      </select>
    </div>
    <div container spacing={1} style={{textAlign:"center"}} className="size-buttons">
      {
        buttons.map(obj => (
          <div key={obj.value} className="buttons">
            <button
              variant="outlined"
              fullwidth="true"
              onClick={resizeImage}
              size={obj.width}
            >
              <div>
                <div className="iconContainer">{ obj.icon }</div>
                <div>{ obj.label }</div>
                <div variant="caption" component="div">{ `${obj.width || 'auto'} × ${obj.height || 'auto'}` }</div>
              </div>
            </button>
          </div>
        ))
      }
    </div>
   
    <div
     className="download-wrapper"
    >
      <a
          variant="contained"
          component="label"
          href={imageInfo}
          download
      >Download</a>
    </div>
    <div className="blub-info">
    <p style={{fontSize:'12px'}}>Need more features? visit <a href="https://grapecake.com" style={{fontWeight:'bold',textDecoration:'none',color:'rgb(118, 1, 253)'}}>grapecake.com</a></p>
    </div>
    <canvas id="canvas" style={{display:'none'}}></canvas>
    <img src="" id="image" style={{display:'none'}}/>
  </div>
  );
}

export default App;
