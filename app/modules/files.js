import Optimizer from './optimizer';
import fs from 'fs';

export default class Files {

    constructor(e) {
        // convert object to an array
        // http://xahlee.info/js/js_convert_array-like.html
        this.fileList = Array.prototype.slice.call(e.dataTransfer.files);
        this.saveFolder = '/_OPTIMIZED/';
        this.pathsArray = [];
        this.folders = [];
        this.filesToOptimize = [];

        // kick off the fun
        this.init();
    }

    init() {
        // extract the path from each object
        for (var file in this.fileList) {
            this.pathsArray[file] = this.fileList[file].path;
        }

        // build the unique folder array
        this.folders = [...new Set(this.pathsArray.map((path) => {
            return this.removeFileFromPath(path)
        }))];

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

    // name:    removeFileFromPath
    // params:  file path: string
    // returns a file path string without the file name or
    // returns the file path if it is a folder
    removeFileFromPath(path) {
       // only pop off the file name if there is one
       if(!this.checkIfFolder(path)) {
          var splitPath = path.split('/');
          splitPath.pop();
          path = splitPath.join('/');
       }

       return path;
    }

    // name:    checkIfFolder
    // params:  none
    // if any path is a file, return false
    checkIfFolder(path) {
        return fs.lstatSync(path).isDirectory();
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
