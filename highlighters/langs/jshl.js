import {STYLES as st} from "./styles.js";

export let 
// Comments, Invisibles, Line Highlighting: base03
// #1 mark up this
JSGREY = [
    /\/\/[^\/]*<br>/gm //consider using # to help
],

// Strings: base0B: JSgreen
JSGREEN = [
    // String Double
    // replace this first to avoid class="xxx" trouble
    /"([^"]*)"/,

    // String Single
    // Not allow 'My name is "Peter"!'
    /'([^'"]*)'/
],

// Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
// A few speical words: base08:red + italic
JSRED = [
    /\bthis\b(?=(\.\w+)?)/,
    /\barguments/,
    /\bsuper/
],
// Integers and Boolean values: base09: orange
JSORANGE = [
    // use # to assist
    /(\d+)#/,

    /true|false|undefined|null|NaN|Infinity/,

],

// Re, punctuations, etc: base0C: cyan
// To make things easier, let's use #
JSCYAN = [
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
    /([\(\)\{\}\[\]])#/,

    // 5 +-*/%?!:    using # to assist
    /([-&%\+\*\/\.,!@\^:\?\\]{1,2})#/,

    // 6 boolean operator || 
    / \|\| /,

    // 7 boolean operator &&
    / &amp;&amp; /,

    // 8 new and in
    /\bnew\b(?= +\w+)|\bin\b(?= +\w+)|\binstanceof\b(?= +\w+)/,

    // 9 regualr expressions consider using #
    /(\/(?!span>)[^\/]+\/)([gmiyu]+)/

],

// Keywords, Storage, Selector, Markup Italic, Diff Changed: base0E
// Reserved keywords as of ECMAScript 2015
JSMAGENTA = [
    /break/, /\bcase\b(?= )/, 
    
    /\bcatch\b(?= *)/, 

    /\bclass\b(?= +)/, /\bconst\b(?= +)/, /\bcontinue(?=;)/, 

    /\bdebugger;/, /\bdefault(?=:)/, /delete(?= +)/, 

    /\bdo(?= +\{)/, /else(?= +)/,  /export /, 

    /\bextends\b(?= *)/, /\bfinally\b(?= *)/, 

    /\bfor(?= *<span)/, /\bfunction\b(?= +)/,

    /\bif(?= *)/, /import(?= +)/, 

    /\blet(?= +)/, 

    /\breturn(?= *<span)/, /\bswitch(?= *)/, 

    /\bthrow(?= *)/, /\btry(?= *)/, 
        
    /\btypeof(?= +)/, /\bvar(?= +)/, 

    /\bwhile(?= *)/, /\byield#(?= +)/, // consider using # to assist

],

// Classes: base0A: yellow + bold;
JSYELLOW = [
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
JSBLUE = [
    // method and function name
    // <span class="cyan">\.<\/span>
    /[a-z][a-zA-Z0-9]+(?= *<span class="cyan">\()/,
];


export function highlight(data) {
// ============== highlight string
// stringD
    data = data.replace(new RegExp(JSGREEN[0], 'g'), 
        st.CYAN+'"'+st.CLOSE+
        st.GREEN+'$1'+st.CLOSE+
        st.CYAN+'"'+st.CLOSE);
    // stringS
    data = data.replace(new RegExp(JSGREEN[1], 'g'), 
        st.CYAN+'\''+st.CLOSE+
        st.GREEN+'$1'+st.CLOSE+
        st.CYAN+'\''+st.CLOSE);

    // =============== highlight conmment
    data = data.replace(JSGREY[0], (match)=>{
        return st.GREY+match.slice(0, -4)+st.CLOSE});

    // =============== highlight Operators
    data = data.replace(new RegExp(JSCYAN[0], 'g'), '$1'+'$2'+
        st.CYAN+
        '$3'+
        st.CLOSE);

        // ;
    data = data.replace(new RegExp(JSCYAN[1], 'g'), st.CYAN+
        '$&'+
        st.CLOSE);

    // >=|<=|>|<
    data = data.replace(new RegExp(JSCYAN[2], 'g'), st.CYAN+
        '$&'+
        st.CLOSE);

    // =|+=|-=|*=|/=|%=|==|===|!=|!==
    data = data.replace(new RegExp(JSCYAN[3], 'g'), st.CYAN+
        '$1'+
        st.CLOSE);

    // braces
    data = data.replace(new RegExp(JSCYAN[4], 'g'), st.CYAN+
        '$1'+
        st.CLOSE);

    // 5 +-*/%?!:
    data = data.replace(new RegExp(JSCYAN[5], 'g'), st.CYAN+
        '$1'+
        st.CLOSE);

    // boolean operator ||
    data = data.replace(new RegExp(JSCYAN[6], 'g'), st.CYAN+
        '$&'+
        st.CLOSE);

    // boolean operator ||
    data = data.replace(new RegExp(JSCYAN[7], 'g'), st.CYAN+
        '$&'+
        st.CLOSE);

    // new, in, instanceof
    data = data.replace(new RegExp(JSCYAN[8], 'g'), st.CYAN+
        '$&'+
        st.CLOSE);
    
    data = data.replace(new RegExp(JSCYAN[9], 'g'), st.CYAN+
        '$1'+
        st.CLOSE+
        st.MAGENTA+'$2'+st.CLOSE);

    // ================ highlight keywords
    for (let pattern of JSMAGENTA) {
        if (pattern.test(data)) {
            data = data.replace(new RegExp(pattern, 'g'), st.MAGENTA+
            '$&'+st.CLOSE);
        } else continue;
    }

    // ================= highlight Objects
    for (let pattern of JSYELLOW) {
        if (pattern.test(data)) {
            data = data.replace(new RegExp(pattern, 'g'), st.YELLOW+
            '$&'+st.CLOSE);
        } else continue;
    }

    // ================= highlight methods
    for (let pattern of JSBLUE) {
        if (pattern.test(data)) {
            data = data.replace(new RegExp(pattern, 'g'), 
            st.BLUE+'$&'+st.CLOSE)
        } else continue;
    }

    // ================= highlight numbers, boolean values
    data = data.replace(new RegExp(JSORANGE[0], 'g'), st.ORANGE+
        '$1'+
        st.CLOSE); 

    data = data.replace(new RegExp(JSORANGE[1], 'g'), st.ORANGE+
        '$&'+
        st.CLOSE);

    return data;
}

export function addLineNumber(data) {
    let re = /.+\n/g;
    let newCommand = '';
    let lines = data.match(re);
    // console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        lines[i] = st.GREY+String(i+1)+st.CLOSE + lines[i];
        newCommand += lines[i];
    }
    return newCommand;
}