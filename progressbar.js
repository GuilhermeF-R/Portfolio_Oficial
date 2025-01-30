window.onscroll = function() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPosition = window.scrollY;
    var progress = (scrollPosition / docHeight) * 100;
    
    document.querySelector('.progress-bar').style.width = progress + '%';
};
