const GAME_FIELD = document.querySelector('#game_field');
const TDS = document.getElementsByTagName('td'); // глобальный перебор всех ячеек
let modalWindowForRecordingResult; // первое модальное окно спрашивающее о записи нового рекорда (если рекорд конечно был поставлен)
let modalWindowForRecordName; // запрашивает ваше имя
let modalWindowForConfirm; // окно уведомляющее об успешной записи результата
let modalWindowForTableRecord; // окно с прошлыми рекордами
let flag = false; // флаг проверяющий уничтожение первого модального окна
let score = document.getElementById('score'); 
let $ = {};
let moveBottomSide, moveTopSide, moveLeftSide, moveRightSide; // объявление переменных для возможности их снять
