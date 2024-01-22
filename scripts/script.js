// По кнопке на главном экране опускаемся в меню

document.getElementById("main-action-button").onclick = function () {
    document.getElementById('products').scrollIntoView({behavior:"smooth"});
};

// Функционал плавной навигации из меню навигации

let links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++){
    links[i].onclick = function(){
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({ behavior: "smooth" });
    };
}

// функционал "Из меню к оформлению заказа"

let buttons = document.getElementsByClassName("product-button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    document
      .getElementById("order")
      .scrollIntoView({ behavior: "smooth" });
  };
}

// функционал валидации, заполнения и отправки формы

let burger = document.getElementById("burger");
let name = document.getElementById("name");
let phone = document.getElementById("phone");

document.getElementById("order-action").onclick = function () {
    let hasError = false;

    [burger, name, phone].forEach(item => {
        if (!item.value){
            item.parentElement.style.background = 'red';
            hasError = true;
        }else{
            item.parentElement.style.background = "";
        }
    });

    if (!hasError){
        [burger, name, phone].forEach(item => {
            item.value = '';
        });
        alert('Спасибо за заказ! Мы скоро свяжемся с Вами!');
    }
};

// функционал выбора валюты

let prices = document.getElementsByClassName("products-item-price");  // находим все элементы с классом products-item-price

document.getElementById("change-currency").onclick = function (e) {
    let currentCurrency = e.target.innerText;       // получение текущей валюты в строке

    let newCurrency = '$'; // Новая валюта, на которую мы изменяем. По умолчанию - доллары
    let coefficient = 1;  // коэффициент конвертации валют

    if (currentCurrency === "$") {
      newCurrency = "₽";
      coefficient = 88;
    } else if (currentCurrency === "₽") {
      newCurrency = "BYN";
      coefficient = 3;
    } else if (currentCurrency === "BYN") {
      newCurrency = "€";
      coefficient = 0.92;
    } else if (currentCurrency === "€") {
      newCurrency = "¥";
      coefficient = 7.2;
    }

    e.target.innerText = newCurrency;

    // Цикл конвертации всех цен с валютами
    for (let i=0; i < prices.length; i++){
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + ' ' + newCurrency;
    }
}