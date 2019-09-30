$(document).ready(function () {
    /*
     左侧 接收别人信息 调用，三个参数：leftBubble，头像路径，内容
     chat(element,imgSrc,doctextContent)
     */
    chat("leftBubble", "static/images/robot.png", "您好，我是聊天机器人小A~~");


    $(".send-btn").click(function (e) {
        /*
         右侧 发送自己的信息 调用，三个参数：rightBubble，头像路径，内容
         chat(element,imgSrc,doctextContent)
         */
        var info = $('.chat-info').html();

        chat("rightBubble", "static/images/me.png", info);

        //调用图灵机器人
        e.preventDefault();
        $.ajax({
            url: '/api/v1/ask',
            type: 'get',
            data: {'info': info},
            success: function (json) {
                json = JSON.parse(json);
                chat("leftBubble", "static/images/robot.png", json.text);
            }
        });

        //清空输入框
        $('.chat-info').html('');

    })
});

function chat(element, imgSrc, textContent) {
    var $user = element;
    //获取容器
    var $box = $('.bubbleDiv');
    //机器人
    if ($user === "leftBubble") {
        $box.append(createRobot(imgSrc, textContent)).animate({scrollTop: $(document).height()}, 300);
    }
    //我
    else if ($user === "rightBubble") {
        $box.append(createMe(imgSrc, textContent)).animate({scrollTop: $(document).height()}, 300);
    } else {
        console.log("请传入必须的参数");
    }

}

function createRobot(imgSrc, textContent) {
    var block;
    if (textContent == '' || textContent == 'null') {
        alert('有什么想和我说的嘛~');
        return;
    }
    block = '<div class="bubbleItem">' +
        '<div class="left-head">' +
        '<img src="' + imgSrc + '" alt="robot"/>' +
        '</div>' +
        '<span class="bubble leftBubble">' + textContent + '<span class="topLevel"></span></span>' +
        '</div>';

    return block;
}

function createMe(imgSrc, textContent) {
    var block;
    if (textContent == '' || textContent == 'null') {
        alert('亲！别太着急，先说点什么～');
        return;
    }
    block = '<div class="bubbleItem clearfix">' +
        '<div class="right-head">' +
        '<img src="' + imgSrc + '" alt="me"/>' +
        '</div>' +
        '<span class="bubble rightBubble">' + textContent + '<span class="topLevel"></span></span>' +
        '</div>';

    return block;
}
