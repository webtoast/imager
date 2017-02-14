import Optimizer from './optimizer';

export default class Files {
    constructor(e) {
        // convert object to an array
        this.fileList = Array.prototype.slice.call(e.dataTransfer.files);
        this.savePath = '';
        this.saveFolder = '/_OPTIMIZED/';

        this.filesArray = [];

        for (var file in this.fileList) {
            this.filesArray[file] = this.fileList[file].path;
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
        var tempPath = '';
        this.pathArray = fullPath.split('/');
        //remove the last element which is the file
        this.pathArray.pop();
        tempPath = this.pathArray.join('/');
        this.savePath = tempPath + this.saveFolder;
    }

}
