import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

export default class Optimizer {
    constructor(e) {
        this.fileList = e.dataTransfer.files;
        this.savePath = new String();
        this.arrayofFiles = new Array();
        this.saveFolder = '/OPTIMIZED/';

        // kick off the fun
        this.init();
    }

    init() {

        // just grab the fist element in the array
        // to determine the path to save to
        this.getSavePath(this.fileList[0].path);
        this.getFilesArray(this.fileList[0].path);

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
        console.log("The path to save to = " + this.savePath);
    }

    getFilesArray(fullPath) {
        var tempStr = new String();
        var i = new Number(0);

        for (let f of this.fileList) {
            this.arrayofFiles.push(f.path);
        }
        if (fullPath.indexOf('.') === -1) {
            // update to use a globbing pattern
            tempStr = this.arrayofFiles[0];
            this.arrayofFiles[0] = tempStr + '/**/*.{jpg,png}';
            // update the savePath variable to organize them in the same folder structure
        }

        console.log(this.arrayofFiles);
    }

    optimizeImages() {
        imagemin(this.arrayofFiles, this.savePath, {
            plugins: [
                imageminPngquant({quality: '65-80'})
            ]
        }).then(files => {
            //console.log(files);
        });
    }
};
