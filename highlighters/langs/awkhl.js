import {STYLES as st} from "./styles.js";

export let 
AWKBLUE = /awk/,

AWKORANGE = /(-|--)(\w+)/,

AWKCYAN = /-{1,2}(?=<span)/,

AWKMAGENTA = [
    /(=)(\w+)/, 

    /' (\b\w+\b )+/
],

AWKGREEN = /'[^']+'/;

export function highlight(data) {
    // awk
    data = data.replace(AWKBLUE, 
    st.BLUE+'$&'+st.CLOSE);

    // options alone
    data = data.replace(AWKORANGE, 
    '$1'+st.ORANGE+'$2'+st.CLOSE);

    // dash(es) before options
    data = data.replace(AWKCYAN, 
    st.CYAN+'$&'+st.CLOSE); 
    
    // var
    data = data.replace(AWKMAGENTA[0], 
        st.CYAN+'$1'+st.CLOSE+
        st.MAGENTA+'$2'+st.CLOSE); 

    data = data.replace(AWKMAGENTA[1], match=>{
        return match.slice(0,2)+st.MAGENTA+match.slice(2,)+st.CLOSE;
    });
        
    // body
    data = data.replace(AWKGREEN, 
    st.GREEN+'$&'+st.CLOSE);
        
    return data;
}

