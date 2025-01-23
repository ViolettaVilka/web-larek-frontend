export type EventName = string | RegExp;
export type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


