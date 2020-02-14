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
    
    /find(?= )/, /locate(?= )/, /touch(?= )/, /stat(?= ?)/,

    /grep(?= )/, /awk(?= )/,

    /tar(?= )/, /gzip(?= )/
],

GREY = [
    /#[^#]+(?=<br>)/
],

GREEN = [
    /"([^"]*)"/,

    /'([^'"]*)'/
],


MAGENTA = [
    /for(?= +)/, /(?: +)in(?= +)/,

   /do(?= ?)/, /if(?= +)/, /then(?= ?)/, /else(?= ?)/,

   /fi(?= ?)/, /done/
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
        STYLES.GREY+'$&'+STYLES.CLOSE);
    
    codeblock.innerHTML = command;
    console.log(command);
}

let lan = document.getElementsByClassName('lang')[0];
if (lan.textContent == 'Linux') {
    highlight();
}







