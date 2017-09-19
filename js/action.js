/**
 * Created by nazar on 8/24/17.
 */
let canvas = null;
let element = returnImage();
let isTouchedBottom = false;
let lockCurrentGrid = false;
let ctx;
let x,y;
const width = 128;
const height = 128;
let yAxisDepth = -1;
let xAxisDepth = 3;
let maxXAxisDepth = 7;
let maxYAxisDepth = 5;
let isLocked;

function startGame() {

    x = 384;
    y = -128;
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.drawImage(element, x, y, 128, 128);
    ctx.closePath();
    createGrid();
    createArray();
    timer();
}

function returnImage() {

    const imageArray = ['img1.png', "img2.png", "img3.png"];
    const img = document.createElement("img");
    img.src = imageArray[Math.floor(Math.random() * imageArray.length)];
    return img;
}

function timer() {

    const step = 128;
    const myTime = setTimeout(timer, 500);

    if (y < 500) {

        yAxisDepth++; //*
        isLocked = lock[xAxisDepth][yAxisDepth];
        // console.log('isLocked Y: ', isLocked);

        if (isLocked === '') { //open condition

            ctx.clearRect(x, y, width, height);
            y += step;
            ctx.drawImage(element, x, y, width, height);

        } else if (yAxisDepth === 0) {
            clearTimeout(myTime); //Game Over
        } else {
            lockCurrentGrid = true; //no space below.
        }

    } else if (y >= 500) {

        isTouchedBottom = true; //touched ultimate bottom.
    }

    if (isTouchedBottom || lockCurrentGrid) {

        /**
         * yAxisDepth value is incremented before checking its null value to check the lock value(*).
         * BCoz lock will be alwz 1step below the current y position
         * That incremented value is decreased here when 'lockCurrentGrid'
         * @type {number}
         */
        yAxisDepth = lockCurrentGrid ? (yAxisDepth - 1) : yAxisDepth;
        lock [xAxisDepth][yAxisDepth] = element.src;

        matchPuzzle();

        isTouchedBottom = false;
        lockCurrentGrid = false;

        element = returnImage();
        clearTimeout(myTime);
        resetAllValue();
        timer();
    }
}

function resetAllValue() {

    y = -128;
    x = 384;
    yAxisDepth = -1;
    xAxisDepth = 3;

}

function moveSelection(event) {

    switch (event.keyCode) {

        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 40:
            downArrowPressed();
            break;
    }
}

function leftArrowPressed() {

    if (x > 0) {

        xAxisDepth--;
        isLocked = lock[xAxisDepth][yAxisDepth];

        if (isLocked === '') {

            ctx.clearRect(x, y, width, height);
            x -= width;
            ctx.beginPath();
            ctx.drawImage(element, x, y, width, height);
            ctx.closePath();

        } else {
            xAxisDepth++;
        }
    }
}

function rightArrowPressed() {

    if (x < 768) {

        xAxisDepth++;
        isLocked = lock[xAxisDepth][yAxisDepth];

        if (isLocked === '') {

            ctx.clearRect(x, y, width, height);
            x += width;
            ctx.beginPath();
            ctx.drawImage(element, x, y, width, height);
            ctx.closePath();

        } else {
            xAxisDepth--;
        }
    }
}


function downArrowPressed() {
    console.log("down pressed.....")
}

function createGrid() {

    for (let x = 128; x < canvas.width; x += 128) {

        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (let y = 128; y < canvas.height; y += 128) {

        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.strokeStyle = "red";
    ctx.stroke();
}


function createArray() {

    let xAxis = 0;
    let yAxis = 0;
    lock = [];

    for (xAxis = 0; xAxis < maxXAxisDepth; xAxis++) {
        lock[xAxis] = [];
        for (yAxis = 0; yAxis < maxYAxisDepth; yAxis++) {
            lock[xAxis][yAxis] = '' ;
        }
    }
}