import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';

export interface UserProps {
    // ? is added to make the fields optional so that
    // user does not have to always provide both the name and age and stand alone name and age would work
    id?: number;
    name?: string;
    age?:number;
}

const rootUrl = 'http://localhost:3000/users'


export class User {

    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

    public attributes: Attributes<UserProps>;
    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }

    get on() {
        // not calling function 'on' - returning a reference to the on method in eventing.ts
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: UserProps): void {
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