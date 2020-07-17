
import { UserForm } from './views/UserForm';

import { User } from './models/User';

const user = User.buildUser({name: 'Spectra', age:44});

const root = document.getElementById('root'); 
if(root){
    const userForm = new UserForm(root, user);
    userForm.render();
} else {
    throw new Error ('Root Element Not Found');
}




