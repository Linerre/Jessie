
// In the colorscheme order

// A few speical words: base08:red + italic
let RED = [
    /this(?=(\.\w+)?)/,
    /arguments/,
    /super/
],

// Integers and Boolean values: base09: orange
ORANGE = [
    // Need to include more exceptions
    /\d+(\.\d*)?/,

    /true/, /false/,

    /undefined/, /null/,

    /NaN/,

    /Infinity/
],

// Classes: base0A: yellow + bold;
YELLOW = [
    // use $1 to refer to this group
    /(console(?=\.\w+))/,
    /(Object(?=\.\w+))/,
    /(RegExp(?= *\())/,

    // class Name (often user-defined)
    /class +(\w+(?= *\())/,


],

// Strings: base0B: green
GREEN = [
    /'([^'\\])'/,
    /"([^"\\])"/
],

// Re, punctuations, etc: base0C: cyan
CYAN = [
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
    /\+|\-|\*|\/|%/,

    /=|==|===|!=|!==|>=|<=|>|</,

    /\+=|-=|\*=|\/=/,

    /\+\+|--|/,

    /\|\||&&/,

    // regular expressions
    /\/.*\//
];


// Functions, Methods, Attribute IDs, Headings: base0D: blue
BLUE = [
    // use $1 to refer to this group

    // method name
    /(\.(\w+)(?= *\())/,

    // function name (user), same as class name
    /function +(\w+(?= *\())/
],

// Keywords, Storage, Selector, Markup Italic, Diff Changed: base0E
// Reserved keywords as of ECMAScript 2015
MAGENTA = [
    /break(?=( [\w\d]+)?;)( )*/, /case(?= )/, /catch /, 

    /class(?= +)/, /const(?= +)/, /continue(?=;)/, 

    /debugger;( )*/, /default(?=: *)/, /delete(?= +)/, 

    /do(?= +\{)/, /else(?= +\{|\w+)/,  /export /, 

    /extends/, /final/, /finally(?= *\{)/, 

    /for(?= *\()/, /function(?= +\w+)/,

    /if(?= \()/, /import(?= +\w+)/, 

    / +in +/, /instanceof(?= )/, 

    /let(?= +)/, /new(?= )/, 

    /return(?= (\w+);)/, /switch(?= *\()/, 

    /throw(?= )/, /try(?= *\{)/, 
        
    /typeof(?= )/, /var(?= +)/, 

    /while(?= *\()/, /with/, /yield(?= )/
],

// Comments, Invisibles, Line Highlighting: base03
GREY = [
    /\/\/(?=[^\n])/ 
];




// user color instead of names
let STYLES = {
    red     : '<span class="red">',        //0
    orange  : '<span class="orange">',     //1
    yellow  : '<span class="yellow">',     //2
    green   : '<span class="green">',      //3
    cyan    : '<span class="cyan">',       //4
    blue    : '<span class="blue">',       //5
    magenta : '<span class="magenta">',    //6
    grey    : '<span class="grey">',       //7
    close   : '</span>'
};

function highlights() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.textContent;
    
    // let matches = data.match(kw),
    //     marks = [];
    // // mark all keywords
    // for (let i = 0; i < matches.length; i++) {
    //     marks[i] = STYLES.megenta+matches[i]+STYLES.close;
    // }
    // console.log(matches);
    // console.log(marks);
    // let position = 0;
    for (let i = 0; i < MAGENTA.length; i++) {
        // get a pattern first
        let re = new RegExp(MAGENTA[i], 'gm');

        // test it
        if (re.test(data)) {
            
            // if true, use regex to replace all at one time
            data = data.replace(re, STYLES.magenta+'$&'+STYLES.close);

            // console.log('finish replacing:\n', data);
        

            // position = data.indexOf(marks[i], position)+marks[i].length; // why -1 + 27
            // console.log('new position:', position);
            // console.log(data.slice(position, position+5));
        } else continue;
    }
    console.log(data);
    codeblock.innerHTML = data;
}





// function highlights() {
//     let codeblock = document.querySelector('.code');
//     let data = codeblock.textContent; 
    
//     let matches = {};
//     for (let pattern of PATTERNS) {
//         if (data.match(pattern)) {
//             matches[PATTERNS.indexOf(pattern)] = data.match(pattern);
//         }
//     }
    
//     for (let match in matches) { // must use obj[prop]; not obj.prop
//         for (let i = 0; i < matches[match].length; i++) {
//             matches[match][i] = STYLES[Object.keys(STYLES)[match*1]]+matches[match][i]+STYLES.close; // mark them all!
//         }     
//     }                  
//     console.log(matches);
// }                    
// keep a copy of the raw data;
// parse/analyze it as much as possible
// mark the recognized patterns/lexemes
// replace the original data lexeme by lexeme 




// detect the language and hightlight
var lan = document.querySelector('.language').textContent;
if (lan=='js') {
    highlights();
}


