
// JavaScript Keywords
// Reserved keywords as of ECMAScript 2015
let STATEMENTS = [
    '^[ \t]*break( [\\w\\d]+)?;$', 'case ', 'catch ', 
    'class ', 'const ', '^[ \t]*continue;', 
    '^[ \t]*debugger;$', 'default', 'delete ', 'do', 
    'else( )*', 'enum', 'eval', 
    'export', 'extends', 'final', 
    'finally( )*(?=\\{)', 'for( )*(?=\\()', 'function (?=\\w+)' , 
    'goto', 'if( )*(?=\\()', 'implements', 'import ', 
    ' in ', 'instanceof ', 'interface', 
    'let ', 'new ', 
    'package', 'private', 'protected', 
    'return ', 'static', 
    'super', 'switch', 'this', 
    'throw ',
    'try( )*(?=\{)', 'typeof ', 'var ', 'void ', 
    'while( )*(?=\\()', 'with', 'yield '
],

kw = new RegExp(keywords.join('|'), 'gm'); 


let CONSTANTS = [
    'undefined',
    'null',
    'true',
    'false',
    'NaN',
    'Infinity'
],

cst = new RegExp(constants.join('|'), 'mg');

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
    
    let matches = {};
    for (let pattern of PATTERNS) {
        if (data.match(pattern)) {
            matches[PATTERNS.indexOf(pattern)] = data.match(pattern);
        }
    }
    
    for (let match in matches) { // must use obj[prop]; not obj.prop
        for (let i = 0; i < matches[match].length; i++) {
            matches[match][i] = STYLES[Object.keys(STYLES)[match*1]]+matches[match][i]+STYLES.close; // mark them all!
        }     
    }                  
    console.log(matches);
}                    
// keep a copy of the raw data;
// parse/analyze it as much as possible
// mark the recognized patterns/lexemes
// replace the original data lexeme by lexeme 

// data = data.replace(patterns.string1, styles.string+'&apos;$1&apos;'+styles.close);
// data = data.replace(patterns.numbers, styles.integers+'$1'+styles.close);
// codeblock.innerHTML = data;

// window.addEventListener("load", highlights);
// detect the language and hightlight
var lan = document.querySelector('.language').textContent;
if (lan=='js') {
    highlights();
}


