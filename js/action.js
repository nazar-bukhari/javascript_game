/**
 * Created by nazar on 8/24/17.
 */
let imageDiv = null;
let element = returnImage();
let myDivLeft = 0;
let myDivTop = 100;
let left

function startGame() {
    imageDiv = document.getElementById('emoji');
    imageDiv.appendChild(element);
    timer();
}

function returnImage() {

    const imageArray = ['img1.png', "img2.png", "img3.png"];
    const img = document.createElement("img");
    img.src = imageArray[Math.floor(Math.random() * imageArray.length)];
    img.setAttribute("class", "emoji-img");
    return img;
}

function timer() {

    const step = 2;
    let y = element.offsetTop;
    const myTime = setTimeout(timer, 20);

    if (y < 500) {
        y += step;
        element.style.top = `${y}px`;
        // console.log("top: ",element.style.top);
        // console.log("y= ",y);
    } else {

        console.log("touched bottom");
        element = returnImage();
        imageDiv.appendChild(element);
        clearTimeout(myTime);
        timer();
    }
}

function moveSelection(event) {

    switch (event.keyCode) {

        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        // case 38:
        //     upArrowPressed();
        //     break;
        case 40:
            downArrowPressed();
            break;
    }
}

function leftArrowPressed() {

    left = element.offsetLeft;
    // console.log('left',left)

    if (left > 0) {
        left -= 128;
        element.style.left = `${left}px`;
    }
    //if div present in left, shift image to left div
    createGrid();
}

function rightArrowPressed() {

    right = element.offsetLeft;
    console.log('right',right)
    if(right < 896) {
        right += 128;
        element.style.left = `${right}px`;
    }
    createGrid();
}


function downArrowPressed() {
    console.log("down pressed.....");
}

function createGrid() {

    let div = document.createElement('div');
    div.setAttribute('id', 'mydiv');
    div.className = 'mdiv';
    div.style.position = "absolute";
    // myDivLeft += 128;
    // myDivTop += 128;
    // div.style.left = `${myDivLeft}px`;
    // div.style.top = `${myDivTop}px`;
    div.style.left = element.style.left;
    div.style.top = element.style.top;

    imageDiv.appendChild(div);

    // console.log(element.style.left);
}