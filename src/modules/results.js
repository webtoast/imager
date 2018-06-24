import getFilename from './getFilename';
import prettyBytes from 'pretty-bytes';

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

    writeResults(files) {
       let results = '';

      files[0].forEach(function(element) {
        results += `<div class="result__item">
        <p class="result__name"> ${getFilename(element.path)}</p>
        <p class="result__size">${prettyBytes(element.data.buffer.byteLength)}</p>
        </div>`;
      })

      this.el.innerHTML = results;
    }
}
