import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';

export default class Optimizer {

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
