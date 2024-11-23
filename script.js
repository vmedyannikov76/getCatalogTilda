//кирилический запрос
URL = "https://search.tildacdn.com/search/?p=7103656&q=" + encodeURIComponent('платье') + "&page=1&num=15&hs=50&st=s"   //num=15- количество записей
fetch(URL)
      .then((response) => {
        // console.log("это json");
        return response.json();
      })
      .then((data) => {
        // console.log("это дата");
        // console.log(data.options[numberOptions].values);
        console.log(data);

      }
    );








//работа с вариантами цветов
  function startCode(){

    console.log('запуск');
        const dataCards = {};
    fetch("https://store.tildaapi.com/api/getproductslist/?storepartuid=205926896131&recid=783207578&c=1723565566812&getparts=true&getoptions=true&slice=1&size=300"

    )
      .then((response) => {
        // console.log("это json");
        return response.json();
      })
      .then((data) => {
        let numberOptions = 1//обычно 1 или 0 ****************!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // console.log("это дата");
        // console.log(data.options[numberOptions].values);
        // console.log(data);
        const colors = {}
        for (let {color,value} of data.options[numberOptions].values) {
            colors[value] = color
        }
        // console.log(colors);
        // const dataCards = {};
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
      }
    );
    
    function createColorBlockCardsNEW() {//для открытой карточки
        if(Object.keys(dataCards).length == 0) return//если объект базы пустой то ничего не делаем
        if (!document.querySelector(".t-store__prod-popup__info")) return; //если открыта не карточка то ничего не делаем
        if (!document.querySelector('.t-store__prod-popup__info [data-edition-option-id="Цвет"] div.t-product__option-title')) return
    
        // if (document.querySelector(".t-store__prod-popup__info .block-color")) return; //если значки есть, то не нужно
        if (!!document.querySelector(".t-store__prod-popup__info .block-color")) return; //если значки есть, то не нужно
    
        let textColor = document.querySelector('.t-store__prod-popup__info [data-edition-option-id="Цвет"] .t-product__option-title');
        const div = document.createElement("div");
        const name = document.querySelector(".t-store__prod-popup__info .js-product-name").textContent; //название товара
        div.classList.add("block-color");
        const color = document.querySelector('[name="Цвет"]')?.value//название цвета в карточке
        document.querySelector('.t-store__prod-popup__info [data-edition-option-id="Цвет"] div.t-product__option-title').append(div); //вставим элемент в блок с описанием страницы
        // if(!localStorage.dataNew) return//если записи в памяти пока нет то ничего не делаем
        const countColor = dataCards[name]; //количество цветов
        for (let i = 0; countColor.length > i; i++) {
            const divI = document.createElement("a");
            divI.href = countColor[i].link;
            // divI.title = countColor[i].colorName;
            divI.classList.add("element-color");
            //запишем цвет и применим к нему стили
            if(color === countColor[i].colorName) {
                divI.dataset.activColor = true;
            //добавим название цвета
            //textColor.dataset.nameColor = ': '+ countColor[i].colorName
            textColor.dataset.nameColor = countColor[i].colorName
            }
            divI.style.backgroundColor = countColor[i].color;
            div.append(divI);
    
        }
    }
    // createColorBlockCardsNEW()
    
    function createColorBlockNEW() {//цвета для каталога товаров
        if(Object.keys(dataCards).length == 0) return //если объект базы пустой то ничего не делаем
        // if(!localStorage.dataNew||(localStorage.dataNew && localStorage.dataNew.length<5))return
        const cards = document.querySelectorAll(".js-product.t-store__card:not(#rec736593178 .js-product.t-store__card)"); //все карточки на странице
        cards.forEach((element) => {
            if (element.querySelector(".block-color .element-color")) return; //если значки есть, то не нужно
            const div = document.createElement("div");
            const name = element.querySelector(".js-store-prod-name").textContent; //название товара
            const color = element.querySelector('[name="Цвет"]')?.value//название цвета в карточке
            div.classList.add("block-color");
            //орпределим куда вставляем цвета:
           // element.querySelector(".js-store-price-wrapper").append(div); //вставим элемент в блок с ценой
            element.querySelector(".t-store__card__textwrapper").prepend(div); //вставим элемент в блок перед названием
            // if(!localStorage.dataNew) return//если записи в памяти пока нет то ничего не делаем
            // if(name === "Подарочный сертификат") return
            let countColor = dataCards[name]; //количество цветов
            for (let i = 0; countColor.length > i; i++) {
                const divI = document.createElement("div");
                divI.classList.add("element-color");
                // divI.title = countColor[i].colorName;
                //запишем цвет и применим к нему стили
                if(color === countColor[i].colorName) divI.dataset.activColor = true;
                // console.log(countColor[i]);
                
                divI.style.backgroundColor = countColor[i].color;
                div.append(divI);
            }
        });
    }
    // createColorBlockNEW()
    
    setInterval(() => {
        // console.log('работаем');
        // renameColorBasket();
        createColorBlockNEW();
        createColorBlockCardsNEW();
        // reNameOptionsBasket();
    }, 700);
    
    }
    function ftWrapperftTabRePosition() {
  function ftTabRePosition() {
    const targetElement = document.querySelector(".t-store__prod-popup__info");
    const tabs = document.querySelector(".js-store-tabs");
        tabs.classList.add('ft-tab');
    targetElement.append(tabs);
  }
  let st_ftTabRePosition = setInterval(() => {
    if (
      document.querySelector(".t-store__prod-popup__info") &&
      document.querySelector(".js-store-tabs")
    ) {
      ftTabRePosition();
      clearInterval(st_ftTabRePosition);
    } else {
      clearInterval(st_ftTabRePosition);
    }
  },500);
}
    


    document.addEventListener('DOMContentLoaded',()=>{
        startCode();
        ftWrapperftTabRePosition()
    } );
