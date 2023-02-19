function gameOver(timer) { // выполняется при каждом проигрыше
    clearInterval(timer); // очищаем timeout который в данный момент активен, остальные уже отключены

    for(let i = 0; i < TDS.length; i++) { // удаляем всю змейку 
        if(TDS[i].classList.contains('snake')) {
            TDS[i].classList.remove('snake');
        };
    };


    modalWindowForRecordingResult = $.modal(_createModalWindowForRecordingResult); // создание всех модальных окон
    modalWindowForRecordName = $.modal(_createModalWindowForRecordName);

    modalWindowForRecordingResult.open(); // открытие первого модального окна
    score.lastElementChild.textContent = 0; // обнуление счетчика результата

    removeEventListenerForAllButtons(); // снятие всех обработчиков с кнопок
    

    let listenerFirstModalWindow = document.getElementById('buttonForRecord'); 
    listenerFirstModalWindow.addEventListener('click', function() {  // добавление обработчика на кнопку OF COURSE первого модального окна
        continueComplitingScript(); // продолжение выполнения скрипта
    });

    let listenerSecondModalWindow = document.getElementById('buttonForRecordName');
    listenerSecondModalWindow.addEventListener('click', function() { // добавление обработчика на кнопку OK второго модального окна
        
        let userName = document.querySelector('#userName');
        let locSt = window.localStorage; // (БЕК) Находим инпут, где УЖЕ введено имя
        locSt.setItem(userName.value, counterScore); // (БЕК) добавляем в localeStorage имя игрока и имя.
        let arrRecord = [];

        for(let i = 0; i < locSt.length; i++) { // пушим в массив значения из localeStorage;
            let currentKey = locSt.key(i);
            arrRecord.push( {'value':+locSt[currentKey],
                              'text': `${currentKey}: ${locSt[currentKey]}`} );
        };

        arrRecord.sort( (a, b) => a.value < b.value ? 1 : -1 );

        counterScore = 0; // (БЕК)
        continueComplitingScript();
        for(let i = 0; i < 10; i++) {
            document.querySelector('#text-records').innerHTML += arrRecord[i].text + '<br>';
        };
    });
};

function addEventListenerForAllButtons() {
    document.addEventListener('keydown', moveBottomSide);
    document.addEventListener('keydown', moveTopSide);
    document.addEventListener('keydown', moveLeftSide);
    document.addEventListener('keydown', moveRightSide);
};

function removeEventListenerForAllButtons() {
    document.removeEventListener('keydown', moveBottomSide);
    document.removeEventListener('keydown', moveTopSide);
    document.removeEventListener('keydown', moveLeftSide);
    document.removeEventListener('keydown', moveRightSide);

};

function closeModalWindow() {
    if(modalWindowForRecordingResult) {
        modalWindowForRecordingResult.close();
        setTimeout( () => {
            modalWindowForRecordingResult.destroy();
        },200);
        addEventListenerForAllButtons();
    }; 

    if(modalWindowForRecordName) {
        modalWindowForRecordName.close();
        setTimeout( () => {
            modalWindowForRecordName.destroy();
        },200);
        addEventListenerForAllButtons();
    };

    if(modalWindowForTableRecord) {
        modalWindowForTableRecord.close();
        setTimeout( () => {
            modalWindowForTableRecord.destroy();
        },200);
        addEventListenerForAllButtons();
    };
};

function continueComplitingScript() {
    
    if(!flag) {
        modalWindowForRecordingResult.close(); // закрытие первого модального окна с совершающейся анимацией
       
        setTimeout( () => {
            modalWindowForRecordName.open(); // после этой задержки открывается второе модальное окно
            let userName = document.querySelector('#userName')
            console.log(userName.value)
        },200);

        setTimeout(() => {
            modalWindowForRecordingResult.destroy(); // первое модальное окно уничтожается дабы не засорять DOM
            flag = true;
        }, 200);   
    };

    if(flag) {
        if(!(modalWindowForConfirm && modalWindowForTableRecord)) { // если окна не существуют тогда создаем иначе ничего не происходит
            modalWindowForConfirm = $.modal(_createModalWindowForConfirm); // создаем подтверждающее модальное окно
            modalWindowForTableRecord = $.modal(_createModalWindowForTableRecords);

            modalWindowForRecordName.close(); // закрытие второго модального окна с совершающейся анимацией
        

            setTimeout( () => {
                recordResult(); // после этой задержки открывается модальное окно уведомляющее об совершенной записи в localStorage
            },200);

            setTimeout(() => {
                modalWindowForRecordName.destroy(); // второе модальное окно уничтожается дабы не засорять DOM
            }, 200);
            
            setTimeout( () => {
                modalWindowForTableRecord.open();
                flag = false
            },2000);
        }
        
    };    
};

document.addEventListener('click',listenerForClose =  function(event) { // общий обработчик на весь документ для закрытия модальных окон
    let target = event.target.dataset.close;
    if(!target) return;
    if(target) {
        closeModalWindow();
    };
});

document.addEventListener('keydown', function(event) { // общий обработчик на escape и enter
    if(event.code == 'Escape') {
        closeModalWindow();
    };
    
    if(event.code == 'Enter') {
        continueComplitingScript();
    };
});