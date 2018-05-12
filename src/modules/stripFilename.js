import isFolder from './isFolder';

// name:    stripFilename
// params:  file path: string
// returns a file path string without the file name or
// returns the file path if it is a folder

export default function(path) {
  // only pop off the file name if there is one
  if(!isFolder(path)) {
    var splitPath = path.split('/');
    splitPath.pop();
    path = splitPath.join('/');
  }

  return path;
}
