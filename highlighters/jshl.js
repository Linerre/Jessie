let code = document.querySelector('code').innerHTML;
let re = /\/\/.*/g;
if (re.test(code)) {
document.querySelector('code').innerHTML= code.replace(re, '<span class="grey">'+'$&'+'</span>');
}