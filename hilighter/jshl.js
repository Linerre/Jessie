
// Reserved keywords as of ECMAScript 2015
let STATEMENTS = [
    'break(?=( [\\w\\d]+)?;)( )*', 'case(?= )', 'catch ', 
    'class(?= )', 'const(?= )', 'continue(?=;)', 
    '^[ \t]*debugger;( )*$', 'default:(?=( )*)', 'delete(?= )', 'do', 
    'else(?=( )*\\{|\\w+)',  
    'export', 'extends', 'final', 
    'finally( )*(?=\\{)', 'for(?=( )*\\()', 'function(?=( )\\w+)' , 
    'if(?= \\()', '^import(?= )', 
    '()+in()+', 'instanceof(?= )', 
    'let(?= +)', 'new(?= )', 
    'return(?= (\\w+);)', 
    'super', 'switch(?=( )*\\()', 
    'throw(?= )',
    'try(?=( )*\{)', 'typeof(?= )', 'var(?= +)', 
    'while(?=( )*\\()', 'with', 'yield '
],
// 'void' is special

kw = new RegExp(STATEMENTS.join('|'), 'gm'); 

let STYLES = {
    string1  : '<span class="st">',     //0
    string2  : '<span class="st">',     //1
    integers : '<span class="it">',     //2
    method   : '<span class="met">',    //3
    function : '<span class="fun">',    //4
    class    : '<span class="cl">',     //5
    variables: '<span class="vr">',     //6
    qoutes   : '<span class="quo">',    //7
    punc     : '<span class="pun">',    //8
    markup   : '<span class="mp">',
    tags     : '<span class="tg">',
    boolean  : '<span class="bl">',
    regexp   : '<span class="re">',
    escaped  : '<span class="esc">',
    attribute: '<span class="att">',
    keyword  : '<span class="kw">',
    selector : '<span class="sel">',
    comment  : '<span class="cm">',
    close    : '</span>'
};

function highlights() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.textContent;
    
    let matches = data.match(kw),
        marks = [];
    // mark all keywords
    for (let i = 0; i < matches.length; i++) {
        marks[i] = STYLES.keyword+matches[i]+STYLES.close;
    }
    console.log(matches);
    console.log(marks);
    let position = 0;
    for (let i = 0; i < matches.length; i++) {
        // let index = 0;
        if (data.includes(matches[i], position)) {
            data = data.replace(matches[i], marks[i]);
            position += marks[i].length+1;
            /*
            By this way, the next search start will be at the end of the 
            new element which's just replaced the old.
            The problem is, between this start and next start, there might be 
            many many the same words!
            Therefore, if next start still falls behind one of the same words,
            some will be marked at least twice!
            */
        }
    }
    // codeblock.innerHTML = ata;
    console.log(data);
}

//

let JSKEYWORDS = [
    'this'
];

let CONSTANTS = [
    'undefined',
    'null',
    'true',
    'false',
    'NaN',
    'Infinity'
],

cst = new RegExp(CONSTANTS.join('|'), 'mg');

let OPERATORS = [
    '=', 
    // Comparison
    '==', '===', '!=', '!==', '>', '<', '>=', '<=',

    // Arithmetic
    '+', '-', '*', '/', '%', '**', 
    
    // In-place
    '++', '--', '+=', '-=', '*=', '/=', '**=', '%=',

    // Logical
    '&&', '||', '!',

    // Others
    '?'
];

// let braces =[
//     '(', ')', 
//     '{', '}',
//     '[', ']'
// ];

// patterns
let PATTERNS = [
    /'(.*?)'/gm,                // 0 string1
    /"(.*)"/gm,                 // 1 string2
    /\d+(\.\d*)?/gm,            // 2 numbers
    /\.\w+/g,                   // 3 methods
    /function \w+/g,            // 4 funName
    /class \w+/g,               // 5 clsName 
    /(let|var|const) \w+/g,     // 6 varName 
    /\(|\)|\[|\]|\{|\}/g,       // 7 braces
    /,|\.|;/g                   // 8 separator
    // new RegExp(keywords.join('|'), 'i')
];

// let tok_regex = patterns.join('|');





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


