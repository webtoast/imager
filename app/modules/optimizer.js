import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';

export default class Optimizer {
    constructor(e) {
        this.fileList = e.dataTransfer.files;
        this.savePath = new String();
        // this.arrayofFiles = new Array();
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
        // this.getFilesArray(this.fileList[0].path);

        // determining whether its a folder or files
        //console.log(this.fileList[0].path.indexOf('.'));

        this.optimizeImages();

        //console.log(this.fileList);
        // console.log(new Array());
    }

    getSavePath(fullPath) {
        var tempPath = new String();
        this.pathArray = fullPath.split('/');
        //remove the last element which is the file
        this.pathArray.pop();
        tempPath = this.pathArray.join('/');
        this.savePath = tempPath + this.saveFolder;
    }

    // not being used right now
    getFilesArray(fullPath) {
        var tempStr = new String();
        var i = new Number(0);

        for (let f of this.fileList) {
            this.arrayofFiles.push(f.path);
        }
        // IF THE FULLPATH IS A FOLDER
        if (fullPath.indexOf('.') === -1) {
            // update to use a globbing pattern
            tempStr = this.arrayofFiles[0];
            this.arrayofFiles[0] = tempStr + '/**/*.{jpg,png}';
            // update the savePath variable to organize them in the same folder structure
        }

        // console.log(this.arrayofFiles);
    }

    optimizeImages() {
        imagemin(this.filesArray, this.savePath, {
            plugins: [
                imageminPngquant({quality: '65-80'}),
                imageminMozjpeg()
            ]
        }).then(files => {
            //console.log(files);
        });
    }
};
