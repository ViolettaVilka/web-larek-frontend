export type EventName = string | RegExp;
export type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


export interface IProduct {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
}

export interface IUser {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: IProduct[];
}

export interface IProductData {
    cards: IProduct[];
    preview: string | null;
    getCard(cardId: string): IProduct;
}

export interface IBasketModel {
    items: IProduct[];
    addItem(cardId: string): void;
    removeItem(cardId:string): void;
    clearBasket():void;
}

export interface IUserData {
    setUserInfo(userData: IUser): void;
    checkUserValidation(data: Record<keyof TUserPayment, TUserContacts>): boolean;
}


export type TProductInfoInBasket = Pick<IProduct, 'title' | 'price'>;

export type TUserPayment = Pick<IUser, 'payment' | 'address'>;
export type TUserContacts = Pick<IUser, 'email' | 'phone'>;