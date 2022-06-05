const canvasSize = 50 * 16;
const sizeExt = 'px';
const maxPixelDensity = 100;

const colors = ['black', 'saddlebrown', 'gray', 'red', 'orange', 'rgb(250, 250, 0)', 'rgb(0, 230, 0)', '#1767fc', 'blueviolet', 'pink', 'white'];
let selectedColor = 'black';

let mouseIsDown = false;

window.addEventListener('mousedown', () => {
    mouseIsDown = true;
})
window.addEventListener('mouseup', () => {
    mouseIsDown = false;
})

const sizeInput = document.getElementById('grid-size');

let pixelDensity = sizeInput.value;

const input = document.getElementById('grid-size');
input.max = maxPixelDensity;
input.addEventListener('change', updateGrid)

const clearButton = document.getElementById('clear-grid');
clearButton.addEventListener('click', renderGrid)

const colorPanel = document.getElementById('colors');
const colorNodes = [];
for (const [index, color] of colors.entries()) {
    const colorSwatch = document.createElement('div');
    
    colorSwatch.classList.add('color-swatch');
    colorSwatch.style.background = color;
    if (color === selectedColor) {
        colorSwatch.classList.add('selected');
    }
    colorSwatch.addEventListener('click', selectColor);

    colorNodes.push(colorSwatch);
    colorPanel.appendChild(colorSwatch);
}

renderGrid();

function renderGrid() {
    const canvas = document.getElementById('canvas');
    canvas.textContent = '';
    canvas.style.width = `${canvasSize}${sizeExt}`;
    canvas.style.height = `${canvasSize}${sizeExt}`;

    for (let i = 0; i < pixelDensity ** 2; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        const pixelSize = canvasSize / pixelDensity;
        pixel.style.height = `${pixelSize}${sizeExt}`;
        pixel.style.width = `${pixelSize}${sizeExt}`;

        pixel.addEventListener('mouseenter', paint);
        pixel.addEventListener('mousedown', paintNow);

        canvas.appendChild(pixel);
    }
}

function updateGrid() {
    if (this.value > maxPixelDensity) {
        this.value = maxPixelDensity;
    }
    if (this.value < 1) {
        this.value = 1;
    }

    renderGrid(this.value);
}

function paintNow() {
    this.style.background = selectedColor;
}

function paint() {
    if (mouseIsDown) {
        this.style.background = selectedColor;
    }  
}

function selectColor() {
    selectedColor = this.style.background;
    colorNodes.forEach((node) => {
        node.classList.remove('selected');
    })
    this.classList.add('selected');
}