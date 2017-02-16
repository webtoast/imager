import Optimizer from './optimizer';
import fs from 'fs';

export default class Files {

    constructor(e) {
        // convert object to an array
        // http://xahlee.info/js/js_convert_array-like.html
        this.fileList = Array.prototype.slice.call(e.dataTransfer.files);
        this.saveFolder = '/_OPTIMIZED/';
        this.pathsArray = [];
        this.filesToOptimize = [];

        // kick off the fun
        this.init();
    }

    init() {
        // fill the pathsArray with paths
        for (var file in this.fileList) {
            this.pathsArray[file] = this.fileList[file].path;
        }

        for (var path in this.pathsArray) {

            if (fs.lstatSync(this.pathsArray[path]).isDirectory()) {
                this.buildFolderObject(this.pathsArray[path]);
            } else {
                console.log('FILE - ' + this.pathsArray[path]);
                // TODO: error if it is a file
            }
        }

        // pass our array of objects to get optimized
        var optimizer = new Optimizer(this.filesToOptimize);
    }

    buildFolderObject(folderPath) {
        // the expected format for passing into optimizer
        // [
        //     {
        //         dest: '/path/to/another/image-folder/_OPTIMIZED',
        //         src: [
        //             '/path/to/another/image-folder/**/*'
        //         ]
        //     }
        // ];
        var obj = {
            dest: folderPath + '/_OPTIMIZED',
            src: [
                folderPath + '/**/*'
            ]
        }
        this.filesToOptimize.push(obj);
    }

}
