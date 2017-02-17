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
        this.allFolders;

        // kick off the fun
        this.init();
    }

    init() {
        // extract the path from each object
        for (var file in this.fileList) {
            this.pathsArray[file] = this.fileList[file].path;
        }

        this.checkForFiles();

        console.log(this.allFolders);

        if(this.allFolders) {
          this.buildFolderObject();

          // pass our array of objects to get optimized
          var optimizer = new Optimizer(this.filesToOptimize);

        } else {
          console.log('THROW AN ERROR');
        }

    }

    // name:    checkForFiles
    // params:  none
    // sets allFolders true/false if every path is a folder
    checkForFiles() {
      this.allFolders = this.pathsArray.every((path) => {
        return fs.lstatSync(path).isDirectory();
      })
    }

    buildFolderObject() {
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
