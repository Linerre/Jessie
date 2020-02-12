
// In the colorscheme order


let 
// Comments, Invisibles, Line Highlighting: base03
// #1 mark up this
GREY= [
    
    /\/\/[^\/]*<br>/gm //consider using # to help
],

// Strings: base0B: green
// #2
GREEN = [
    // String Double
    // replace this first to avoid class="xxx" trouble
    /"([^"]*)"/,

    // String Single
    // Not allow 'My name is "Peter"!'
    /'([^'"]*)'/

    
],

// Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
// A few speical words: base08:red + italic
RED = [
    /\bthis\b(?=(\.\w+)?)/,
    /\barguments/,
    /\bsuper/
],
// Integers and Boolean values: base09: orange
ORANGE = [
    // use # to assist
    /(\d+)#/,

    /true|false|undefined|null|NaN|Infinity/
],



// Re, punctuations, etc: base0C: cyan
// To make things easier, let's use #
CYAN = [
    // 0 match let|var|const xxx "=""
    /(let|var|const)([\w ]+)(=)/,

    // 1 punctuations
    // $ is special
    /;(?= *\n)(?![=\d])/,  // not allow = followed to avoid marking
                             // the below 3
    
    // 2 >=|<=|>|<; Note the html symbol
    /&gt;=|&lt;=|&gt;|&lt;/,

    // 3 =|+=|-=|*=|/=|%=|==|===|!=|!==; using # to assist
    /([\+\*\/!%-]?={1,3})#/,

    // 4 braces
    /\(|\)|\{|\}|\[|\]/,

    // 5 +-*/%?!:    using # to assist
    /([-&%\+\*\/\.,!@\^:\?\\]{1,2})#/,

    // 6 boolean operator || 
    / \|\| /,

    // 7 boolean operator &&
    / &amp;&amp; /,

    // 8 new and in
    /\bnew\b(?= +\w+)|\bin\b(?= +\w+)|\binstanceof\b(?= +\w+)/,

    // 9 regualr expressions
    /(\/(?!span>)[^\/]+\/)([gmiyu]+)/

],

