// JavaScript Keywords
let keywords = [
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
]; 

let constants = [
    'undefined',
    'null',
    'true',
    'false'
];

let operaters = [
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

let braces =[
    '(', ')', 
    '{', '}',
    '[', ']'
];

// patterns
let numbers = /([0-9]+)/gm,
    strings = /'(.*?)'|"(.*?)"/gm,
    methods = /.\w+/g,
    funName = /function \w+/g,
    clsName = /class \w+/g,
    varName = /(let|var|const) \w+/g;


let styles = {
    variables: '<span class="vr">',
    markup   : '<span class="mp">',
    tags     : '<span class="tg">',
    integers : '<span class="it">',
    boolean  : '<span class="bl">',
    class    : '<span class="cl">',
    string   : '<span class="st">',
    regexp   : '<span class="re">',
    escaped  : '<span class="esc">',
    qoutes   : '<span class="quo">',
    function : '<span class="fun">',
    attribute: '<span class="att">',
    method   : '<span class="met">',
    keyword  : '<span class="kw">',
    selector : '<span class="sel">',
    comment  : '<span class="cm">',
    close    : '</span>'
};

// alert(styles.comment);

function highlights() {
    let codeblock = document.querySelector('.code');
    let data = codeblock.innerHTML;
    data = data.replace(numbers, styles.integers+'$1'+styles.close);
    codeblock.innerHTML = data;
}
// window.addEventListener("load", highlights);
// detect the language and hightlight
var lan = document.querySelector('.language').textContent;
if (lan=='js') {
    highlights();
}


