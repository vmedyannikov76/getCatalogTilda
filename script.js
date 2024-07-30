fetch(
  "https://store.tildaapi.com/api/getproductslist/?storepartuid=544779902021&recid=696926969&c=1722315676976&getparts=true&getoptions=true&slice=1&size=200"
)
  .then((response) => {
    console.log("это json");
    return response.json();
  })
  .then((data) => {
    console.log("это дата");
    console.log(data.options[0].values);
    const colors = {}
    for (let {color,value} of data.options[0].values) {
        colors[value] = color
    }
    console.log(colors);
    const dataCards = {};
    for (let prod of data.products) {
        let item = {};
        item["link"] = prod.url; //ссылка на карточку
        item["color"] = colors[prod.editions[0]['Цвет']]; //ссылка на карточку
        item["colorName"] = prod.editions[0]['Цвет']; //ссылка на карточку
        if (dataCards[prod.title]) {
            dataCards[prod.title].push(item);
        } else {
            dataCards[prod.title] = [item];
        }
    }
    function createColorBlockNEW() {//цвета для каталога товаров
        // if(!localStorage.dataNew||(localStorage.dataNew && localStorage.dataNew.length<5))return
        const cards = document.querySelectorAll(".js-product.t-store__card:not(#rec736593178 .js-product.t-store__card)"); //все карточки на странице
        cards.forEach((element) => {
            if (element.querySelector(".block-color .element-color")) return; //если значки есть, то не нужно
            const div = document.createElement("div");
            const name = element.querySelector(".js-store-prod-name").textContent; //название товара
            const color = element.querySelector('[name="Цвет"]')?.value//название цвета в карточке
            div.classList.add("block-color");
            element.querySelector(".js-store-price-wrapper").append(div); //вставим элемент в блок с ценой
            // if(!localStorage.dataNew) return//если записи в памяти пока нет то ничего не делаем
            // if(name === "Подарочный сертификат") return
            let countColor = dataCards[name]; //количество цветов
            for (let i = 0; countColor.length > i; i++) {
                const divI = document.createElement("div");
                divI.classList.add("element-color");
                //запишем цвет и применим к нему стили
                if(color === countColor[i].colorName) divI.dataset.activColor = true;
                divI.style.backgroundColor = countColor[i].color;
                div.append(divI);
            }
        });
    }
    createColorBlockNEW()
    console.log(dataCards);

  });

//******************************************************* */
function createColorBlockNEW() {
    // if(!localStorage.dataNew||(localStorage.dataNew && localStorage.dataNew.length<5))return
    const cards = document.querySelectorAll(".js-product.t-store__card:not(#rec736593178 .js-product.t-store__card)"); //все карточки на странице
    cards.forEach((element) => {
        if (element.querySelector(".block-color .element-color")) return; //если значки есть, то не нужно
        const div = document.createElement("div");
        const name = element.querySelector(".js-store-prod-name").textContent; //название товара
        const color = element.querySelector('[name="Цвет"]')?.value//название цвета в карточке
        div.classList.add("block-color");
        element.querySelector(".js-store-price-wrapper").append(div); //вставим элемент в блок с ценой
        // if(!localStorage.dataNew) return//если записи в памяти пока нет то ничего не делаем
        // if(name === "Подарочный сертификат") return
        let countColor = JSON.parse(localStorage.dataNew)[name]; //количество цветов
        for (let i = 0; countColor.length > i; i++) {
            const divI = document.createElement("div");
            divI.classList.add("element-color");
            //запишем цвет и применим к нему стили
            if(color === countColor[i].colorName) divI.dataset.activColor = true;
            divI.style.backgroundColor = countColor[i].color;
            div.append(divI);
        }
    });
}
createColorBlockNEW()

function createColorBlockCardsNEW() {
    if (!document.querySelector(".t-store__prod-popup__info")) return; //если открыта не карточка то ничего не делаем
    if (!document.querySelector('.t-store__prod-popup__info [data-edition-option-id="Цвет"] div.t-product__option-title')) return

    if (document.querySelector(".t-store__prod-popup__info .block-color")) return; //если значки есть, то не нужно
    const div = document.createElement("div");
    const name = document.querySelector(".t-store__prod-popup__info .js-product-name").textContent; //название товара
    div.classList.add("block-color");
    const color = document.querySelector('[name="Цвет"]')?.value//название цвета в карточке
    document.querySelector('.t-store__prod-popup__info [data-edition-option-id="Цвет"] div.t-product__option-title').append(div); //вставим элемент в блок с описанием страницы
    // if(!localStorage.dataNew) return//если записи в памяти пока нет то ничего не делаем
    const countColor = JSON.parse(localStorage.dataNew)[name]; //количество цветов
    for (let i = 0; countColor.length > i; i++) {
        const divI = document.createElement("a");
        divI.href = countColor[i].link;
        divI.textContent = countColor[i].colorName;
        divI.classList.add("element-color");
        //запишем цвет и применим к нему стили
        if(color === countColor[i].colorName) divI.dataset.activColor = true;
        divI.style.backgroundColor = countColor[i].color;
        div.append(divI);
    }
}
function renameColorBasket() {
    //изменим наименование опции
    const lictOption = document.querySelectorAll(
        `.t706__product-title div:first-child,
    .t1002__product-title__option div:first-child`
    ); // все опции по цвету
    lictOption.forEach((element) => {
        if (element.textContent.toLowerCase().includes("цвет") && element.textContent.split(":")[0].length > 6) {
            element.textContent = "Цвет: " + element.textContent.split(":")[1];
            element.style.opacity = '1';
        }
    });
}
/*уберем косяк из названия опций в корзине*/
function reNameOptionsBasket() {
 if (!tcart.products.length > 0) return;
  const products = tcart.products;
  products.forEach((product) => {
    if (product.options.length > 0) {
      product.options.forEach((nameProduct) => {
        if (
          nameProduct.option.includes("Цвет") &&
          nameProduct.option.length > 6
        ) {
          nameProduct.option = "Цвет";
        }
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
    //console.log("прошла загрузка");

    let openCatalog = setInterval(() => {
        openListProducts()
    },800)

    if (!document.querySelector('#rec736593178 .js-store-load-more-btn:not(.js-store-load-more-btn[style*="display: none;"])')){
        setTimeout(()=>{
            // console.log('отключим интервал')
            clearInterval(openCatalog)
        },10e3)
    }

    setInterval(() => {
        renameColorBasket();
        createColorBlockNEW();
        createColorBlockCardsNEW();
        reNameOptionsBasket();
    }, 700);