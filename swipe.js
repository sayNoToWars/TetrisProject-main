// Вешаем на прикосновение функцию handleTouchStart
document.addEventListener('touchstart', handleTouchStart, false);  
// А на движение пальцем по экрану - handleTouchMove      
document.addEventListener('touchmove', handleTouchMove, false);

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
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    
    let p = board.piece
    // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            if (board.valid(p)){
                board.piece.moveLeft()
            } 
        } else {
            if (board.valid(p)){
                board.piece.moveRight()
            }/* right swipe */
        }                       
    } else { // Это вам, в общем-то, не надо, вы ведь только влево-вправо собираетесь двигать
        if ( yDiff > 0 ) {
            board.rotate(p) /* up swipe */ 
        } else { 
            board.piece.moveDown() /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};





