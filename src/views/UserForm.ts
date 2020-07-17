import { User, UserProps } from "../models/User";
import { View } from './View';

export class UserForm extends View<User,UserProps> {

    eventsMap(): { [key: string]: () => void } {
        return {
            // 'mouseenter:h1': this.onHeaderHover,
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick

        };
    }

    onSaveClick = (): void => {
        this.model.save();
    }

    onSetNameClick = (): void => {
        console.log("Set name was clicked");
        const input = this.parent.querySelector('input');

        if(input) {
            const name = input.value;
            this.model.set({name});
        }

    }

    onSetAgeClick = (): void => {
    console.log('button was click')
        this.model.setRandomAge();
    }

    onButtonClick(): void {
        console.log("Hi There");
    }

    onHeaderHover(): void {
        console.log("H1 was mouse enter");
    }

    template(): string {
        return `
            <div>
            <input placeholder="${this.model.get('name')}" />
            <button class="set-name"> Change Name </button>
            <button class="set-age"> Set Random Age </button>
            <button class="save-model"> Save User </button>
            </div>
        `;
    }




}