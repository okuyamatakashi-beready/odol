/*-------------------------
    toggle 開閉
-------------------------*/
$('#toggle').on('click',function(){
	$(this).toggleClass('open');
	$("body").toggleClass('open');
});
$('#gnav__toggle').on('click',function(){
	$("#toggle").removeClass('open');
	$("body").removeClass('open');
});




/*-------------------------
    インクルード
-------------------------*/

document.addEventListener("DOMContentLoaded", function() {
    function includeHTML() {
        var z, i, elmnt, file, xhr;
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            file = elmnt.getAttribute("include-html");
            if (file) {
                xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            elmnt.innerHTML = this.responseText;
                        }
                        if (this.status == 404) {
                            elmnt.innerHTML = "Page not found.";
                        }
                        elmnt.removeAttribute("include-html");
                        includeHTML();
                    }
                }
                xhr.open("GET", file, true);
                xhr.send();
                return;
            }
        }
    }
    includeHTML();
});



/*-------------------------
    スムーススクロール
-------------------------*/
let lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


/*-------------------------
matchheight
-------------------------*/
$(function() {
	$('#toggle').matchHeight({
        target: $('.header__toggle--contact')
    });
});
$(function() {
	$('.note__inner').matchHeight();
});

/*-------------------------
    メインビジュアルスライダー
-------------------------*/
$(document).ready(function(){
    $('.mv__slider').slick({
        dots: false, // ドットナビゲーションを有効にする
        arrows: false,
        infinite: true, // 無限ループ
        speed: 1000, // スライドのスピード
        fade: true, // フェードを有効にする
        cssEase: 'linear', // フェードのCSS
        autoplay: true, // 自動再生を有効にする
        autoplaySpeed: 2000 // 自動再生のスピード
    });
});

/*-------------------------
    無限スライダー
-------------------------*/

$(document).ready(function() {
    $('#infinite__slider').infiniteslide({
        'speed': 100,
        'direction': 'left',
        'pauseonhover': false,
        'responsive': true,
        'clone': 100
    });
});



