/**
 * Created by nazar on 8/24/17.
 */
let imageDiv =null;
let element = returnImage();

function startGame() {
    imageDiv = document.getElementById('emoji');
    console.log(imageDiv);
    imageDiv.appendChild(element);
    timer();
}

function returnImage() {

    const imageArray = ['img1.png',"img2.png","img3.png"];
    const img = document.createElement("img");
    img.src = imageArray[Math.floor(Math.random()*imageArray.length)];
    img.setAttribute("class","emoji-img");
    return img;
}

function timer() {

    const step = 2;
    let y = element.offsetTop;
    const myTime = setTimeout(timer,20);

    if(y<500){
        y += step;
        element.style.top = `${y}px`;
        console.log("top: ",element.style.top);
        console.log("y= ",y);
    }else{

        console.log("touched bottom");
        element = returnImage();
        imageDiv.appendChild(element);
        clearTimeout(myTime);
        timer();
    }
}

function moveSelection(event) {

    switch (event.keyCode){

        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 38:
            upArrowPressed();
            break;
        case 40:
            downArrowPressed();
            break;
    }
}

function leftArrowPressed(){

    console.log("left pressed.....");
    var left = element.offsetLeft;
    left -= 15;
    element.style.left = `${left}px`;
}

function rightArrowPressed() {

    console.log("right pressed.....");
    var right = element.offsetLeft;
    right += 15 ;
    element.style.left = `${right}px`;
}


function downArrowPressed() {
    console.log("down pressed.....");
}