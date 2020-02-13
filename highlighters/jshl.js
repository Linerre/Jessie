let code = document.querySelector('code').innerHTML;
let cutter = /.*<br>/g;
let lines = code.match(cutter);

let comment = /\/\/.*<br>/g;


for (let line of lines) {
    if (comment.test(line)) {
        document.querySelector('code').innerHTML= code.replace(comment, '<span class="grey">'+line+'</span>');
    } else continue;
}
