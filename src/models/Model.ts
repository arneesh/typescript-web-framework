import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    set(update: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
    fetch(id: number): AxiosPromise ;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {

    // Always use this shortchut way of creating fields for constructor as it messes with order of things
    constructor(private attributes: ModelAttributes<T>, private events: Events, private sync: Sync<T> ) {}

        get on() {
            // not calling function 'on' - returning a reference to the on method in eventing.ts
            return this.events.on;
        }


        // Short cut method of creating the same field based getters
        trigger = this.events.trigger;
    
        // get trigger() {
        //     return this.events.trigger;
        // }

        get = this.attributes.get;

        // get get() {
        //     return this.attributes.get;
        // }
    
        set(update: T): void {
            this.attributes.set(update);
            this.events.trigger('change');
        }
    
        fetch(): void {
            const id = this.get('id');
            if(typeof(id) !== 'number'){
                throw new Error('Cannot fetch without an id');
            }
            this.sync.fetch(id).then((response: AxiosResponse): void => {
    
                this.set(response.data);
            })
        }
    
        save(): void {
            this.sync.save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger('save')
            }).catch(() => {
                this.trigger('error');
            })
        }

    

}