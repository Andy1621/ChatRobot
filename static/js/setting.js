$('#submit-button').click(function (e) {
    var key = document.getElementById("key_content").value;

    if(key === '' || key ==='null'){
        alert("key不能为空！");
        return;
    }
    
    e.preventDefault();
    $.ajax({
        url: '/api/v1/submit',
        type: 'post',
        data: {'key': key},
        success: function () {
            location.href = "robot";
        }
    });
});


$('#get-button').click(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/api/v1/getMsg',
        type: 'get',
        success: function (json) {
            json = JSON.parse(json);
            $('#key').html('<input id="key_content" name="key" type="text" placeholder="' + json.key + '">');
            $('#key_content').val(json.key);
        }
    });
});
