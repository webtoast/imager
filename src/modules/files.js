import isFolder from './isFolder';
import Optimizer from './optimizer';
import Spinner from './spinner';
import fs from 'fs';
import stripFilename from './stripFilename';

export default class Files {

    constructor(e) {
        this.filesList = e.dataTransfer.files;
        this.saveFolder = '/_OPTIMIZED/';
        this.pathsArray = [];
        this.folders = [];
        this.optimizeConfig = [];
        this.spinner = new Spinner;

        // kick off the fun
        this.init();
    }

    init() {
        this.spinner.toggle();

        // extract the path from each object and push into array
        Object.keys(this.filesList).forEach((key) => {
            this.pathsArray.push(this.filesList[key].path);
        });

        // build the unique folder array
        this.folders = [...new Set(this.pathsArray.map((path) => {
            return stripFilename(path)
        }))];

        this.groupFolderPaths();

        var optimizer = new Optimizer(this.optimizeConfig);

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
                 if(isFolder(this.pathsArray[j])) {
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
        return (stringToCompare) => string == stripFilename(stringToCompare);
    }

    // name:    buildObjects
    // params:  srcPaths: array, outputDir: string
    // builds a config object and pushes into array
    buildObjects(srcPaths, outputDir) {
       var obj = {
          dest: outputDir + '/_OPTIMIZED',
          src: srcPaths
       }

       this.optimizeConfig.push(obj);
    }

}
