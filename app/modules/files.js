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
        // extract the path from each object
        for (var file in this.fileList) {
            this.pathsArray[file] = this.fileList[file].path;
        }

        if(this.checkAllFolders()) {
          this.buildFolderObjects();

          // pass our array of objects to get optimized
          var optimizer = new Optimizer(this.filesToOptimize);

        } else {
          console.log('THROW AN ERROR');
        }

    }

    // name:    comparePath
    // params:  string: string
    // returns a function that accepts another string
    comparePath(string) {
        return (stringToCompare) => string == this.removeFileFromPath(stringToCompare);
    }
    // name:    checkAllFolders
    // params:  none
    // if any path is a file, return false
    checkAllFolders() {
      return this.pathsArray.every((path) => {
        return fs.lstatSync(path).isDirectory();
      })
    }

    // name:    buildFolderObjects
    // params:  none
    // builds the array of folder objects that go to Optimizer
    buildFolderObjects() {
        this.filesToOptimize = this.pathsArray.map(path => {
            var obj = {
                dest: path + '/_OPTIMIZED',
                src: [
                    path + '/**/*'
                ]
            }

            return obj;
        })

    }

}
