function init() {
  document.querySelector("#head").addEventListener("change", myFunction);
}

function myFunction() {
  console.log(this.value);

  setColor(this.value);
}

function setColor(color) {
  var value = color.match(/[A-Za-z0-9]{2}/g);

  value = value.map(function(v) {
    return parseInt(v, 16);
  });

  let RGBstr = value;
  console.log(RGBstr);
  calculate(RGBstr);
  return RGBstr;
}

function calculate(RGBstr) {
  console.log(RGBstr[0]);
  let r = RGBstr[0];
  let g = RGBstr[1];
  let b = RGBstr[2];

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l);
  calculateHarmonies(h, s, l);
}

function calculateHarmonies(h, s, l) {
  document
    .querySelector("#harmonies-select")
    .addEventListener("change", newColors);
  document.querySelector("#head").addEventListener("click", newColors);

  function newColors() {
    if (document.querySelector("select").value == "Analogous") {
      document.getElementById(
        "0"
      ).style.backgroundColor = `hsl(${h},${s}%,${l}%)`;

      document.getElementById("1").style.backgroundColor = `hsl(${h +
        10},${s}%,${l}%)`;
      document.getElementById("2").style.backgroundColor = `hsl(${h +
        20},${s}%,${l}%)`;
      document.getElementById("3").style.backgroundColor = `hsl(${h +
        30},${s}%,${l}%)`;
      document.getElementById("4").style.backgroundColor = `hsl(${h +
        40},${s}%,${l}%)`;
    }

    if (document.querySelector("select").value == "Monochromatic") {
      document.getElementById(
        "0"
      ).style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
      document.getElementById("1").style.backgroundColor = `hsl(${h},${s}%,${l +
        10}%)`;

      document.getElementById("2").style.backgroundColor = `hsl(${h},${s}%,${l +
        20}%)`;
      document.getElementById("3").style.backgroundColor = `hsl(${h},${s}%,${l +
        30}%)`;
      document.getElementById("4").style.backgroundColor = `hsl(${h},${s}%,${l +
        40}%)`;
    }

    if (document.querySelector("select").value == "Triad") {
      document.getElementById(
        "0"
      ).style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
      document.getElementById("1").style.backgroundColor = `hsl(${h -
        120},${s}%,${l + 10}%)`;

      document.getElementById("2").style.backgroundColor = `hsl(${h +
        120},${s}%,${l + 20}%)`;
      document.getElementById("3").style.backgroundColor = null;
      document.getElementById("4").style.backgroundColor = null;
    }

    if (document.querySelector("select").value == "Complementary") {
      document.getElementById(
        "0"
      ).style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
      document.getElementById("1").style.backgroundColor = `hsl(${h +
        180},${s}%,${l + 10}%)`;

      document.getElementById("2").style.backgroundColor = null;
      document.getElementById("3").style.backgroundColor = null;
      document.getElementById("4").style.backgroundColor = null;
    }
    if (document.querySelector("select").value == "Compound") {
      document.getElementById(
        "0"
      ).style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
      document.getElementById("1").style.backgroundColor = `hsl(${h +
        180},${s}%,${l + 10}%)`;

      document.getElementById("2").style.backgroundColor = `hsl(${h -
        200},${s}%,${l + 10}%)`;
      document.getElementById("3").style.backgroundColor = `hsl(${h +
        10},${s}%,${l + 10}%)`;
      document.getElementById("4").style.backgroundColor = `hsl(${h +
        20},${s}%,${l + 10}%)`;
    }

    if (document.querySelector("select").value == "Shades") {
      document.getElementById(
        "0"
      ).style.backgroundColor = `hsl(${h},${s}%,${l}%)`;

      document.getElementById("1").style.backgroundColor = `hsl(${h},${s -
        30}%,${l}%)`;
      document.getElementById("2").style.backgroundColor = `hsl(${h},${s -
        40}%,${l}%)`;
      document.getElementById("3").style.backgroundColor = `hsl(${h},${s -
        50}%,${l}%)`;
      document.getElementById("4").style.backgroundColor = `hsl(${h},${s -
        60}%,${l}%)`;
    }

    readRGBcolors("text0", "0");
    readRGBcolors("text1", "1");
    readRGBcolors("text2", "2");
    readRGBcolors("text3", "3");
    readRGBcolors("text4", "4");
  }
  newColors();
}

function readRGBcolors(textField, boxID) {
  document.getElementById(textField).textContent = document.getElementById(
    boxID
  ).style.backgroundColor;
}

init();
console.log(document.getElementById("colorPicker").offsetTop);
