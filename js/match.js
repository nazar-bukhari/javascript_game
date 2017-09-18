/**
 * Created by nazar on 9/14/17.
 */

let pixelValue = 128;
let score = 0;

function matchPuzzle() {

    let a2, a3, a4, a5,h1,h2,h3;
    let a1 = lock [xAxisDepth][yAxisDepth];

    if (xAxisDepth < maxXAxisDepth - 2) { //5 = width-2

        a2 = lock [xAxisDepth + 1][yAxisDepth];
        a3 = lock [xAxisDepth + 2][yAxisDepth];
    }
    else if (xAxisDepth < maxXAxisDepth - 1) { //6 = width-1
        a2 = lock [xAxisDepth + 1][yAxisDepth];
    }

    if (xAxisDepth > 1) {
        a4 = lock [xAxisDepth - 1][yAxisDepth];
        a5 = lock [xAxisDepth - 2][yAxisDepth];
    }
    else if (xAxisDepth === 1) {
        a4 = lock [xAxisDepth - 1][yAxisDepth];
    }

    if(yAxisDepth < maxYAxisDepth - 2){

        h1 = lock[xAxisDepth][yAxisDepth];
        h2 = lock[xAxisDepth][yAxisDepth+1];
        h3 = lock[xAxisDepth][yAxisDepth+2];

        /**
         * Vertical Matching
         */
        if(h1 === h2 && h2 === h3){

            console.log("Vertical Match found");
            score++;
            document.getElementById('gameScore').innerHTML = score.toString() ;

            for(let yAxisShifter = yAxisDepth; yAxisShifter < maxYAxisDepth; yAxisShifter++){
                ctx.clearRect(xAxisDepth*pixelValue,yAxisShifter*pixelValue,width,height);
                lock[xAxisDepth][yAxisShifter] = '';
            }
        }
    }


    /**
     * Horizontal Matching
     */
    if (a2 !== '' && a1 === a2) {
        if (a1 === a3) { //last emoji leftmost

            // console.log(x, " ", y);
            // console.log("match found1 ", xAxisDepth, " ", yAxisDepth, " ", width, " ", height);
            score++;
            document.getElementById('gameScore').innerHTML = score.toString() ;

            for (let yAxisShifter = yAxisDepth; yAxisShifter > 0; yAxisShifter--) {

                for (let xAxisShifter = 0; xAxisShifter < 3; xAxisShifter++) {

                    emojiShifting(xAxisShifter,yAxisShifter);

                }
            }


        } else if (a1 === a4) {

            // console.log(x, " ", y);
            // console.log("match found1.1", xAxisDepth, " ", yAxisDepth, " ", width, " ", height);
            score++;
            document.getElementById('gameScore').innerHTML = score.toString() ;

            for (let yAxisShifter = yAxisDepth; yAxisShifter > 0; yAxisShifter--) {

                for (let xAxisShifter = -1; xAxisShifter < 2; xAxisShifter++) {

                    emojiShifting(xAxisShifter,yAxisShifter);
                }
            }

        }
    }
    else if (a4 !== '' && a1 === a4) {
        if (a5 !== '' && a1 === a5) { //last emoji at rightmost

            // console.log("match found2", xAxisDepth, " ", yAxisDepth, " ", width, " ", height);
            score++;
            document.getElementById('gameScore').innerHTML = score.toString() ;

            for (let yAxisShifter = yAxisDepth; yAxisShifter > 0; yAxisShifter--) {

                for (let xAxisShifter = 0; xAxisShifter > -3; xAxisShifter--) {

                    emojiShifting(xAxisShifter,yAxisShifter);
                }
            }

        }
        else if (a1 === a2) { //last emoji in middle (No Use)

            // console.log("match found2.1", xAxisDepth, " ", yAxisDepth, " ", width, " ", height);
            score++;
            document.getElementById('gameScore').innerHTML = score.toString() ;

            for (let yAxisShifter = yAxisDepth; yAxisShifter > 0; yAxisShifter--) {

                for (let xAxisShifter = -1; xAxisShifter < 2; xAxisShifter++) {

                    emojiShifting(xAxisShifter,yAxisShifter);
                }
            }

        }
    }

}

function emojiShifting(xAxisShifter,yAxisShifter){

    let imageName = lock[xAxisDepth + xAxisShifter][yAxisShifter - 1];
    ctx.clearRect((xAxisDepth + xAxisShifter) * pixelValue, (yAxisShifter * pixelValue), width, height);

    if (imageName !== '') {

        ctx.clearRect((xAxisDepth + xAxisShifter) * pixelValue, ((yAxisShifter - 1) * pixelValue), width, height);
        let imageObj = new Image();
        imageObj.src = imageName;
        console.log(imageObj);
        ctx.drawImage(imageObj, (xAxisDepth + xAxisShifter) * pixelValue, yAxisShifter * pixelValue, width, height);
        lock[xAxisDepth + xAxisShifter][yAxisShifter] = lock[xAxisDepth + xAxisShifter][yAxisShifter - 1];
    }
    else{
        lock[xAxisDepth + xAxisShifter][yAxisShifter] = '';
    }
}
