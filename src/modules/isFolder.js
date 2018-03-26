import fs from 'fs';

// name:    isFolder
// params:  path: string
// returns true if the path param is a directory

export default function(path) {
    return fs.lstatSync(path).isDirectory();
}
