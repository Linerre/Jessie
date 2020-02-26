import {STYLES as st} from "./styles.js";

export let

// indent 20 * n (n >= 1) px
INDENT = [
    // to avoid indebting ...Header 3</h2>
    /1(?!&lt;\/)(?=&lt;)/,
    /2(?!&lt;\/)(?=&lt;)/,
    /3(?!&lt;\/)(?=&lt;)/,

    // but also include 3</footer>
    /1#(?=&lt;\/)/,
    /2#(?=&lt;\/)/,
    /3#(?=&lt;\/)/,
],

// tag names: red + cyan
HTMLTAG = [
    // begining tag
    /(&lt;)([a-z0-6]+)([\s\w"=<>/]+)?(&gt;)/,

    //ending tag
    /(&lt;\/)([a-z0-6]+)(&gt;)/
],


// attributes and values
HTMLVALUE = /([a-z]+)(=")([^"]+)?(")/g;

export function highlight(data) {
    // attri & value
    data = data.replace(HTMLVALUE, 
    st.MAGENTA+'$1'+st.CLOSE+
    st.CYAN+'$2'+st.CLOSE+
    st.GREEN+'$3'+st.CLOSE+
    st.CYAN+'$4'+st.CLOSE);

    // indent
    // replace 1 to <span class="indent1"> and so on
    data = data.replace(new RegExp(INDENT[0], 'g'), st.INDENT1);
    data = data.replace(new RegExp(INDENT[1], 'g'), st.INDENT2);
    data = data.replace(new RegExp(INDENT[2], 'g'), st.INDENT3);

    // replace 1</h1> to <span class="indent1">
    data = data.replace(new RegExp(INDENT[3], 'g'), st.INDENT1);
    data = data.replace(new RegExp(INDENT[4], 'g'), st.INDENT2);
    data = data.replace(new RegExp(INDENT[5], 'g'), st.INDENT3);



    // replace 1\n to </span>
    data = data.replace(/1(?=\n)/g, st.CLOSE);
    data = data.replace(/2(?=\n)/g, st.CLOSE);
    data = data.replace(/3(?=\n)/g, st.CLOSE);

    // begining tag
    data = data.replace(new RegExp(HTMLTAG[0], 'g'), 
    st.CYAN+'$1'+st.CLOSE+
    st.RED+'$2'+st.CLOSE+
    '$3'+
    st.CYAN+'$4'+st.CLOSE);

    // ending tag
    data = data.replace(new RegExp(HTMLTAG[1], 'gm'),
    st.CYAN+'$1'+st.CLOSE+
    st.RED+'$2'+st.CLOSE+
    st.CYAN+'$3'+st.CLOSE);


    return data;
}

