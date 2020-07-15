import { User } from './models/User';


const user = new User({name: 'kingsville', age:33});

user.set({name: 'aloneking', age: 99});

user.save();