
export interface IProduct {
    id: string;
    title: string;
}

export interface IBasketItem {
    productId: string;
    quantity: number;
}

export interface IView {
    render(data?: object): HTMLElement;
}

export interface IViewConstructor {
    new (container: HTMLElement, events?: IEventEmitter): IView;
}

export interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

export interface IEventEmitter {
    emit(event: string, data: unknown): void;
}