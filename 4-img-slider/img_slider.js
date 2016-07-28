/*
*     Created by Boyuan on 2016.7.28
*/

window.onload = (function () {
    var banner_container = document.getElementsByClassName('banners-container')[0];
    var next = document.getElementsByClassName('next')[0];
    var prev = document.getElementsByClassName('prev')[0];
    var small_dots = document.getElementsByClassName('buttons')[0].getElementsByTagName('span');  //小圆点标识

    slideImg(banner_container, next, prev, small_dots);
});


function slideImg(container, next, prev, small_dots) {
    var img_width = -parseInt(container.style.left);
    var moving = false;
    var timer = null;

    next.onclick = function () {
        if (!moving) {
            if (container.offsetLeft <= -3540)  //模拟无限滚动
            {
                container.style.left = 0 + "px";
            }
            startMove(container.offsetLeft - img_width);
        }
    };
    prev.onclick = function () {
        if (!moving)
            if (container.offsetLeft >= -1180) {
                container.style.left = -4720 + "px";
            }
        startMove(container.offsetLeft + img_width);
    };
    
    //移动原点
    for (var i = 0; i < small_dots.length; i++) {
        small_dots[i].onclick = function (temp) {
            return function () {
                if (!moving)
                    startMove((temp+1)*-1180);
            }
        }(i)
    }

    function startMove(target) {
        var speed = 0;

        showDot((target / -1180) - 1);        //  -1180 -2360 -3540

        clearInterval(timer); //解决重复点击的定时器叠加bug

        timer = setInterval(function () {
            speed = (target - container.offsetLeft) / 2;

            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (target == container.offsetLeft) {
                clearInterval(timer);
                moving = false;
            }
            else {
                container.style.left = container.offsetLeft + speed + "px";
                moving = true;
            }
        }, 30);
    }


    //点亮，熄灭小圆点
    function showDot(dot_index) {
        //熄灭过去圆点
        for (var i = 0; i < small_dots.length; i++) {
            if (small_dots[i].className == 'on') {
                small_dots[i].className = '';
                break;
            }
        }
        //点亮当前小圆点
        small_dots[dot_index].className = 'on';
    }
}
