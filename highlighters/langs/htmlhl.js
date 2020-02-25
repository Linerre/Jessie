import {STYLES as st} from "./styles.js";

export let
// tag names: red + cyan
HTMLTAG = [
    // begining tag
    /(&lt;)([a-z]+)([\s\w"=]+)?(&gt;)/,

    //ending tag
    /(&lt;\/)([a-z]+)(&gt;)/
];


// values
// HTMLGREEN = /"([^"]+)"/;

export function highlight(data) {
    data = data.replace(new RegExp(HTMLTAG[0], 'g'), 
    st.CYAN+'$1'+st.CLOSE+
    st.RED+'$2'+st.CLOSE+
    '$3'+
    st.CYAN+'$4'+st.CLOSE);

    data = data.replace(new RegExp(HTMLTAG[1], 'g'),
    st.CYAN+'$1'+st.CLOSE+
    st.RED+'$2'+st.CLOSE+
    st.CYAN+'$3'+st.CLOSE);

    return data;
}

