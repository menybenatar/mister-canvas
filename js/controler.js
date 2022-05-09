"use strict";
const gTouchEvs = ["touchstart", "touchmove", "touchend"];
var gElCanvas;
var gCtx;
var gStartPos;
var gCurrShape = "circle";
var gBrashSize = 2;
var gColorShape = "balck";
var gIsDtrg = false;

function onInit() {
  gElCanvas = document.querySelector("canvas");
  gCtx = gElCanvas.getContext("2d");
  resizeCanvas();
  addListeners();
}
function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
  gCtx.fillStyle = document.querySelector("#bg-color").value;
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}
function addListeners() {
  gElCanvas.addEventListener("mousemove", onMove);
  gElCanvas.addEventListener("mousedown", onDown);
  gElCanvas.addEventListener("mouseup", onUp);
}

function onMove(ev) {
  if (gIsDtrg) {
    const pos = getEvPos(ev);
    gStartPos = pos;
    console.log();
    if (gCurrShape === "circle") drawArc(pos.x, pos.y, 40);
    else if (gCurrShape === "squere") drawRect(pos.x, pos.y, 40);
    else if (gCurrShape === "triangle") drawTriangle(pos.x, pos.y, 40);
    // moveCircle(pos.x, pos.y);
  }
}
function onDown(ev) {
  const pos = getEvPos(ev);

  gIsDtrg = true;
  gStartPos = pos;
  document.body.style.cursor = "grabbing";
}
function onUp() {
  gIsDtrg = false;
  document.body.style.cursor = "grab";
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function onChangeBGC(el) {
  console.log(el);
  gCtx.fillStyle = document.querySelector("#bg-color").value;
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
  // var colorBG = document.querySelector("#bg-color").value;
  // document.querySelector("#my-canvas").style.backgroundColor = colorBG;
}
function onChangeColorShape(ev) {
  gColorShape = document.querySelector("#shape-color").value;
}

function erase() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}
function setBrushSize(el) {
  gBrashSize = el.value;
}
function drawArc(x, y, size = 40) {
  gCtx.beginPath();
  gCtx.lineWidth = gBrashSize;
  gCtx.arc(x, y, size, 0, 2 * Math.PI);
  gCtx.strokeStyle = gColorShape;
  gCtx.stroke();
}
function drawRect(x, y, size = 40) {
  gCtx.beginPath();
  gCtx.rect(x, y, 150, 100);
  gCtx.strokeStyle = gColorShape;
  gCtx.lineWidth = gBrashSize;
  gCtx.stroke();
}
function drawTriangle(x, y) {
  gCtx.beginPath();
  gCtx.moveTo(x, y);
  gCtx.lineTo(x, x - 50);
  gCtx.lineTo(y - 50, y);
  gCtx.closePath();
  gCtx.strokeStyle = gColorShape;
  gCtx.lineWidth = gBrashSize;
  gCtx.stroke();
}
function setShape(el) {
  gCurrShape = el.value;
}

function save(elLink) {
  console.log("download", elLink);
  var data = gElCanvas.toDataURL();
  console.log(data);
  elLink.href = data;
}
