// Полифилл для метода forEach для NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

document.querySelectorAll('.file__input').forEach(function (input) {
    let label = input.nextElementSibling,
        labelVal = label.querySelector('.file__text');


    input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1) {
            countFiles = this.files.length;
            console.log(this.files[0].name);
        }

        if (countFiles == 1) {
            if (this.files[0].name.length > 30) {
                labelVal.innerText = this.files[0].name.substr(0, 30) + '...'; // если название файла слишком длинное
            } else {
                labelVal.innerText = this.files[0].name;
            }
        }
        else if (countFiles > 1) {
            labelVal.innerText = 'Выбрано файлов: ' + countFiles; // для нескольких файлов
        }
        else {
            labelVal.innerText = 'Прикрепить файл';
        }

    });
});

document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

    // Клик по кнопке. Открыть/Закрыть select
    dropDownBtn.addEventListener('click', function (e) {
        dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.toggle('dropdown__button--active');
    });

    // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
    dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtn.innerHTML = this.innerHTML;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove('dropdown__list--visible');
            dropDownBtn.classList.remove('dropdown__button--active');
        });
    });

    // Клик снаружи дропдауна. Закрыть дропдаун
    document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn) {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });

    // Нажатие на Tab или Escape. Закрыть дропдаун
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });
});

var rangeInput = document.querySelector(".range__input");
var rangeValue = document.querySelector(".range__value"); 


// обновление значения при изменение инпута
rangeInput.oninput = function () {
    rangeValue.innerHTML = this.value + '%';
};

// кнопка бургер меню
document.querySelector('.menu__mobile-button').addEventListener('click', function (e) {
    this.classList.toggle('menu__mobile-button--active');
    document.querySelector('.menu__list').classList.toggle('menu__list--active');
    document.querySelector('body').classList.toggle('lock');
});