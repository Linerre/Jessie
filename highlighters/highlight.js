// This is the main script that load both the language syntax highlighter and the needed style
// import the needed modules

import * as sh from "./langs/clhl.js";
import * as js from "./langs/jshl.js";

let codeBlock = document.querySelector('.code'),
    cmd = codeBlock.innerHTML;

let lan = document.getElementsByClassName('lang')[0];
if (lan.textContent == 'Linux') {
    let newCmd = sh.highlight(cmd);
    console.log(newCmd);
    codeBlock.innerHTML = sh.addLineNumber(newCmd);
}
 else if (lan.textContent == 'js') {
    let newCmd = js.highlight(cmd);
    console.log(newCmd);
    codeBlock.innerHTML = js.addLineNumber(newCmd);
}