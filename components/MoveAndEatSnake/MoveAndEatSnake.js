function createSnake() {
    let randomizer = random(0,2651)
    TDS[randomizer].classList.add('snake')
    return randomizer
}
let index = createSnake()

function moveSnake(numberSnake) {
    let top = false;
    let right = false;
    let bottom = false;
    let left = false;
    let timerIdRight;
    let timerIdBottom;
    let timerIdLeft;
    let timerIdTop;
    let speed = 100;

    let arrWithTds = [];

    function checkFood() {
        if(TDS[numberSnake].lastElementChild) {
            TDS[numberSnake].lastElementChild.remove();
            addFood();
            plusScore();
        };
    };

    
    function moveRight() {
            timerIdRight =  setInterval( () => {


                if(TDS[numberSnake + 1]) {
                    if(TDS[numberSnake + 1].classList.contains('snake')) {
                        gameOver(timerIdRight)
                    }
                }


            if(numberSnake%78 == 77) {
                if(TDS[numberSnake] && !counterScore) TDS[numberSnake].classList.remove('snake');
                numberSnake -= 78;
            };


            if(counterScore) {

                if(counterScore == 1) {
                    if(TDS[numberSnake - 1]) TDS[numberSnake - 1].classList.remove('snake');
                };

                if(TDS[numberSnake + 1]) {
                    TDS[numberSnake + 1].classList.add('snake');
                    arrWithTds.push( TDS[numberSnake + 1] );
                };

                setTimeout( () => {
                    arrWithTds[0].classList.remove('snake');
                    arrWithTds.splice(0, 1);
                }, speed * (counterScore + 1) );

            } else {
                if(TDS[numberSnake + 1]) TDS[numberSnake + 1].classList.add('snake');
                if(TDS[numberSnake]) TDS[numberSnake].classList.remove('snake');
            };

            numberSnake++;
            checkFood();
        }, speed);
    }

    function moveLeft() {
            timerIdLeft = setInterval( () => {


                if(TDS[numberSnake - 1]) {
                    if(TDS[numberSnake - 1].classList.contains('snake')) {
                        gameOver(timerIdLeft)
                    }
                }


                if(numberSnake%78 == 0) {
                if(TDS[numberSnake] && !counterScore) TDS[numberSnake].classList.remove('snake');
                numberSnake += 78;
            };


            if(TDS[numberSnake]) TDS[numberSnake - 1].classList.add('snake');

            if(counterScore) {

                if(counterScore == 1) {
                    if(TDS[numberSnake + 1]) TDS[numberSnake + 1].classList.remove('snake');
                };

                if(TDS[numberSnake - 1]) {
                    TDS[numberSnake - 1].classList.add('snake');
                    arrWithTds.push( TDS[numberSnake - 1] );
                };

                setTimeout( () => {
                    arrWithTds[0].classList.remove('snake');
                    arrWithTds.splice(0, 1);
                }, speed * (counterScore + 1) );

            } else {
                if(TDS[numberSnake]) TDS[numberSnake - 1].classList.add('snake');
                if(TDS[numberSnake]) TDS[numberSnake].classList.remove('snake');
            }

            numberSnake--;
            checkFood();
           
        },speed);
    }

    function moveTop() {
            timerIdTop =  setInterval( () => {


                if(TDS[numberSnake - 78]) {
                    if(TDS[numberSnake - 78].classList.contains('snake')) {
                        gameOver(timerIdTop)
                    }
                }


            if(numberSnake < 78) {
                if(TDS[numberSnake] && !counterScore) TDS[numberSnake].classList.remove('snake');
                let num = 2652;
                numberSnake += num;
            }

            TDS[numberSnake - 78].classList.add('snake');

            if(counterScore) {

                if(counterScore == 1) {
                    if(TDS[numberSnake + 78]) TDS[numberSnake + 78].classList.remove('snake');
                };
                
                if(TDS[numberSnake - 78]) {
                    TDS[numberSnake - 78].classList.add('snake');
                    arrWithTds.push( TDS[numberSnake - 78] );
                };

                setTimeout( () => {
                    arrWithTds[0].classList.remove('snake');
                    arrWithTds.splice(0, 1);
                }, speed * (counterScore + 1) );

                if(TDS[numberSnake + 78*+counterScore]) TDS[numberSnake + 78*+counterScore].classList.remove('snake');
            } else {
                TDS[numberSnake - 78].classList.add('snake');
                if(TDS[numberSnake]) TDS[numberSnake].classList.remove('snake');
            }

            numberSnake = numberSnake - 78;
            checkFood();
            
        },speed);
    }

    function moveBottom() {

            timerIdBottom = setInterval( () => {


                if(TDS[numberSnake + 78]) {
                    if(TDS[numberSnake + 78].classList.contains('snake')) {
                        gameOver(timerIdBottom)
                    }
                }


            if(numberSnake >= 2574) {
                if(TDS[numberSnake] && !counterScore) TDS[numberSnake].classList.remove('snake');
                let num = 2652;
                numberSnake -= num;
            }

            TDS[numberSnake + 78].classList.add('snake');

            if(counterScore) {

                if(counterScore == 1) {
                    if(TDS[numberSnake - 78]) TDS[numberSnake - 78].classList.remove('snake');
                };
                
                if(TDS[numberSnake + 78]) {
                    TDS[numberSnake + 78].classList.add('snake');
                    arrWithTds.push( TDS[numberSnake + 78] );
                };

                setTimeout( () => {
                    arrWithTds[0].classList.remove('snake');
                    arrWithTds.splice(0, 1);
                }, speed * (counterScore + 1) );

            } else {
                TDS[numberSnake + 78].classList.add('snake');
                if(TDS[numberSnake]) TDS[numberSnake].classList.remove('snake');
            }

            numberSnake = numberSnake + 78;
            checkFood();
            
        },speed);
    }

    document.addEventListener('keydown', moveBottomSide = function(event) {
        if( event.code.toLowerCase() == 'arrowdown') {
            if(bottom) return
            if(counterScore > 0) {
                if(top) return // если уже идем в этом или обратном направлениях - выйти
            } else {
                if(top) {
                    clearInterval(timerIdTop);
                    top = false;
                }
            }
            if(left) {
                clearInterval(timerIdLeft);
                left = false;
            }
            if(right) {
                clearInterval(timerIdRight);
                right = false;
            }
            if(bottom) {
                clearInterval(timerIdBottom);
            }   
            bottom = true;
            moveBottom();
        }
    })

    document.addEventListener('keydown',moveLeftSide = function (event) {
        if( event.code.toLowerCase() == 'arrowleft') {
            if(left) return
            if(counterScore > 0) {
                if(right) return // если уже идем в этом или обратном направлениях - выйти
            } else {
                if(right) {
                clearInterval(timerIdRight);
                right = false;
            }
            }

            if(bottom) {
                clearInterval(timerIdBottom);
                bottom = false;
            }
            if(top) {
                clearInterval(timerIdTop);
                top = false;
            }
            if(left) {
                clearInterval(timerIdLeft);
            }
            left = true;
            moveLeft();
            
        }
    })

    document.addEventListener('keydown', moveTopSide = function (event) {
        if( event.code.toLowerCase() == 'arrowup') {
            if(top) return
            if(counterScore > 0) {
                if(bottom) return // если уже идем в этом или обратном направлениях - выйти
            } else {
                if(bottom) {
                    clearInterval(timerIdBottom);
                    bottom = false;
                }
            }
            
            if(left) {
                clearInterval(timerIdLeft);
                left = false;
            }
            if(right) {
                clearInterval(timerIdRight);
                right = false;
            }
            if(top) {
                clearInterval(timerIdTop);
            }
            top = true;
            moveTop();
            
        }
    })

    document.addEventListener('keydown', moveRightSide =  function (event) {
        if( event.code.toLowerCase() == 'arrowright') {
            if(right) return
            if(counterScore > 0) {
                if(left) return  // если уже идем в этом или обратном направлениях - выйти
            } else {
                if(left) {
                    clearInterval(timerIdLeft);
                    left = false;
                }
            }
            

            if(top) {
                clearInterval(timerIdTop);
                top = false;
            }
            if(bottom) {
                clearInterval(timerIdBottom);
                bottom = false;
            }
            if(right) {
                clearInterval(timerIdRight);
            }
            right = true;
            moveRight();
            
        }
    })
}
moveSnake(index);
