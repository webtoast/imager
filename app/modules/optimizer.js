import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';

export default class Optimizer {

    constructor(filesArray, savePath) {
        this.filesArray = filesArray;
        this.savePath = savePath;
        this.optimizeImages();
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
