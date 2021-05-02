// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
//Form
const genForm = document.getElementById('generate-meme');

const imgInput = document.getElementById('image-input');

const canvas = document.getElementById('user-image');
//Canvas
var ctx = canvas.getContext('2d');


// Fires whenever the img object loads a new image (such as with img.src =)

img.addEventListener('load', () => {
  
  //const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /*clear.disabled = true;
  readText.disabled = true;
  generate.disabled = false;*/

  if (img.width != img.height) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  let dimensions = getDimmensions(canvas.width, canvas.height, img.width, img.height);

  ctx.drawImage(img, dimensions['startX'], dimensions['startY'], dimensions['width'], dimensions['height']);

  /*
  ctx.fillStyle = 'black';
  img.src = document.querySelector('canvas[alt]');
  console.log(canvas);
  */

/*
  var clicked = false;
  var autographer

  ctx.fillStyle = 'black';*/
  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
})


 

imgInput.addEventListener('change', () => {
  //img.onload = draw;
  //img.onerror = failed;
  img.src = URL.createObjectURL(imgInput.files[0]);
  img.alt = imgInput.files[0].name;
  canvas.alt = imgInput.files[0].name;
})

function draw() {
  canvas.width = this.width;
  canvas.height = this.height;
  ctx.drawImage(this, 0, 0);
}

function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}



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

//Enable voice list
voiceSelect.disabled = false;


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

//SpeechSynthesis
var synth = speechSynthesis;
var voices = [];
function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.remove(0);
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
}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

/*var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');
*/


//button:read text
readText.addEventListener('click', (event) => {
  event.preventDefault();
  var utterThis = new SpeechSynthesisUtterance(top.value + ' ' + bottom.value);
  
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (var i = 0; i < voices.length; i++) {
    if(voices[i].name == selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  //utterThis.pitch = pitch.value;
  //utterThis.rate = rate.value;
  utterThis.volume = input.value/100;
  synth.speak(utterThis);
  
})

//Volume Slider
const input = document.querySelector('#volume-group > input[type="range"]');
const soundSrc = document.querySelector('#volume-group > img');

input.addEventListener('input', () =>  {
  //Volume icons
    if ( input.value >= 67) {
      soundSrc.src = "icons/volume-level-3.svg"
    }
    else if ( input.value >=34) {
      soundSrc.src = "icons/volume-level-2.svg"
    }
    else if ( input.value >= 1) {
      soundSrc.src = "icons/volume-level-1.svg"
    }
    else {
      soundSrc.src = "icons/volume-level-0.svg"
    }
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
