// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import Files from './modules/files';

// TODO: read up on env
// console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// This is the browser window with HTML and stuff, but you can read
// files like it is node.js!
// console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('greet').innerHTML = greet();
});

document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault();
}

document.ondrop = (ev) => {
    ev.preventDefault();
    let FileReportView = new Files(ev);
}
