# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build

```



## Данные и типы данных, используемые в приложении

Карточка продукта
```
export interface IProduct {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
}
```

Пользователь

```
export interface IUser {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: IProduct[];
}
```

Интерфейс для модели данных карточек

```
export interface IProductData {
    cards: IProduct[];
    preview: string | null;
}
```

Интерфейс модели корзины

```
export interface IBasketModel {
    items: IProduct[];
    add(id: string): void;
    remove(id:string): void;
}
```

Данные карточки, используемые в корзине

```
export type TProductInfoInBasket = Pick<IProduct, 'title' | 'price' >;
```

Данные пользователя при оформлении доставки и выболра оплаты

```
export type TUserPayment = Pick<IUser, 'payment' | 'address'>;
```

Контактные данные пользователя 

```
export type TUserContacts = Pick<IUser, 'email' | 'phone'>;
```



## Архитектера приложения

Проект построен на основе паттерна MVP (Model-View-Presenter):

Model — управляет данными (например, BasketModel и CatalogModel).
View — отображает данные и обрабатывает действия пользователя (BasketView и BasketItemView).
Presenter — связывает Model и View, обрабатывает события и бизнес-логику.

### Базовый код

#### Класс API
Содержит в себе базовую логику отправки HTTP-запросов. 
В конструктор передаётся базовый URL сервера и опциональные настройки запроса.

Методы:
- `get` – выполняет GET-запрос на переданный эндпоинт и возвращает промис с объектом, которым ответил сервер.
- `post` – принимает объект с данными, сериализует его в JSON и отправляет на переданный эндпоинт. 
По умолчанию выполняется POST-запрос, но метод может быть переопределён параметром.

#### Класс EventEmitter
Реализует систему подписки и обработки событий. 
Позволяет устанавливать обработчики, снимать их, инициировать события и управлять подписчиками.

Методы:
- `on` – добавляет обработчик на указанное событие.
- `off` – удаляет обработчик с указанного события.
- `emit` – инициирует событие и передаёт данные подписчикам.
- `onAll` – подписывает обработчик на все события.
- `offAll` – удаляет все обработчики событий.
- `trigger` – создаёт функцию-триггер, вызывающую событие при её вызове.

### Слой данных

#### Класс CardsData
Управляет карточками товаров на странице. Предоставляет возможность получать список карточек товаров, а также открывать конкретную карточку в модальном окне.\
В полях класса хранятся следующие данные:
- _cards: IProduct[] – массив карточек товаров, доступных на странице.
- _preview: string | null – id карточки товара, которая в данный момент открыта в модальном окне (если null, то модальное окно закрыто).
- events: IEvents - экземпляр класса `EventEmitter` для инициализации событий при изменении данных.

Методы
- getCard(cardId: string): IProduct – получает карточку товара по её id.

#### Класс BasketData
Управляет корзиной покупок, позволяя добавлять, удалять и очищать товары.

В полях класса хранятся следующие данные:
- items: IProduct[] – массив товаров в корзине.

Методы
- addItem(cardId: string): void – добавляет товар в корзину по идентификатору.
- removeItem(cardId: string): void – удаляет товар из корзины по идентификатору.
- clearBasket(): void – очищает корзину.

#### Класс UsertData
Управляет информацией о пользователе и проверяет её валидность.

Методы
- setUserInfo(userData: IUser): void – устанавливает информацию о пользователе.
- checkUserValidation(data: Record<keyof TUserPayment, TUserContacts>): boolean – проверяет валидность данных пользователя.


### Классы представления
Все классы представления отвечают за отображение внутри контейнера(DOM-элемент) передаваемых в них данных.

#### Класс ModalWindow
Представляет собой универсальный класс для управления модальными окнами с возможностью изменения контента с помощью темплейтов.

Свойства:
- isOpen: boolean – состояние модального окна (открыто/закрыто).
- content: HTMLElement | null – содержимое модального окна.

Методы:
- open(content: HTMLElement): void – открывает модальное окно с заданным контентом.
- close(): void – закрывает модальное окно.
- handleClose(event: Event): void – обработчик событий для закрытия окна при клике на оверлей, нажатии клавиши Escape или кнопки закрытия.

#### Класс Card
Управляет отображением карточек товаров на основе переданных шаблонов. \
Один класс поддерживает три различных вида карточек: card-catalog, card-preview и card-basket, изменяя их представление динамически.

Свойства:
- container: HTMLElement – контейнер, в который рендерятся карточки.

Методы:
- renderCard(product: IProduct, type: "catalog" | "preview" | "basket"): HTMLElement – создаёт и возвращает элемент карточки в зависимости от её типа.
- attachToContainer(card: HTMLElement): void – добавляет карточку в контейнер.


### Слой коммуникации
#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, отвечающий за взаимодействие представления и данных, находится в файле index.ts, выполняющем роль Presenter.

Взаимодействие осуществляется через события, которые генерируются различными частями системы:
События изменения данных (генерируются классами моделей данных)
- `cards:changed` – обновление массива карточек.
- `basket:updated` – изменение состава корзины.

События взаимодействия пользователя с интерфейсом (генерируются представлением)
- `card:selected` – выбор карточки для открытия в модальном окне.
- `cart:add` – добавление товара в корзину.
- `cart:remove` – удаление товара из корзины.
- `form:submit` – отправка формы с данными пользователя.
- `order:payment-method` – выбор способа оплаты в форме заказа.
- `order:address` – ввод адреса доставки.
- `order:email` – ввод email пользователя.
- `order:phone` – ввод номера телефона пользователя.
- `order:submit` – подтверждение оформления заказа.
- `order-success:close` – закрытие модального окна успешного заказа.