// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';

import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('greet').innerHTML = greet();
});

document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault();
}

document.ondrop = (ev) => {
    ev.preventDefault();
    console.log('Files Dropped!!');
    let FileReportView = new FileReport(ev);
}

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
            console.log(files);
        });
    }
};
