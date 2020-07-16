import { User } from './models/User';


const user = new User({id: 1, name: 'latest name', age:99999});


user.on('save', () => {
    console.log(user)
});

user.save();