function recordResult() {

    modalWindowForConfirm.open()  // открытие подтверждающего окна

    setTimeout(() => {
        modalWindowForConfirm.close() // его закрытие через 1.5 с
    },1500)
    setTimeout(() => { // затем его удаление дабы не засорять DOM
        modalWindowForConfirm.destroy()
    }, 1700);
}

