

const canvasGrass = document.getElementById("canvas");
canvasGrass.height = window.innerHeight - 30;
canvasGrass.width = window.innerWidth - 30;

const ctx = canvasGrass.getContext("2d");

var imgCorona = document.getElementById("corona");
var imgTank = document.getElementById("tank");
var imgBullet = document.getElementById("bullet");
var imgBoom = document.getElementById("boom");
var imgParachute = document.getElementById("parachute");

let isBulletGoing = false;
let totalKill = 0;

const virus1 = {
    x: 20,
    y: 20,
    dx: 40,
    dy: 40
}

const virus2 = {
    x: 40,
    y: 40,
    dx: 40,
    dy: 40
}

const virus3 = {
    x: 60,
    y: 60,
    dx: 40,
    dy: 40
}

const virus4 = {
    x: 80,
    y: 80,
    dx: 40,
    dy: 40
}

const virus5 = {
    x: 100,
    y: 100,
    dx: 40,
    dy: 40
}

const virus6 = {
    x: 10,
    y: 10,
    dx: 40,
    dy: 40
}

const virus7 = {
    x: 10,
    y: 10,
    dx: 40,
    dy: 40
}

const virus8 = {
    x: 10,
    y: 10,
    dx: 40,
    dy: 40
}

const virus9 = {
    x: 10,
    y: 10,
    dx: 40,
    dy: 40
}

const virus10 = {
    x: 10,
    y: 10,
    dx: 40,
    dy: 40
}
const virus11 = {
    x: 10,
    y: 10,
    dx: 40,
    dy: 40
}
const virus12 = {
    x: 10,
    y: 10,
    dx: 40,
    dy: 40
}

const bulletInitialState = {
    x: 150,
    y: window.innerHeight - 155,
    dx: 40,
    dy: 40
}

const bullet = {
    x: 150,
    y: window.innerHeight - 155,
    dx: 40,
    dy: 40
}

const directionArrow = {
    x: 0,
    y: window.innerHeight - 150,
    dx: 150,
    dy: 170
}

const parachute1 = {
    x: 150,
    y: 0,
    dx: 100,
    dy: 100
}

const parachute2 = {
    x: 350,
    y: 0,
    dx: 100,
    dy: 100
}

function clearObj(virus) {
    ctx.clearRect(virus.x, virus.y, virus.dx, virus.dy);
}


function drawBoom(boom) {
    let newBoom = JSON.parse(JSON.stringify(boom));
    newBoom.dx = newBoom.dx * 3;
    newBoom.dy = newBoom.dy * 3;
    newBoom.y = newBoom.y - 30;
    newBoom.x = newBoom.x - 30;

    setTimeout(function () {
        ctx.drawImage(imgBoom, newBoom.x, newBoom.y, newBoom.dx, newBoom.dy);
    }, 120);
    setTimeout(function () {
        clearObj(newBoom);
    }, 250);

}

function showScore() {
    clearObj({ x: 0, y: 0, dx: 200, dy: 200 });
    ctx.fillStyle = "black";
    ctx.font = "lighter 18px Arial";
    ctx.fillText("Score: " + totalKill, 20, 30);
    ctx.font = "10px Arial";
}

function drawParachute(parachute, jump) {
    clearObj(parachute);

    parachute.x += jump;
    parachute.y += jump;


    ctx.drawImage(imgParachute, parachute.x, parachute.y, parachute.dx, parachute.dy);

    let diffX = (bullet.x) - (parachute.x);
    let diffY = (bullet.y) - (parachute.y + parachute.dy);


    if (isBulletGoing && (diffX == 0 || (diffX < 0 && diffX > -50) || (diffX > 0 && diffX < 50))
        && (diffY == 0 || (diffY < 0 && diffY > -70) || (diffY > 0 && diffY < 70))) {


        drawBoom(parachute);

        totalKill -= 25;
        if(totalKill<0){
            totalKill = 0;
        }

        parachute.y = 100;
        parachute.x = 0;
    }


    if ((parachute.x + parachute.dx) > canvasGrass.width + 100) {
        clearObj(parachute);
        parachute.x -= window.innerWidth - 100;
        parachute.y = 0;
    } else if ((parachute.y + parachute.dy) > canvasGrass.height + 100) {
        clearObj(parachute);
        parachute.y = 0;
        parachute.x -= window.innerWidth - 100;
    } else if (parachute.x < 0) {
        clearObj(parachute);
        parachute.x += window.innerWidth - 100;
        parachute.y = 0;
    } else if (parachute.y < 0) {
        clearObj(parachute);
        parachute.y = 0;
        parachute.x -= window.innerWidth - 100;
    }
}

