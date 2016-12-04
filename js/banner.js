/**
 * Created by 82172 on 2016/10/30.
 */
$(document).ready(function () {
        /*---样式常量--*/
        var checkBgc = "RGBA(255, 0, 0, 0.6)";
        var unCheckBgc = "RGBA(100, 100, 100, 0.6)";
        var animatedTime = 800;
        var interval = 4000;
        /*--dom元素--*/
        var slider = $("#slider");
        var banner = $("#banner");
        var circle = $("#circle");
        var leftBtn = $("#left");
        var rightBtn = $("#right");
        /*--全局标记--*/
        var timer;
        var itemWidth = slider.width();
        //console.log(itemWidth);
        var currentPos = 0;
        var isAnimated = false;

        /*---左右点击--*/
        var itemHeight = slider.height();
        slider.children("span").css("top", itemHeight / 2 - leftBtn.height() / 2 + "px");
        leftBtn.click(function () {
            turnLeft();
        });
        rightBtn.click(function () {
            turnRight();
        });

        /*播放*/
        var dots = circle.children("span");
        var num = dots.length;
        for (var i = 0; i < num; i++) {
            dots[i].onclick = dotClick;
        }
        /*-自动播放--*/
        timer = setInterval(doAnim, interval);

        /*--函数---*/
        function dotClick() {
            clearInterval(timer);
            var position = parseInt(this.index);
            if (currentPos == position)return;
            dots[currentPos].style.backgroundColor = unCheckBgc;
            dots[position].style.backgroundColor = checkBgc;
            currentPos = position;
            banner.css("left", -(currentPos + 1) * itemWidth + "px");
            //banner.animate(
            //    {"left": -(1 + position) * itemWidth + "px"}
            //    , animatedTime
            //    , "swing"
            //    , function () {
            //        timer = setInterval(doAnim, interval);
            //    });
            timer = setInterval(doAnim, interval);
        }

        function doAnim() {
            dots[currentPos].style.backgroundColor = unCheckBgc;

            if (currentPos == num - 1) {
                currentPos = 0;
                dots[currentPos].style.backgroundColor = checkBgc;

                banner.animate(
                    {"left": -(1 + num) * itemWidth + "px"},
                    animatedTime,
                    "swing",
                    function () {
                        banner.css("left", -itemWidth + "px");
                    }
                );
            } else {
                currentPos++;
                dots[currentPos].style.backgroundColor = checkBgc;
                banner.animate(
                    {"left": -(currentPos + 1) * itemWidth + "px"},
                    animatedTime);
            }

        }

        function turnLeft() {
            if (isAnimated) return;
            isAnimated = true;
            clearInterval(timer);

            dots[currentPos].style.backgroundColor = unCheckBgc;

            if (currentPos == 0) {
                currentPos = num - 1;
                dots[currentPos].style.backgroundColor = checkBgc;

                banner.animate(
                    {"left": "0"},
                    animatedTime,
                    "swing",
                    function () {
                        banner.css("left", -num * itemWidth + "px");
                        isAnimated = false;
                        timer = setInterval(doAnim, interval);
                    }
                );
            } else {
                currentPos--;
                dots[currentPos].style.backgroundColor = checkBgc;
                banner.animate(
                    {"left": -(currentPos + 1) * itemWidth + "px"}
                    , animatedTime
                    , "swing"
                    , function () {
                        isAnimated = false;
                        timer = setInterval(doAnim, interval);
                    });
            }
        }

        function turnRight() {
            if (isAnimated) return;
            isAnimated = true;
            clearInterval(timer);

            dots[currentPos].style.backgroundColor = unCheckBgc;

            if (currentPos == num - 1) {
                currentPos = 0;
                dots[currentPos].style.backgroundColor = checkBgc;

                banner.animate(
                    {"left": -(1 + num) * itemWidth + "px"},
                    animatedTime,
                    "swing",
                    function () {
                        banner.css("left", -itemWidth + "px");
                        isAnimated = false;
                        timer = setInterval(doAnim, interval);
                    }
                );
            } else {
                currentPos++;
                dots[currentPos].style.backgroundColor = checkBgc;
                banner.animate(
                    {"left": -(currentPos + 1) * itemWidth + "px"}
                    , animatedTime
                    , "swing"
                    , function () {
                        isAnimated = false;
                        timer = setInterval(doAnim, interval);
                    });
            }
        }
    }
);

function addImageAndDot(imageList) {

    /*-----判断传进来的是不是数组-------*/
    if (!(imageList instanceof Array)) return;


    var slider = document.getElementById("slider");
    var itemWidth = slider.offsetWidth;

    var banner = slider.children[0];
    var circle = slider.children[1];
    /*----添加图片-----*/
    for (var i = 0; i < imageList.length; i++) {
        var li = document.createElement("li");
        var img = document.createElement("img");

        li.style.width = itemWidth + "px";
        img.src = imageList[i];
        li.appendChild(img);
        banner.appendChild(li);

    }
    /*----添加圆点------*/
    for (var j = 0; j < imageList.length - 2; j++) {
        var span = document.createElement("span");
        span.index = j;
        if (j == 0)
            span.style.backgroundColor = "RGBA(255, 0, 0, 0.6)";
        circle.appendChild(span);
    }

    banner.style.width = imageList.length * itemWidth + "px";
    banner.style.left = -itemWidth + "px";
    circle.style.left = itemWidth / 2 - circle.offsetWidth / 2 + "px";
};