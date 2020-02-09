
// In the colorscheme order

// Lookforward pattern
let  LKFW= {
// Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
// A few speical words: base08:red + italic
// RED: [
//     /this(?=(\.\w+)?)/,
//     /arguments/,
//     /super/
// ],
// Integers and Boolean values: base09: orange
ORANGE: [
    // Need to include more exceptions
    /\d+(\.\d*)?/,

    /true/, /false/,

    /undefined/, /null/,

    /NaN/,

    /Infinity/
],
// Strings: base0B: green
GREEN: [
    /'([^\\]*)'/,
    /"(.*)"(?!>)/
],
//red|orange|yellow|green|cyan||magenta|grey)
// Re, punctuations, etc: base0C: cyan
CYAN: [
    // new
    /new(?= +\w+)/,

    // in
    / +in(?= +\w+)/,

    // void

    // punctuations
    /[\.,!@$\^;:"'\?\\\|]/,

    // braces
    /\(|\)|\{|\}|\[|\]/,

    // operaters
    /\+|-|\*|\/|%/,

    /={1,3}|!={1,2}|>=|<=|>|</,

    /\+=|-=|\*=|\/=/,

    /\+{2}|-{2}|/,

    /\|\||&&/,

    // regular expressions
    /\/.*\//
],
// Keywords, Storage, Selector, Markup Italic, Diff Changed: base0E
// Reserved keywords as of ECMAScript 2015
MAGENTA: [
    /break(?=( [\w\d]+)?;)( )*/, /case(?= )/, /catch /, 

    /class(?= +)/, /const(?= +)/, /continue(?=;)/, 

    /debugger;( )*/, /default(?=: *)/, /delete(?= +)/, 

    /do(?= +\{)/, /else(?= +\{|\w+)/,  /export /, 

    /extends/, /finally(?= *<span)/, 

    /for(?= *)/, /function(?= +)/,

    /if(?= *)/, /import(?= +\w+)/, 

    / +in +/, /instanceof(?= *)/, 

    /let(?= +)/, /new(?= )/, 

    /return(?= ;)/, /switch(?= *\()/, 

    /throw(?= )/, /try(?= *\{)/, 
        
    /typeof(?= )/, /var(?= +)/, 

    /while(?= *\()/, /with/, /yield(?= +)/
],

// Comments, Invisibles, Line Highlighting: base03
GREY: [
    /\/\/.*/ 
]
};

// lookbehind patterns
let LKBH = {
// Classes: base0A: yellow + bold;
YELLOW: [
    // use $1 to refer to this group
    /console(?=\.\w+)/,
    /Object(?=\.\w+)/,
    /RegExp(?= *\()/,
    /String(?= *\()/,

    // class Name (often user-defined)
    /[A-Z]\w+(?= *\()/,
],

// Functions, Methods, Attribute IDs, Headings: base0D: blue
// use $1 to refer to this group
BLUE: [
    // method name
    /\.(\w+(?= *\())/,

    // function name (user), same as class name
    /\w+(?= *\()/
]
};



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


function forwardHighlights() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    // console.log(LKFW.ORANGE);
    
    for (let i = 0 ; i < LKFW.CYAN.length; i++) {
        // get a pattern first
        let re = new RegExp(LKFW.CYAN[i], 'gm');
        // test it
        if (re.test(data)) {
            // if true, use regex to replace all at one time
            data = data.replace(re, STYLES.CYAN+'$&'+STYLES.CLOSE);
        } else continue;
    // console.log(LKFW[pattern].length);
    }
    console.log(data);
    codeblock.innerHTML = data;
}

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
    // behindHighlights();
    forwardHighlights();
}


