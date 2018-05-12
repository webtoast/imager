export default class Results {
    constructor() {
        this.init();
    }

    init() {
        this.el = document.querySelector('.results');
    }

    toggle() {
        if(this.el.classList.contains('hidden')) {
            this.el.classList.toggle('hidden');
        }
    }
}
