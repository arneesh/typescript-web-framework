import { UserProps } from "./User";

export class Attributes<T> {
    constructor(private data: T){}
    // converted get to a bound function - i.e used arrow function to fix the "this" problem
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }

    set(update: T): void {

        console.log(" i am inisde attributes set");

        Object.assign(this.data, update);
    }

    getAll(): T {
        return this.data;
    }

}
