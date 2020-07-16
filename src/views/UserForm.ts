import { User } from "../models/User";

export class UserForm {

    constructor(public parent: Element, public model: User) {
        this.bindModel();
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            // 'mouseenter:h1': this.onHeaderHover,
            'click:.set-age': this.onSetAgeClick

        };
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
            <h1> User Form </h1>
            <div>User name: ${this.model.get('name')}</div>
            <div>User age: ${this.model.get('age')}</div>
            <input />
            <button> Click Me </button>
            <button class="set-age"> Set Random Age </button>
            </div>
        `;
    }


    bindEvents (fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for(let eventKey in eventsMap) {
            const [eventName,selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey])
            })

        }
    }

    render(): void {

        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }

}