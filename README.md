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
## Архитектура
Проект построен на основе паттерна MVP (Model-View-Presenter):

Model — управляет данными (например, BasketModel и CatalogModel).
View — отображает данные и обрабатывает действия пользователя (BasketView и BasketItemView).
Presenter — связывает Model и View, обрабатывает события и бизнес-логику.


Api — универсальный API-клиент с поддержкой методов GET и POST.

EventEmitter — брокер событий для связи между компонентами.

BasketModel — управляет состоянием корзины.
CatalogModel — хранит данные каталога и предоставляет доступ к товарам.

BasketView — отвечает за отображение содержимого корзины.
BasketItemView — отображает отдельный элемент корзины.

Как работают компоненты вместе

API-клиент
Отправляет запросы к серверу (Api.get и Api.post).
Данные каталога запрашиваются при запуске и передаются в CatalogModel.

События
EventEmitter связывает View и Model. Например:
Событие basket:change обновляет корзину на экране.
Событие ui:basket-add добавляет товар в корзину.

Корзина
Пользователь добавляет товар в корзину, вызывая событие ui:basket-add.
BasketModel обновляет данные корзины и генерирует событие basket:change.
BasketView получает данные корзины и обновляет интерфейс.