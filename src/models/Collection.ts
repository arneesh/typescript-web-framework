import { User, UserProps } from './User';
import { Eventing } from './Eventing'; 
import axios, { AxiosResponse } from 'axios';

export class Collection {

    constructor(public rootUrl: string){}

    models: User[] = [];
    events: Eventing = new Eventing();

    // as we havent initialized events in the short cut way inside contrcutor so we
    // have to create get on in this way
    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch(): void {
        axios.get(this.rootUrl)
        .then((response: AxiosResponse) => {
            response.data.forEach((value: UserProps) => {
                const user = User.buildUser(value);
                this.models.push(user);
            })
            this.trigger('change');
        })
    }

}