// Keywords, Storage, Selector, Markup Italic, Diff Changed: base0E
// Reserved keywords as of ECMAScript 2015
MAGENTA = [
    /break/, /\bcase\b(?= )/, 
    
    /\bcatch\b(?= *)/, 

    /\bclass\b(?= +)/, /\bconst\b(?= +)/, /\bcontinue(?=;)/, 

    /\bdebugger;/, /\bdefault(?=:)/, /delete(?= +)/, 

    /\bdo(?= +\{)/, /else(?= +\{|\w+)/,  /export /, 

    /\bextends\b(?= *)/, /\bfinally\b(?= *)/, 

    /\bfor(?= *<span)/, /\bfunction\b(?= +)/,

    /\bif(?= *)/, /import(?= +)/, 

    /\blet(?= +)/, 

    /\breturn/, /\bswitch(?= *)/, 

    /\bthrow(?= *)/, /\btry(?= *)/, 
        
    /\btypeof(?= +)/, /\bvar(?= +)/, 

    /\bwhile(?= *)/, /\bwith/, /\byield(?= +)/
],


// Classes: base0A: yellow + bold;
YELLOW = [
    /console(?=<span)/,     //console.
    /Object(?= *<span)/,    //Object()
    /RegExp(?= *<span)/,
    /String(?= *<span)/,
    /Date(?= *<span)/,
    /Array(?= *<span)/,

    // class Name (often user-defined)
    /\b[A-Z]\w+\b(?=<span)/
],

// Functions, Methods, Attribute IDs, Headings: base0D: blue
BLUE = [
    // method and function name
    // <span class="cyan">\.<\/span>
    /[a-z][a-zA-Z0-9]+(?= *<span class="cyan">\()/,
]


// use color instead of names
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


// =================== mark-up functions ================
function markComment() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    data = data.replace(GREY[0], (match)=>{
        return STYLES.GREY+match.slice(0, -4)+STYLES.CLOSE});
    codeblock.innerHTML = data;
}

function markString() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    // first replace stringD
    data = data.replace(new RegExp(GREEN[0], 'g'), 
    STYLES.CYAN+'"'+STYLES.CLOSE+
    STYLES.GREEN+'$1'+STYLES.CLOSE+
    STYLES.CYAN+'"'+STYLES.CLOSE);

    // then replace stringS
    data = data.replace(new RegExp(GREEN[1], 'g'), 
    STYLES.CYAN+'\''+STYLES.CLOSE+
    STYLES.GREEN+'$1'+STYLES.CLOSE+
    STYLES.CYAN+'\''+STYLES.CLOSE);
    
    codeblock.innerHTML = data;

}

function markOperator() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    // mark let|var|const declarations
    data = data.replace(new RegExp(CYAN[0], 'g'), '$1'+'$2'+
    STYLES.CYAN+
    '$3'+
    STYLES.CLOSE);

    // ;
    data = data.replace(new RegExp(CYAN[1], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);
    
    // >=|<=|>|<
    data = data.replace(new RegExp(CYAN[2], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);

    // =|+=|-=|*=|/=|%=|==|===|!=|!==
    data = data.replace(new RegExp(CYAN[3], 'g'), STYLES.CYAN+
    '$1'+
    STYLES.CLOSE);

    // braces
    data = data.replace(new RegExp(CYAN[4], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);

    // 5 +-*/%?!:
    data = data.replace(new RegExp(CYAN[5], 'g'), STYLES.CYAN+
    '$1'+
    STYLES.CLOSE);

    // boolean operator ||
    data = data.replace(new RegExp(CYAN[6], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);

    // boolean operator ||
    data = data.replace(new RegExp(CYAN[7], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);

    // new, in, instanceof
    data = data.replace(new RegExp(CYAN[8], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);
    // console.log(data);
    
    codeblock.innerHTML = data;
}

function markKeywords() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    for (let pattern of MAGENTA) {
        if (pattern.test(data)) {
            data = data.replace(new RegExp(pattern, 'g'), STYLES.MAGENTA+
            '$&'+STYLES.CLOSE);
        } else continue;
    }
    codeblock.innerHTML = data;
}

function markObjects() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    for (let pattern of YELLOW) {
        if (pattern.test(data)) {
            data = data.replace(new RegExp(pattern, 'g'), STYLES.YELLOW+
            '$&'+STYLES.CLOSE);
        } else continue;
    }
    codeblock.innerHTML = data;
}
function markMethods() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    for (let pattern of BLUE) {
        if (pattern.test(data)) {
            data = data.replace(new RegExp(pattern, 'g'), 
            STYLES.BLUE+'$&'+STYLES.CLOSE)
        } else continue;
    }
    codeblock.innerHTML = data;
}

function markNumbers() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    data = data.replace(new RegExp(ORANGE[0], 'g'), STYLES.ORANGE+
    '$1'+
    STYLES.CLOSE); 

    data = data.replace(new RegExp(ORANGE[1], 'g'), STYLES.ORANGE+
    '$&'+
    STYLES.CLOSE);
    
    codeblock.innerHTML =data;
}

function markRegExp() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    data = data.replace(new RegExp(CYAN[9], 'g'), 
    STYLES.CYAN+'$1'+STYLES.CLOSE+
    STYLES.MAGENTA+'$2'+STYLES.CLOSE); 

    codeblock.innerHTML =data;
}

    

// detect the language and hightlight
var lan = document.querySelector('.language').textContent;
if (lan=='js') {
    markString(); // to avoid any class="xxx" trouble!
    markComment();
    markOperator();
    markKeywords();
    markObjects();
    markMethods();
    markNumbers();
    markRegExp();
    
}


