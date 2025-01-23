import { ShopAPI } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/base/model';
import { BasketView, CartItemView } from './components/base/view';



const api = new ShopAPI();
const events = new EventEmitter();
const basketModel = new BasketModel(events);
const basketView = new BasketView(document.querySelector('.basket')!);

function renderBasket(items: string[]) {
    const elements = items.map((id) => {
        const container = document.createElement('div');
        const itemView = new CartItemView(container, events);
        return itemView.render({ id, title: `Product ${id}` });
    });
    basketView.render({ items: elements });
}

events.on('basket:change', ({ items }: { items: string[] }) => renderBasket(items));

api.getCatalog()
    .then((catalog) => console.log('Каталог:', catalog))
    .catch((err) => console.error(err));
