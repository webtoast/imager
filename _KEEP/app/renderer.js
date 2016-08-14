// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const imagemin = require('imagemin');
//const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

// drag and drop
document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
};

document.body.ondrop = (ev) => {
  let FileReportView = new FileReport(ev);
};

class FileReport {
    constructor(e) {
        this.fileList = e.dataTransfer.files;
        this.savePath = new String();
        this.arrayofFiles = new Array();

        // kick off the fun
        this.init();
    }

    init() {
        // for (let f of unoptimizedFiles) {
        //   console.log('File(s) you dragged here: ', f.path)
        // }

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
        this.pathArray = fullPath.split('/');
        this.pathArray.pop();
        this.savePath = this.pathArray.join('/');
        this.savePath += '/chef/';
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
            this.arrayofFiles[0] = tempStr + '/*.{jpg,png}';
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
            console.log(files);
        });
    }
};
