function _createModalWindowForGameOver() {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('vmodal', 'hidden');
    modalWindow.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title" id="title"> Score: ${counterScore}</span>
                <span class="modal-close"  data-close="true">&times;</span>
            </div>
            <div class="modal-body">
                GAME IS OVER
            </div>
        </div>
    </div>
    `)
    document.body.appendChild(modalWindow);
    return modalWindow;
}


function _createModalWindowForRecordingResult() {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('vmodal', 'hidden');
    modalWindow.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title" id="title"> Score: ${counterScore}</span>
                <span class="modal-close"  data-close="true">&times;</span>
            </div>
            <div class="modal-body">
                Do you want to record your result?
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="buttonForRecord">OF COURSE</button>
                <button class="btn btn-danger" data-close="true">No</button>
            </div>
        </div>
    </div>
    `)
    document.body.appendChild(modalWindow);
    return modalWindow;
}

function _createModalWindowForRecordName () {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('vmodal', 'hidden');
    modalWindow.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">Enter your name</span>
                <span class="modal-close"  data-close="true">&times;</span>
            </div>
            <div class="modal-body">
                <input type="text" id="userName">
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="buttonForRecordName">Ok</button>
                <button class="btn btn-danger" data-close="true">Cancel</button>
            </div>
        </div>
    </div>
    `)
    document.body.appendChild(modalWindow);
    return modalWindow;
}


function _createModalWindowForConfirm() {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('vmodal', 'hidden');
    modalWindow.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
        <div class="modal-window">
            <div class="modal-confirm-header">
                <img src="components/GameOver/ModalWindow/img/confirm.png">
            </div>
            <div class="modal-body">
                Your result was recorded successfully!
            </div>
        </div>
    </div>
    `)
    document.body.appendChild(modalWindow);
    return modalWindow;
}

function _createModalWindowForTableRecords() {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('vmodal', 'hidden');
    modalWindow.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title" id="title">Table of records</span>
                <span class="modal-close"  data-close="true">&times;</span>
            </div>
            <div class="modal-body" id="text-records">
            </div>
        </div>
    </div>
    `)
    document.body.appendChild(modalWindow);
    return modalWindow;
}
$.modal = function(someCreateFunction) {
    let $modal = someCreateFunction();
    let ANIMATION_SPEED = 200;
    let closing = false;
    let destroyed = false;

    return {
        open() {
            if(destroyed) {
                return console.log('modal window is destroyed');
            }
            if(!closing) {
            $modal.classList.remove('hidden');
            $modal.classList.add('open');
            }
        },
        close() {   
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('disappearance');
            setTimeout(() => {
                $modal.classList.remove('disappearance');
                $modal.classList.add('hidden') ;
                closing = false;
            },ANIMATION_SPEED);
        },
        destroy() {
            if($modal.parentElement) $modal.parentElement.removeChild($modal);
            // document.removeEventListener('click', listenerForClose);
            destroyed = true;
        },
    }
}