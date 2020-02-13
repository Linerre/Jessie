let codeblock = document.querySelector('code');
let data = codeblock.innerHTML;
// let cutter = /.*<br>/g;
// let lines = code.match(cutter);

GREY= [
    /\/\/[^\/]*<br>/gm //consider using # to help
];

let func = /function(?= *)/g;

let GREEN = [
    // String Double
    // replace this first to avoid class="xxx" trouble
    /"([^"]*)"/,

    // String Single
    // Not allow 'My name is "Peter"!'
    /'([^'"]*)'/
];

// color schemes
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


// data = data.replace(comment, '<span class="grey">'+'$&'+'</span>');

// highlight string
data = data.replace(new RegExp(GREEN[0], 'g'), 
    STYLES.CYAN+'"'+STYLES.CLOSE+
    STYLES.GREEN+'$1'+STYLES.CLOSE+
    STYLES.CYAN+'"'+STYLES.CLOSE);

data = data.replace(new RegExp(GREEN[1], 'g'), 
    STYLES.CYAN+'\''+STYLES.CLOSE+
    STYLES.GREEN+'$1'+STYLES.CLOSE+
    STYLES.CYAN+'\''+STYLES.CLOSE);

// highlight conmment
data = data.replace(GREY[0], (match)=>{
    return STYLES.GREY+match.slice(0, -4)+STYLES.CLOSE});

//
data = data.replace(func, '<span class="magenta">'+'$&'+'</span>');

codeblock.innerHTML = data;

