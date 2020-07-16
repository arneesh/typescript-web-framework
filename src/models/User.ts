import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

export interface UserProps {
    // ? is added to make the fields optional so that
    // user does not have to always provide both the name and age and stand alone name and age would work
    id?: number;
    name?: string;
    age?:number;
}

const rootUrl = 'http://localhost:300/users'


export class User {

    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

    public attributes: Attributes<UserProps>;
    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }

}