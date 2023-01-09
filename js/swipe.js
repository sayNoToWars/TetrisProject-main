// Вешаем на прикосновение функцию handleTouchStart
document.addEventListener('touchstart', handleTouchStart, false);  
// // А на движение пальцем по экрану - handleTouchMove      
document.addEventListener('touchmove', handleTouchMove, false);

document.addEventListener('touchend', stopRepeat, false)

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                  
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY ;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        
        if ( xDiff > 0 ) {
           repeatMove(left, 100);
        } else {
            repeatMove(right, 100);/* right swipe */
        }                       
    } else { // Это вам, в общем-то, не надо, вы ведь только влево-вправо собираетесь двигать
        if ( yDiff > 0 ) {
            /* up swipe */ 
            turn();
        } else { 
            speeddown();
             /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

function left () {
    let p = moves[KEY.LEFT](board.piece)
        if (board.valid(p)){
            board.piece.move(p)
        } 
}

let interval = null; 

function repeatMove (whatRepeat, time) {
    whatRepeat();
    return interval = setInterval(whatRepeat, time)
}

function stopRepeat() {
    clearInterval(interval)
}

function right() {
    let p = moves[KEY.RIGHT](board.piece)
        if (board.valid(p)){
            board.piece.move(p)
        }
}

function down () {
    let p = moves[KEY.DOWN](board.piece)
        if (board.valid(p)){
            account.score += POINTS.SOFT_DROP;
            board.piece.move(p);
            p = moves[KEY.DOWN](board.piece);
        }
}

function speeddown() {
    let p = moves[KEY.SPACE](board.piece)
        while (board.valid(p)){
            account.score += POINTS.HARD_DROP;
            board.piece.move(p);
            p = moves[KEY.DOWN](board.piece);
        }
}

function turn () {
    let p = moves[KEY.UP](board.piece)
        if (board.valid(p)){
            board.piece.move(p)
        }
}

let menuBtn = document.querySelector('.menuBurger');
let menu = document.querySelector('.menu');

menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('openMenu');
    menu.classList.toggle('openMenu');
  })

let control = document.querySelector('.controlPanel');
let controlBtn = document.querySelector('.showControlPanel');

controlBtn.addEventListener('click', function(){
    control.classList.toggle('show');
    controlBtn.classList.toggle('show');
})


let boardAddClass = document.querySelector('body')
let stopScaleButton = document.querySelector('.stopScaleButton')
let wrapper = document.querySelector('.wrapper')

function stopScaling() {
    // document.addEventListener('touchmove', function (event) {
    //     if (event.scale !== 1) { event.preventDefault(); }
    //   }, false);

    boardAddClass.classList.toggle('boardScaleStop');
    stopScaleButton.classList.toggle('boardScaleStop');
    wrapper.classList.toggle('boardScaleStop')
}

let showTutorialBtn = document.querySelector('.showTutorialPanel');
let showControlKyes = document.querySelector('.tutorial');

showTutorialBtn.addEventListener('click', function(){
    showControlKyes.classList.toggle('showTutorial');
    showTutorialBtn.classList.toggle('showTutorial');
})

showControlKyes.addEventListener('click', function(){
    showControlKyes.classList.toggle('showTutorial');
})



document.getElementById('leftControl').addEventListener('pointerdown', event => {
    return event = repeatMove(left, 100);
}, false)

document.getElementById('rightControl').addEventListener('pointerdown', event => {
    return event = repeatMove(right, 100);
}, false)

document.getElementById('dowmControl').addEventListener('pointerdown', event => {
    return event = repeatMove(down, 100);
}, false)

document.addEventListener('pointermove', stopRepeat, false)
document.addEventListener('pointerup', stopRepeat, false)
    














