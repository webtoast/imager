import Optimizer from './optimizer';

export default class Files {
    constructor(e) {
        this.fileList = e.dataTransfer.files;
        this.savePath = new String();
        this.saveFolder = '/_OPTIMIZED/';

        // convert object to an array
        this.filesListArray = Array.prototype.slice.call(this.fileList);
        this.filesArray = [];

        for (var file in this.filesListArray) {
            this.filesArray[file] = this.filesListArray[file].path;
        }

        // kick off the fun
        this.init();
    }

    init() {

        // just grab the fist element in the array
        // to determine the path to save to
        this.getSavePath(this.filesArray[0]);

        var optimizer = new Optimizer(this.filesArray, this.savePath);

    }

    getSavePath(fullPath) {
        var tempPath = new String();
        this.pathArray = fullPath.split('/');
        //remove the last element which is the file
        this.pathArray.pop();
        tempPath = this.pathArray.join('/');
        this.savePath = tempPath + this.saveFolder;
    }

}
