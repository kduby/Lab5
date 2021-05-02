// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

const canvas = document.getElementById('user-image');
// Fires whenever the img object loads a new image (such as with img.src =)
img.src = //input type file
img.addEventListener('load', () => {
  // TODO
  
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  clear.disabled = true;
  readText.disabled = true;
  generate.disabled = false;

   ctx.fillStyle = 'black';
/*
  var clicked = false;
  var autographer

  ctx.fillStyle = 'black';*/
  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});
 
/*
input.addEventListener('change', () => {
  .alt
})*/

//Form
const genForm = document.getElementById('generate-meme');
//Top text input
const top = document.getElementById('text-top');
//Bottom text input
const bottom = document.getElementById('text-bottom');
//clear button
const clear = document.querySelector('button[type="reset"]');
//read text button
const readText = document.querySelector('button[type="button"]');
//generate button
const generate = document.querySelector('button[type="submit"]');
//voice list
const voiceSelect = document.getElementById('voice-selection');

var ctx = canvas.getContext('2d');
voiceSelect.disabled = false;
/*
var VL = {
  
}

VL.populateVoiceList();
VL.populateVoiceList();
VL.populateVoiceList();
VL.populateVoiceList();
*/

genForm.addEventListener('submit', (event) => {
  event.preventDefault();
  ctx.font = '30px Arial';
  
  //position

  ctx.textAlign = 'center';
  ctx.fillText(top.value, canvas.width/2, 40);
  ctx.fillText(bottom.value, canvas.width/2, canvas.height - 10);
  console.log(ctx);

  //toggle buttons
  clear.disabled = false;
  readText.disabled = false;
  generate.disabled = true;
  

})

// set attribute



clear.addEventListener('click', (event) => {
  event.preventDefault();
  //delete text & image
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //ctx.fillText("",0,0);
  console.log(ctx);
  clear.disabled = true;
  readText.disabled = true;
  generate.disabled = false;
})



//list = "hi";
//button:read text
//const list = document.querySelector('option[value="none"]');
readText.addEventListener('click', (event) => {

    var voices = speechSynthesis.getVoices();
    
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
  
    }
  
  
  console.log(option);
  //console.log(option);
  //console.log(list);
  var utterThis = new SpeechSynthesisUtterance();
})






/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
