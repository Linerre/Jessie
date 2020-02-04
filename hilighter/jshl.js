// alert(code);

// detect the language
var lan = document.querySelector('.language').textContent;
if (lan=='js') {
    // highlight();
} else {
    // return undefined;
}

// JavaScript Keywords
keywords = [
    'abstract', 'arguments', 'await', 'boolean',
    'break', 'byte', 'case', 'catch', 
    'char', 'class', 'const', 'continue', 
    'debugger', 'default', 'delete', 'do', 
    'double', 'else', 'enum', 'eval', 
    'export', 'extends', 'false', 'final', 
    'finally', 'float', 'for', 'function', 
    'goto', 'if', 'implements', 'import', 
    'in', 'instanceof', 'int', 'interface', 
    'let', 'long', 'native', 'new', 
    'null', 'package', 'private', 'protected', 
    'public', 'return', 'short', 'static', 
    'super', 'switch', 'synchronized', 'this', 
    'throw', 'throws', 'transient', 'true', 
    'try', 'typeof', 'var', 'void', 
    'volatile', 'while', 'with', 'yield'
]

constants = [
    'undefined',
    'null',
    'true',
    'false'
]

operaters = [
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
]

braces =[
    '(', ')', 
    '{', '}',
    '[', ']'
]

patterns = {
    numbers: /[-+]?[0-9]+/g,
    strings: /'(.*?)'|"(.*?)"/g,
    methods: /.\w+/g,
    funName: /function \w+/g,
    clsName: /class \w+/g,
    varName: /(let|var|const) \w+/g,
    // whitesp: /[ \]
}



// function highlight(codeblock) {
//     // first, search for kw
//     for (let kw of keywords) {
//         if (codeblock.search(kw) {

//         }
//     }
// }