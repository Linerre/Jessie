
// In the colorscheme order

// Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
// A few speical words: base08:red + italic
let 
// Comments, Invisibles, Line Highlighting: base03
// #1 mark up this
GREY= [
    /\/\/[^\/]*<br>/gm
],

// Strings: base0B: green
// #2
GREEN = [
    // String Single
    // /'[^']*'/,
    // String Double
    // /"([^"]*)"/
    // /"([^"]*)"(?!>)/
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
CYAN= [
    // new and in
    /\bnew\b(?= +\w+)|\bin\b(?= +\w+)|\binstanceof\b(?= +\w+)/,

    // punctuations
    // /[\.,!@$\^;:"'\?\\\|]/,

    // // braces
    // /\(|\)|\{|\}|\[|\]/,

    // // operaters
    // /[\+\*%\/-](?= *\d+)|\/.+\/(?=[gmis]?)/,

    // /={1,3}|!={1,2}|>=|<=|>|</,

    // /\+=|-=|\*=|\/=/,

    // /\+{2}|-{2}|/,

    // /\|\||&&/,

    // regular expressions
    //
],
// Keywords, Storage, Selector, Markup Italic, Diff Changed: base0E
// Reserved keywords as of ECMAScript 2015
MAGENTA= [
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
YELLOW= [
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
BLUE= [
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

let codeblock = document.querySelector('.code');
let data = codeblock.innerHTML;
console.log(data.match(/^( )*function.*/gm));

// =================== mark-up functions ================
function markComment() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    data = data.replace(GREY[0], STYLES.GREY+'$&'+STYLES.CLOSE);
    codeblock.innerHTML = data;
}

function markString() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    for (let pattern of GREEN) {
        data = data.replace(new RegExp(pattern, 'mg'), STYLES.GREEN+'$&'+STYLES.CLOSE);
    }
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
    markComment();
    markString();
//     // behindHighlights();
//     forwardHighlights();
}


