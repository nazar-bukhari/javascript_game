/**
 * Created by nazar on 8/24/17.
 */
let canvas = null;
let element = returnImage();
let isTouchedBottom = false;
let lockCurrentGrid = false;
let ctx;
const width = 128;
const height = 128;
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
        // console.log('isLocked Y: ', isLocked);

        if (isLocked == '') { //open condition

            ctx.clearRect(x, y, width, height);
            y += step;
            ctx.drawImage(element, x, y, width, height);

        } else if (yAxisDepth == 0) {
            clearTimeout(myTime); //Game Over
        } else {
            lockCurrentGrid = true; //no space below.
        }

    } else if (y >= 500) {

        isTouchedBottom = true; //touched ultimate bottom.
    }

    if (isTouchedBottom || lockCurrentGrid) {

        // ctx.fillStyle = 'red';
        // ctx.fillRect(x, y, width, height);

        yAxisDepth = lockCurrentGrid ? (yAxisDepth - 1) : yAxisDepth;
        lock [xAxisDepth][yAxisDepth] = element.src;

        //Matching Logic

        let a2,a3,a4,a5;
        let a1 = lock [xAxisDepth][yAxisDepth];

        if(xAxisDepth < 5) { //5 = width-2

            // console.log('xAxisDepth 2: ', xAxisDepth + 1, ' yAxisDepth 2: ', yAxisDepth);
            // console.log('xAxisDepth 3: ', xAxisDepth + 2, ' yAxisDepth 2: ', yAxisDepth);
            a2 = lock [xAxisDepth + 1][yAxisDepth];
            a3 = lock [xAxisDepth + 2][yAxisDepth];
        }
        else if(xAxisDepth < 6){ //6 = width-1
            a2 = lock [xAxisDepth + 1][yAxisDepth];
        }

        if(xAxisDepth > 1){
            a4 = lock [xAxisDepth-1][yAxisDepth];
            a5 = lock [xAxisDepth-2][yAxisDepth];
        }
        else if(xAxisDepth === 1){
            a4 = lock [xAxisDepth-1][yAxisDepth];
        }


        if(a2 !== '' && a1 === a2){
            if(a1 === a3){
                console.log("match found1 ",xAxisDepth," ",yAxisDepth," ",width," ",height);
                ctx.clearRect(xAxisDepth,yAxisDepth,width,height);
                ctx.clearRect(xAxisDepth+1,yAxisDepth,width,height);
                ctx.clearRect(xAxisDepth+2,yAxisDepth,width,height);
            }else if(a1 === a5){
                console.log("match found1.1",xAxisDepth," ",yAxisDepth," ",width," ",height);
                ctx.clearRect(xAxisDepth,yAxisDepth,width,height);
                ctx.clearRect(xAxisDepth+1,yAxisDepth,width,height);
                ctx.clearRect(xAxisDepth+2,yAxisDepth,width,height);
            }
        }
        else if(a4 !== '' && a1 === a4){
            if(a5 !== '' && a1 === a5){
                console.log("match found2",xAxisDepth," ",yAxisDepth," ",width," ",height);
                ctx.clearRect(xAxisDepth,yAxisDepth,width,height);
                ctx.clearRect(xAxisDepth-1,yAxisDepth,width,height);
                ctx.clearRect(xAxisDepth-2,yAxisDepth,width,height);
            }
            else if(a1 === a2){
                console.log("match found2.1",xAxisDepth," ",yAxisDepth," ",width," ",height);
                ctx.clearRect(xAxisDepth,yAxisDepth,width,height);
                ctx.clearRect(xAxisDepth-1,yAxisDepth,width,height);
                ctx.clearRect(xAxisDepth-2,yAxisDepth,width,height);
            }
        }

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
        // console.log('xAxisDepth L: ', xAxisDepth, ' yAxisDepth L: ', yAxisDepth);
        // console.log('isLocked L: ', isLocked);

        if (isLocked === '') {
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
        // console.log('xAxisDepth R: ', xAxisDepth, ' yAxisDepth R: ', yAxisDepth);

        if (isLocked === '') {
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

    xAxis = 0;
    yAxis = 0;
    lock = [];

    for (xAxis = 0; xAxis < 7; xAxis++) {
        lock[xAxis] = [];
        for (yAxis = 0; yAxis < 5; yAxis++) {
            lock[xAxis][yAxis] = '' ;
        }
    }
}