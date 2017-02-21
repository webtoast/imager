import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';

export default class Optimizer {

    constructor(optimizeConfig) {
        this.optimizeConfig = optimizeConfig;

        this.optimizeImages();
    }

    // name:    optimizeImages
    // params:  none
    // processes the images for each object in the array
    optimizeImages() {
        Promise.all(this.optimizeConfig.map(function(src) {
            return imagemin(src.src, src.dest, {
                plugins: [
                    imageminPngquant(),
                    imageminMozjpeg()
                ]
            })
        }));

    }
};
