export default class Loader {
    constructor() {
        this.init();
    }

    init() {
        this.el = document.querySelector('.loader');
        this.spinner = document.querySelector('.spinner');
        this.instructions = document.querySelector('.instructions');
    }

    working() {
        this.hideInstructions();
        this.toggle();
    }

    done() {
      this.toggle();
    }

    toggle() {
        this.el.classList.toggle('active');
    }

    hideInstructions() {
        if(!this.instructions.classList.contains('hidden')) {
          this.instructions.classList.add('hidden');
        }
    }
}
