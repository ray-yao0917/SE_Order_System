var btns = document.getElementsByTagName('button');
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
      
        for (var i = 0; i < btns.length; i++) {
            btns[i].style.backgroundColor = '';
        }
     
        this.style.backgroundColor = 'green';
    }
}