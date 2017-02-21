import Optimizer from './optimizer';
import fs from 'fs';

export default class Files {

    constructor(e) {
        this.filesList = e.dataTransfer.files;
        this.saveFolder = '/_OPTIMIZED/';
        this.pathsArray = [];
        this.folders = [];
        this.filesToOptimize = [];

        // kick off the fun
        this.init();
    }

    init() {
        // extract the path from each object and push into array
        Object.keys(this.filesList).forEach((key) => {
            this.pathsArray.push(this.filesList[key].path);
        });

        // build the unique folder array
        this.folders = [...new Set(this.pathsArray.map((path) => {
            return this.removeFileFromPath(path)
        }))];

        this.groupFolderPaths();

        var optimizer = new Optimizer(this.filesToOptimize);

    }

    // name:    groupFolderPaths
    // params:  none
    // loops through the paths array comparing each element
    // to a unique folder in the folders array
    // groups similar src destinations and passes to buildObjects
    // to build the config for each src/output combo
    groupFolderPaths() {
        for (var i = 0; i < this.folders.length; i++) {
           var src = [];
           var uniqueCompare = this.comparePath(this.folders[i]);

           for (var j = 0; j < this.pathsArray.length; j++) {

              if(uniqueCompare(this.pathsArray[j])) {
                 // if the path is a folder
                 if(this.checkIfFolder(this.pathsArray[j])) {
                    // add a glob to get all images
                    src.push(this.pathsArray[j] + '/**/*')
                } else {
                    // otherwise just push the path
                    src.push(this.pathsArray[j]);
                }

              }

           }

           this.buildObjects(src, this.folders[i]);

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

    // name:    buildObjects
    // params:  srcPaths: array, outputDir: string
    // builds a config object and pushes into array
    buildObjects(srcPaths, outputDir) {
       var obj = {
          dest: outputDir + '/_OPTIMIZED',
          src: srcPaths
       }

       this.filesToOptimize.push(obj);
    }

}