function drawVirus(virus, jump) {

    showScore();

    clearObj(virus);

    virus.x += jump;
    virus.y += jump;


    // ctx.fillRect(virus.x, virus.y, virus.dx, virus.dy);
    ctx.drawImage(imgCorona, virus.x, virus.y, virus.dx, virus.dy);

    let virusOneDiffX = (bullet.x) - (virus.x);
    let virusOneDiffY = (bullet.y) - (virus.y);

    if (isBulletGoing && (virusOneDiffX == 0 || (virusOneDiffX < 0 && virusOneDiffX > -20) || (virusOneDiffX > 0 && virusOneDiffX < 20))
        && (virusOneDiffY == 0 || (virusOneDiffY < 0 && virusOneDiffY > -20) || (virusOneDiffY > 0 && virusOneDiffY < 20))) {


        drawBoom(virus);

        totalKill += 5;

        virus.y = 100;
        virus.x = 0;
    }

    if (virus.x < 170 && virus.y > (window.innerHeight - 200)) {
        clearObj(virus);
        drawDirectionArrow();
        virus.y = 0;
        virus.x = 0;
    }

    if ((virus.x + virus.dx) > canvasGrass.width) {
        clearObj(virus);
        virus.x -= window.innerWidth - 100;
    } else if ((virus.y + virus.dy) > canvasGrass.height) {
        clearObj(virus);
        virus.y -= window.innerHeight - 100;
    } else if (virus.x < 0) {
        clearObj(virus);
        virus.x += window.innerWidth - 100;
    } else if (virus.y < 0) {
        clearObj(virus);
        virus.y += window.innerHeight - 100;
    }
}

function clearBullet() {
    ctx.clearRect(bullet.x, bullet.y, bullet.dx, bullet.dy);
}

let bulletAnimationRequest;


function drawBullet() {
    isBulletGoing = true;
    clearBullet();
    ctx.fillStyle = "white";
    bullet.x += 8;
    bullet.y -= 6;
    // ctx.fillRect(bullet.x, bullet.y, bullet.dx, bullet.dy);
    ctx.drawImage(imgBullet, bullet.x, bullet.y, bullet.dx, bullet.dy);

    bulletAnimationRequest = window.requestAnimationFrame(drawBullet);
    if (bullet.x < -50 || bullet.y < -50 || bullet.y > window.innerHeight || bullet.x > window.innerWidth) {

        window.cancelAnimationFrame(bulletAnimationRequest);
        bullet.x = bulletInitialState.x;
        bullet.y = bulletInitialState.y;

        clearBullet();
        ctx.fillStyle = "Red";
        //ctx.fillRect(bullet.x, bullet.y, bullet.dx, bullet.dy);
        ctx.fillText("Fire", bullet.x, bullet.y + 40);

        isBulletGoing = false;


    }
}

function drawDirectionArrow() {
    // ctx.beginPath();
    // ctx.moveTo(directionArrow.x, directionArrow.y);
    // ctx.lineTo(directionArrow.dx, directionArrow.dy);
    // ctx.stroke();

    // ctx.fillRect(directionArrow.x, directionArrow.y, directionArrow.dx, directionArrow.dy);
    ctx.drawImage(imgTank, directionArrow.x, directionArrow.y, directionArrow.dx, directionArrow.dy);
}

function initVirus() {
    drawVirus(virus1, 0.5);
    drawVirus(virus2, 1);
    drawVirus(virus3, 1.5);
    drawVirus(virus4, 2);
    drawVirus(virus5, 2.5);
    drawVirus(virus6, 3);
    drawVirus(virus7, -0.5);
    drawVirus(virus8, -1);
    drawVirus(virus9, -1.5);
    drawVirus(virus10, -2);
    drawVirus(virus11, -2.5);
    drawVirus(virus12, -3);

    drawParachute(parachute1, 0.5);
    drawParachute(parachute2, 2);

    window.requestAnimationFrame(initVirus);
}



initVirus();

setTimeout(() => {
    drawDirectionArrow();

}, 10);


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

document.addEventListener("click", (evt) => {
    var pos = getMousePos(canvasGrass, evt);
    drawDirectionArrow();

    //console.log(pos.x, pos.y, directionArrow.x, directionArrow.y, ((pos.x < directionArrow.x + 100) && pos.y > directionArrow.y));
    if (!isBulletGoing
       //  && ((pos.x < directionArrow.x + 100) && pos.y > directionArrow.y)
         ) {
         }
           // bullet.x = bulletInitialState.x;
           // bullet.y = bulletInitialState.y;

        drawBullet();
    

});






