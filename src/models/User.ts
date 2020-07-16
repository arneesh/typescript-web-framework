
import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';

export interface UserProps {
    // ? is added to make the fields optional so that
    // user does not have to always provide both the name and age and stand alone name and age would work
    id?: number;
    name?: string;
    age?:number;
}

const rootUrl = 'http://localhost:3000/users'


export class User extends Model<UserProps> {

    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(rootUrl)
        );
    }

    // In case we want to swap the sync methodology
    // static buildLocalUser(attrs: UserProps): User {
    //     return new User(
    //         new Attributes<UserProps>(attrs),
    //         new Eventing(),
    //         new LocalSync<UserProps>(rootUrl)
    //     );
    // }
    


}

