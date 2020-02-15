// This file highlights the syntax of command lines on *nix systems
// Linux and macOS in particular

let codeblock = document.querySelector('code');
let command = codeblock.innerHTML;

let 
// Commands, i.e. the programmes frequently used in a terminal
BLUE = [
    /ls(?= ?)/, /cd(?= ?)/, /cp(?= ?)/, /mv(?= )/,

    /rm(?= )/, /echo(?= ?)/, /printf(?= ?)/, /cat(?= )/,
    
    /ln(?= )/, /mkdir(?= )/,

    /u?mount(?= )/, /fdisk(?= )/, 
    
    /find(?= <span)/, /locate(?= )/, /touch(?= )/, /stat(?= ?)/,

    /grep(?= <span)/, /awk(?= )/,

    /tar(?= )/, /gzip(?= )/
],

GREY = [
    /(#[^#]+)(<br>)/
],

GREEN = [
    /"([^"]*)"/,

    /'([^'"]*)'/
],


MAGENTA = [
    /for(?= +)/, /(?: +)in(?= +)/,

   /do(?=\n)/, /if(?= +<span)/, /then(?= ?)/, /else(?=\n)/,

   /fi(?=\n)/, /done\n/
],

CYAN = [
    /\||;/,
    /-/,
    /&gt;|&lt;/
],

ORANGE = [
    /(-)(\w+)/
];


let STYLES = {
    RED     : '<span class="red">',        //0
    ORANGE  : '<span class="orange">',     //1
    YELLOW  : '<span class="yellow">',     //2
    GREEN   : '<span class="green">',      //3
    CYAN    : '<span class="cyan">',       //4
    BLUE    : '<span class="blue">',       //5
    MAGENTA : '<span class="magenta">',    //6
    GREY    : '<span class="grey">',       //7
    CLOSE   : '</span>'
};


function highlight() {
    // always first highlight strings to avoid class="XXX" error
    // first replace stringD
    command = command.replace(new RegExp(GREEN[0], 'g'), 
    STYLES.CYAN+'"'+STYLES.CLOSE+
    STYLES.GREEN+'$1'+STYLES.CLOSE+
    STYLES.CYAN+'"'+STYLES.CLOSE);

    // then replace stringS
    command = command.replace(new RegExp(GREEN[1], 'g'), 
    STYLES.CYAN+'\''+STYLES.CLOSE+
    STYLES.GREEN+'$1'+STYLES.CLOSE+
    STYLES.CYAN+'\''+STYLES.CLOSE);

    // ====== highlight comment
    command = command.replace(new RegExp(GREY[0], 'g'), 
        STYLES.GREY+'$1'+STYLES.CLOSE);
    
    // ====== highlight options
    command = command.replace(new RegExp(ORANGE[0], 'g'), 
    '$1'+STYLES.ORANGE+'$2'+STYLES.CLOSE);

    // ====== highlight Operators
    for (let op of CYAN) {
        if (op.test(command)) {
            command = command.replace(new RegExp(op, 'g'), 
            STYLES.CYAN+'$&'+STYLES.CLOSE);
        } 
    }

    // ====== highlight Keywords (if, done, etc)
     for (let kw of MAGENTA) {
        if (kw.test(command)) {
            command = command.replace(new RegExp(kw, 'g'), 
            STYLES.MAGENTA+'$&'+STYLES.CLOSE);
        } 
    }

    // ====== highlight Commands
    for (let cm of BLUE) {
        if (cm.test(command)) {
            command = command.replace(new RegExp(cm, 'g'), 
            STYLES.BLUE+'$&'+STYLES.CLOSE);
        } 
    }

    codeblock.innerHTML = command;
    
}

function addLineNumber() {
    let re = /.+\n/g;
    let newCommand = '';
    let lines = command.match(re);
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        lines[i] = String(i+1) + lines[i];
        newCommand += lines[i];
    }
    codeblock.innerHTML = newCommand;
    console.log(newCommand);
}



let lan = document.getElementsByClassName('lang')[0];
if (lan.textContent == 'Linux') {
    highlight();
    addLineNumber();
}







