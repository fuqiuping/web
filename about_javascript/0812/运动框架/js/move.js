function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

// 参数：元素 样式名 目标 回调
function move(obj, attr, target, callback) {
    clearInterval(obj.timer); // 先清
    obj.timer = setInterval(function () {
        var speed = parseInt(getStyle(obj, attr)); // 当前的位置
        var dir = speed < target ? 10 : -10; // 如果当前值比目标小，则加过去，否则减过去
        speed += dir; // 下一步应该运动到的位置

        if ((speed >= target && dir > 0) || (speed <= target && dir < 0)) {
            speed = target;
        }

        obj.style[attr] = speed + 'px'; // 再把位置赋给盒子

        // 清定时器，执行回调代码
        if (speed === target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}