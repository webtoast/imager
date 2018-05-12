import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import Loader from './loader';

export default class Optimizer {

    constructor(optimizeConfig) {
        this.optimizeConfig = optimizeConfig;
        this.loader = new Loader;

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
        })).then((files) => this.loader.done());

    }
};
