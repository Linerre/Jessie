// This file highlights the syntax of command lines on *nix systems
// Linux and macOS in particular
import {STYLES as st} from "./styles.js";

// Commands, i.e. the programmes frequently used in a terminal
export let SHBLUE = [
    /ls(?= ?)/, /cd(?= ?)/, /cp(?= ?)/, /mv(?= )/,

    /rm(?= )/, /echo(?= ?)/, /printf(?= ?)/, /cat(?= )/,
    
    /ln(?= )/, /mkdir(?= )/,

    /u?mount(?= )/, /fdisk(?= )/, 
    
    /find(?= <span)/, /locate(?= )/, /touch(?= )/, /stat(?= ?)/,

    /grep(?= <span)/, /awk(?= )/,

    /tar(?= )/, /gzip(?= )/
],

SHGREY = [
    /(#[^#]+)(<br>)/
],

SHGREEN = [
    /"([^"]*)"/,

    /'([^'"]*)'/
],


SHMAGENTA = [
    /for(?= +)/, /(?: +)in(?= +)/,

   /do(?=\n)/, /if(?= +<span)/, /then(?= ?)/, /else(?=\n)/,

   /fi(?=\n)/, /done\n/
],

SHCYAN = [
    /\||;/,
    /-/,
    /&gt;|&lt;/
],

SHORANGE = [
    /(-)(\w+)/
];



export function highlight(command) {
    // always first highlight strings to avoid class="XXX" error
    // first replace stringD
    command = command.replace(new RegExp(SHGREEN[0], 'g'), 
    st.CYAN+'"'+st.CLOSE+
    st.GREEN+'$1'+st.CLOSE+
    st.CYAN+'"'+st.CLOSE);

    // then replace stringS
    command = command.replace(new RegExp(SHGREEN[1], 'g'), 
    st.CYAN+'\''+st.CLOSE+
    st.GREEN+'$1'+st.CLOSE+
    st.CYAN+'\''+st.CLOSE);

    // ====== highlight comment
    command = command.replace(new RegExp(SHGREY[0], 'g'), 
        st.GREY+'$1'+st.CLOSE);
    
    // ====== highlight options
    command = command.replace(new RegExp(SHORANGE[0], 'g'), 
    '$1'+st.ORANGE+'$2'+st.CLOSE);

    // ====== highlight Operators
    for (let op of SHCYAN) {
        if (op.test(command)) {
            command = command.replace(new RegExp(op, 'g'), 
            st.CYAN+'$&'+st.CLOSE);
        } 
    }

    // ====== highlight Keywords (if, done, etc)
     for (let kw of SHMAGENTA) {
        if (kw.test(command)) {
            command = command.replace(new RegExp(kw, 'g'), 
            st.MAGENTA+'$&'+st.CLOSE);
        } 
    }

    // ====== highlight Commands
    for (let cm of SHBLUE) {
        if (cm.test(command)) {
            command = command.replace(new RegExp(cm, 'g'), 
            st.BLUE+'$&'+st.CLOSE);
        } 
    }
    return command;
}

export function addLineNumber(command) {
    let re = /.+\n/g;
    let newCommand = '';
    let lines = command.match(re);
    // console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        lines[i] = String(i+1) + lines[i];
        newCommand += lines[i];
    }
    return newCommand;
}











