const canvasSize = 50 * 16;
const sizeExt = 'px';
const maxPixelDensity = 100;

const colors = ['black', 'red', 'orange', 'yellow', 'rgb(0,255,0)', 'blue', 'blueviolet', 'pink', 'white'];
let selectedColor = 'black';


const sizeInput = document.getElementById('grid-size');

let pixelDensity = sizeInput.value;

const input = document.getElementById('grid-size');
input.max = maxPixelDensity;
input.addEventListener('change', updateGrid)

const clearButton = document.getElementById('clear-grid');
clearButton.addEventListener('click', updateGrid)

const colorPanel = document.getElementById('colors');
for (const [index, color] of colors.entries()) {
    const colorSwatch = document.createElement('div');
    colorSwatch.classList.add('color-swatch');
    colorSwatch.style.background = color;
    colorSwatch.addEventListener('click', selectColor);

    colorPanel.appendChild(colorSwatch);
}

renderGrid(pixelDensity);

function renderGrid(pixelDensity) {
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

        pixel.addEventListener('click', paint);

        canvas.appendChild(pixel);
    }
}

function updateGrid() {
    pixelDensity = sizeInput.value;
    if (pixelDensity > maxPixelDensity) {
        this.value = maxPixelDensity;
    }
    if (pixelDensity < 1) {
        this.value = 1;
    }
    renderGrid(pixelDensity);
}

function paint() {
    this.style.background = selectedColor;
}

function selectColor() {
    selectedColor = this.style.background;
    console.log(selectedColor)
}