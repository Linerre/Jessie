// This is the main script that load both the language syntax highlighter and the needed style
// import the needed modules

import * as sh from "./langs/clhl.js";
import * as js from "./langs/jshl.js";
import * as awk from "./langs/awkhl.js";
import * as html from "./langs/htmlhl.js";


let codeBlock = document.querySelector('.code'),
    cmd = codeBlock.innerHTML;
    // mark = codeBlock.textContent;
    console.log(cmd)

let lan = document.getElementsByClassName('lang')[0];

// command line
if (lan.textContent == 'Linux') {
    let newCmd = sh.highlight(cmd);
    newCmd = sh.addLineNumber(newCmd);
    console.log(newCmd);
    codeBlock.innerHTML = newCmd;
}
// javascript
else if (lan.textContent == 'js') {
    let newCmd = js.highlight(cmd);
    newCmd = js.addLineNumber(newCmd);
    console.log(newCmd);
    codeBlock.innerHTML = newCmd
} 
// awk
else if (lan.textContent == 'awk') {
    let newCmd = awk.highlight(cmd);
    console.log(newCmd);
    codeBlock.innerHTML = newCmd;
}
// html
else if (lan.textContent == 'html') {
    let newCmd = html.highlight(cmd);
    console.log(newCmd);
    codeBlock.innerHTML = newCmd;
}

// python

// perl

// r

// vim(script)add
