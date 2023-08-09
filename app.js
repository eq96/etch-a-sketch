// Select the elements on the page - canvas, shake button
const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakeButton = document.querySelector(".shake");

const { width, height } = canvas;
const MOVE_AMOUNT = 2;

// set up our canvas for drawing
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

let isDrawing = false;

// write a draw function
function draw(e) {
  if (!isDrawing) return;

  if (e.type === "mousemove") {
    ctx.lineTo(e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  } else if (e.type === "touchmove") {
    ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  }

  ctx.stroke();
}

// Add event listeners
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  x = e.offsetX;
  y = e.offsetY;
  ctx.beginPath();
  ctx.moveTo(x, y);
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  x = e.touches[0].clientX;
  y = e.touches[0].clientY;
  ctx.beginPath();
  ctx.moveTo(x, y);
});

canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", () => (isDrawing = false));

// Clear canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

shakeButton.addEventListener("click", clearCanvas);
