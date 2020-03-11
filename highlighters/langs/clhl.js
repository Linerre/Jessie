// This file highlights the syntax of command lines on *nix systems
// Linux and macOS in particular
import {STYLES as st} from "./styles.js";

// Commands, i.e. the programmes frequently used in a terminal
export const SHBLUE = [
    /ls(?= ?)/, /cd(?= ?)/, /cp(?= ?)/, /mv(?= )/,

    /rm(?= )/, /echo(?= ?)/, /printf(?= ?)/, /cat(?= )/,
    
    /ln(?= )/, /mkdir(?= )/,

   /chmod(?= )/, /chown(?= )/,

    /u?mount(?= )/, /fdisk(?= )/, /find(?= [~\/p<])/,
    
    /locate(?= )/, /touch(?= )/, /stat(?= ?)/,

    /grep(?= <span)/, 

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
    // traditional shell form: for var in [words]; do
    /(for)( +[\w\d]+ +)(in)/,
    //  C form for ((expr1; expr2; expr3))
    /(for)( +<span)/,
    
// complete later
   /do(?=\n)/, 
   
//    /if(?= +<span)/, /then(?= ?)/, /else(?=\n)/,

   /fi(?=\n)/, /done\n/
],

SHCYAN = [
    /\||;/,
    /-/,
    /&gt;|&lt;/,
    /\({2}|\){2}/
],

SHORANGE = [
    /([uaog])?([=\+-])(\w+)/
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
    '$1'+'$2'+st.ORANGE+'$3'+st.CLOSE);

    // ====== highlight Operators
    for (let op of SHCYAN) {
        if (op.test(command)) {
            command = command.replace(new RegExp(op, 'g'), 
            st.CYAN+'$&'+st.CLOSE);
        } 
    }

    // ====== highlight Keywords (if, done, etc)
    // for var in ...
    command = command.replace(new RegExp(SHMAGENTA[0], 'g'),
    st.MAGENTA+'$1'+st.CLOSE+
    '$2'+
    st.MAGENTA+'$3'+st.CLOSE);

    // for ((expr1; expr2; expr3)) do;
    command = command.replace(new RegExp(SHMAGENTA[1], 'g'),
    st.MAGENTA+'$1'+st.CLOSE+
    '$2');

    // do
    command = command.replace(new RegExp(SHMAGENTA[2], 'g'),
    st.MAGENTA+'$&'+st.CLOSE);

    // done
    command = command.replace(new RegExp(SHMAGENTA[4], 'g'),
    st.MAGENTA+'$&'+st.CLOSE);


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











