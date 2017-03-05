export default class Spinner {
    constructor() {
        this.init();
    }

    init() {
        this.el = document.querySelector('.spinner');
    }

    toggle() {
        this.el.classList.toggle('hidden');
    }
}
