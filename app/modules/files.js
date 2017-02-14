import Optimizer from './optimizer';

export default class Files {

    constructor(e) {
        // convert object to an array
        this.fileList = Array.prototype.slice.call(e.dataTransfer.files);
        this.savePath = '';
        this.saveFolder = '/_OPTIMIZED/';
        this.pathsArray = [];

        // kick off the fun
        this.init();
    }

    init() {
        // fill the pathsArray with paths
        for (var file in this.fileList) {
            this.pathsArray[file] = this.fileList[file].path;
        }

        // just grab the fist element in the array
        // to determine the path to save to
        this.getSavePath(this.pathsArray[0]);

        var optimizer = new Optimizer(this.pathsArray, this.savePath);
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
