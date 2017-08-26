/**
 * Created by nazar on 8/24/17.
 */

function startGame(){

    window.element = document.getElementById("emoji");
    returnImage();
    timer();
    moveSelection();
}

function timer() {

    var step = 2;
    var x = element.offsetLeft;
    var y = element.offsetTop;
    // console.log(x,y);

    if(y<500){
        y=y+step;
        element.style.top = y+"px";
    }else{
        document.getElementById("gamediv").appendChild(element);
        console.log("touched bottom");
        reset();
        returnImage();
        timer();
    }

    my_time = setTimeout(timer,20); //learn
} 

function reset() {

    clearTimeout(my_time);
    element.style.left='500px';
    element.style.top='100px';
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
    left = left - 15;
    element.style.left = left+'px';
}

function rightArrowPressed() {

    console.log("right pressed.....");
    var right = element.offsetLeft;
    right = right + 15 ;
    element.style.left = right+'px';

}

function upArrowPressed() {
    console.log("upArrow pressed.....");
}

function downArrowPressed() {
    console.log("down pressed.....");
}


function returnImage(){

    // var imgNames = ['img1','img2'];
    // var imageName = imgNames[Math.floor(Math.random()*imgNames.length)]+".png";
    // element.src = imageName;

    img1 = new Image().src = "img1.png";
    img2 = new Image().src = "img2.png";
    img3 = new Image().src = "img3.png";

    var imageArray = [img1,img2,img3];
    element.src = imageArray[Math.floor(Math.random()*imageArray.length)];
}