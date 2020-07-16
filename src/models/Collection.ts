import { Eventing } from './Eventing'; 
import axios, { AxiosResponse } from 'axios';

export class Collection<T, K> {

    constructor(public rootUrl: string, public deserialize: (json: K) => T ){}

    models: T[] = [];
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
            response.data.forEach((value: K) => {
                this.models.push(this.deserialize(value));
            })
            this.trigger('change');
        })
    }

}