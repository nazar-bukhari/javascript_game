/**
 * Created by nazar on 9/14/17.
 */

function matchPuzzle() {

    let a2, a3, a4, a5;
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


    if (a2 !== '' && a1 === a2) {
        if (a1 === a3) {

            console.log(x, " ", y);
            console.log("match found1 ", xAxisDepth, " ", yAxisDepth, " ", width, " ", height);
            // ctx.clearRect(x,y,width,height);

            ctx.clearRect(xAxisDepth * 128, yAxisDepth * 128, width, height);
            ctx.clearRect((xAxisDepth + 1) * 128, (yAxisDepth * 128), width, height);
            ctx.clearRect((xAxisDepth + 2) * 128, (yAxisDepth * 128), width, height);

            lock[xAxisDepth][yAxisDepth] = '';
            lock[xAxisDepth + 1][yAxisDepth] = '';
            lock[xAxisDepth + 2][yAxisDepth] = '';

            // console.log('link: ',lock[xAxisDepth][yAxisDepth-1]);
            // let imageObj = new Image();
            // imageObj.src = lock[xAxisDepth][yAxisDepth-1];
            // ctx.drawImage(imageObj,xAxisDepth*128,yAxisDepth*128,width,height);
            let imageObj;

            for (let i = 0; i < 3; i++) {

                ctx.clearRect((xAxisDepth + i) * 128, ((yAxisDepth-1) * 128), width, height);

                lock[xAxisDepth+i][yAxisDepth-1] = '';

                imageObj = new Image();
                imageObj.src = lock[xAxisDepth + i][yAxisDepth - 1];
                ctx.drawImage(imageObj, xAxisDepth * 128, yAxisDepth * 128, width, height);
            }


        } else if (a1 === a4) {

            console.log(x, " ", y);
            console.log("match found1.1", xAxisDepth, " ", yAxisDepth, " ", width, " ", height);
            // ctx.clearRect(x,y,width,height);

            ctx.clearRect(xAxisDepth * 128, yAxisDepth * 128, width, height);
            ctx.clearRect((xAxisDepth + 1) * 128, yAxisDepth * 128, width, height);
            ctx.clearRect((xAxisDepth - 1) * 128, yAxisDepth * 128, width, height);

            lock[xAxisDepth][yAxisDepth] = '';
            lock[xAxisDepth + 1][yAxisDepth] = '';
            lock[xAxisDepth - 1][yAxisDepth] = '';

            console.log('link: ', lock[xAxisDepth][yAxisDepth - 1]);
            let imageObj = new Image();
            imageObj.src = lock[xAxisDepth][yAxisDepth - 1];
            ctx.drawImage(imageObj, xAxisDepth * 128, yAxisDepth * 128, width, height);

        }
    }
    else if (a4 !== '' && a1 === a4) {
        if (a5 !== '' && a1 === a5) {

            console.log(x, " ", y);
            console.log("match found2", xAxisDepth, " ", yAxisDepth, " ", width, " ", height);

            ctx.clearRect(xAxisDepth * 128, yAxisDepth * 128, width, height);
            ctx.clearRect((xAxisDepth - 1) * 128, yAxisDepth * 128, width, height);
            ctx.clearRect((xAxisDepth - 2) * 128, yAxisDepth * 128, width, height);

            lock[xAxisDepth][yAxisDepth] = '';
            lock[xAxisDepth - 1][yAxisDepth] = '';
            lock[xAxisDepth - 2][yAxisDepth] = '';

            console.log('link: ', lock[xAxisDepth - 1][yAxisDepth - 1]);
            let imageObj = new Image();
            imageObj.src = lock[xAxisDepth - 1][yAxisDepth - 1];
            ctx.drawImage(imageObj, (xAxisDepth - 1) * 128, yAxisDepth * 128, width, height);

        }
        else if (a1 === a2) {

            console.log(x, " ", y);
            console.log("match found2.1", xAxisDepth, " ", yAxisDepth, " ", width, " ", height);

            ctx.clearRect(xAxisDepth * 128, yAxisDepth * 128, width, height);
            ctx.clearRect((xAxisDepth - 1) * 128, yAxisDepth * 128, width, height);
            ctx.clearRect((xAxisDepth + 1) * 128, yAxisDepth * 128, width, height);

            lock[xAxisDepth][yAxisDepth] = '';
            lock[xAxisDepth - 1][yAxisDepth] = '';
            lock[xAxisDepth + 1][yAxisDepth] = '';

        }
    }
}
