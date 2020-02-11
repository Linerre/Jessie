
// In the colorscheme order

// Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
// A few speical words: base08:red + italic
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

RED = [
    /\bthis\b(?=(\.\w+)?)/,
    /\barguments/,
    /\bsuper/
],
// Integers and Boolean values: base09: orange
ORANGE = [
// Need to include more exceptions
    /\d+(\.\d*)?/,
    /\btrue\b|\bfalse\b/, 
    /\bundefined\b|\bnull\b|\bNaN\b|\bInfinity\b/
],



// Re, punctuations, etc: base0C: cyan
// To make things easier, let's use #
CYAN = [
    // 0 match let|var|const xxx "=""
    /(let|var|const)([\w ]+)(=)/,
    
    // 1 match =|+=|-=|*=|/=|%=|==|===|!=|!==; using # to assist
    /([\+\*\/!%-]?={1,3})#/,
    
    // 2 match >=|<=|>|<; Note the html symbol
    /&gt;=|&lt;=|&gt;|&lt;/,

    // 3 punctuations
    // $ is special
    /[\.,!@\^:\?\\\|]|;(?=[\n ]+)/,

    // 4 braces
    /\(|\)|\{|\}|\[|\]/,

    // new and in
    /\bnew\b(?= +\w+)|\bin\b(?= +\w+)|\binstanceof\b(?= +\w+)/,

    // // operaters
    // /[\+\*%\/-](?= *\d+)|\/.+\/(?=[gmis]?)/,

    // /={3}|!={2}|>=|<=|>|</,

    // /\+=|-=|\*=|\/=/,

    // /\+{2}|-{2}|/,

    // /\|\||&&/,
],

// Keywords, Storage, Selector, Markup Italic, Diff Changed: base0E
// Reserved keywords as of ECMAScript 2015
MAGENTA = [
    /\bbreak\b(?=( [\w\d]+)?;)( )*/, /\bcase\b(?= )/, 
    
    /\bcatch\b(?= *)/, 

    /\bclass\b(?= +)/, /\bconst\b(?= +)/, /\bcontinue(?=;)/, 

    /\bdebugger;/, /\bdefault(?=:)/, /delete(?= +)/, 

    /\bdo(?= +\{)/, /else(?= +\{|\w+)/,  /export /, 

    /\bextends\b(?= *)/, /\bfinally\b(?= *)/, 

    /\bfor(?= *)/, /\bfunction\b(?= +)/,

    /\bif(?= *)/, /import(?= +)/, 

    /\blet(?= +)/, 

    /\breturn(?= ;)/, /\bswitch(?= *)/, 

    /\bthrow(?= *)/, /\btry(?= *)/, 
        
    /\btypeof(?= +)/, /\bvar(?= +)/, 

    /\bwhile(?= *)/, /\bwith/, /\byield(?= +)/,
],


// Classes: base0A: yellow + bold;
YELLOW = [
    /\bconsole\b/,
    /\bObject\b/,
    /\bRegExp\b/,
    /\bString\b/,
    /\bDate\b/,
    /\bArray\b/,

    // class Name (often user-defined)
    /\b[A-Z]\w+\b/
],

// Functions, Methods, Attribute IDs, Headings: base0D: blue
BLUE = [
    // method name
    /\.(\w+(?= *\())/,

    // function name (user), same as class name
    /\w+(?= *\()/
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
    data = data.replace(new RegExp(GREEN[0], 'g'), '"'+STYLES.GREEN+
        '$1'+
        STYLES.CLOSE+'"');

    // then replace stringS
    data = data.replace(new RegExp(GREEN[1], 'g'), '\''+STYLES.GREEN+
        '$1'+
        STYLES.CLOSE+'\'');
    
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
    
    // =|+=|-=|*=|/=|%=|==|===|!=|!==
    data = data.replace(new RegExp(CYAN[1], 'g'), STYLES.CYAN+
    '$1'+
    STYLES.CLOSE);
    
    // >=|<=|>|<
    data = data.replace(new RegExp(CYAN[2], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);
    
    // punctuations
    data = data.replace(new RegExp(CYAN[3], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);

    data = data.replace(new RegExp(CYAN[4], 'g'), STYLES.CYAN+
    '$&'+
    STYLES.CLOSE);
    
    console.log(data);
    
    codeblock.innerHTML = data;
}


// get the textContent and replace targets with marked ones
// function behindHighlights() {
//     let codeblock = document.querySelector('.code');
//     let data = codeblock.textContent;
//     for (pattern in LKBH) {
//         for (let i = 0 ; i < LKBH[pattern].length; i++) {
//             // get a pattern first
//             let re = new RegExp(LKBH[pattern][i], 'gm');
//             // test it
//             if (re.test(data)) {
//                 // if true, use regex to replace all at one time
//                 data = data.replace(re, STYLES[pattern]+'$&'+STYLES.CLOSE)
//                 // data = data.replace(re, (p1, p2)=> {
//                 //     if (p1 && p2) {
//                 //         console.log(p1, p2);
//                 //         return p1+STYLES[pattern]+p2+STYLES.CLOSE
//                 //     } else {
//                 //         return STYLES[pattern]+p1+STYLES.CLOSE;
//                 //     };
//                 // })
                
//             } else continue;
//         // console.log(LKFW[pattern].length);
//         }
//     }
//     console.log(data);
//     codeblock.innerHTML = data;
// }


// function forwardHighlights() {
//     let codeblock = document.querySelector('.code');
//     let data = codeblock.innerHTML;
//     // console.log(LKFW.ORANGE);
    
//     for (let i = 0 ; i < LKFW.CYAN.length; i++) {
//         // get a pattern first
//         let re = new RegExp(LKFW.CYAN[i], 'gm');
//         // test it
//         if (re.test(data)) {
//             // if true, use regex to replace all at one time
//             data = data.replace(re, STYLES.CYAN+'$&'+STYLES.CLOSE);
//         } else continue;
//     // console.log(LKFW[pattern].length);
//     }
//     console.log(data);
//     codeblock.innerHTML = data;
// }

    // for (pattern in LKFW) {
    //     for (let i = 0 ; i < LKFW[pattern].length; i++) {
    //         // get a pattern first
    //         let re = new RegExp(LKFW[pattern][i], 'gm');
    //         // test it
    //         if (re.test(data)) {
    //             // if true, use regex to replace all at one time
    //             data = data.replace(re, STYLES[pattern]+'$&'+STYLES.CLOSE);
    //         } else continue;
    //     // console.log(LKFW[pattern].length);
    //     }
    // }
    

// detect the language and hightlight
var lan = document.querySelector('.language').textContent;
if (lan=='js') {
    markString(); // to avoid any class="xxx" trouble!
    markComment();
    markOperator();

}


