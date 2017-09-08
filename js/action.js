/**
 * Created by nazar on 8/24/17.
 */
let canvas = null;
let element = returnImage();
let isTouchedBottom = false;
let lockCurrentGrid = false;
let ctx;
let width = 128;
let height = 128;
let yAxisDepth = -1;
let xAxisDepth = 3;
let isLocked;

function startGame() {

    x = 384;
    y = -128;
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    ctx.drawImage(element, x, y, 128, 128);
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

        yAxisDepth++;
        isLocked = lock[xAxisDepth][yAxisDepth];
        console.log('isLocked Y: ', isLocked);

        if (isLocked == 0) {

            ctx.clearRect(x, y, width, height);
            y += step;
            ctx.drawImage(element, x, y, width, height);

        } else if (yAxisDepth == 0) {
            clearTimeout(myTime); //Game Over
        } else {
            lockCurrentGrid = true;
        }

    } else if (y >= 500) {

        isTouchedBottom = true;
    }

    if (isTouchedBottom || lockCurrentGrid) {

        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, width, height);

        yAxisDepth = lockCurrentGrid ? (yAxisDepth - 1) : yAxisDepth;
        // console.log('isLocked: ' + isLocked);
        console.log('xAxisDepth: ', xAxisDepth, ' yAxisDepth: ', yAxisDepth);
        lock [xAxisDepth][yAxisDepth] = 1;

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

    // console.log('x=',x);
    if (x > 0) {

        xAxisDepth--;
        isLocked = lock[xAxisDepth][yAxisDepth];
        console.log('xAxisDepth L: ', xAxisDepth, ' yAxisDepth L: ', yAxisDepth);
        console.log('isLocked L: ', isLocked)


        if (isLocked == 0) {
            ctx.clearRect(x, y, width, height);
            x -= 128;
            ctx.drawImage(element, x, y, width, height);
        } else {
            xAxisDepth++;
        }
    }
}

function rightArrowPressed() {

    if (x < 768) {

        xAxisDepth++;
        isLocked = lock[xAxisDepth][yAxisDepth];
        console.log('xAxisDepth R: ', xAxisDepth, ' yAxisDepth R: ', yAxisDepth);

        if (isLocked == 0) {
            ctx.clearRect(x, y, width, height);
            x += 128;
            ctx.drawImage(element, x, y, width, height);
        } else {
            xAxisDepth--;
        }
    }
}


function downArrowPressed() {
    console.log("down pressed.....")
}

function createGrid() {

    for (var x = 128; x < canvas.width; x += 128) {

        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (var y = 128; y < canvas.height; y += 128) {

        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.strokeStyle = "red";
    ctx.stroke();
}


function createArray() {

    xAxis = 0;
    yAxis = 0;
    lock = [];

    for (xAxis = 0; xAxis < 7; xAxis++) {
        lock[xAxis] = [];
        for (yAxis = 0; yAxis < 5; yAxis++) {
            lock[xAxis][yAxis] = 0;
        }
    }
}