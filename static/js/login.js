$('#login-button').click(function (e) {
    var userName = document.getElementById("userName").value;
    var pwd = document.getElementById("pwd").value;

    e.preventDefault();
    $.ajax({
        url: '/api/v1/login',
        type: 'post',
        data: {'name': userName, 'pwd': pwd},
        success: function (json) {
            json = JSON.parse(json);
            if (json.state === 'success') {
                location.href = "setting";
            }
            else if (json.state === 'fail') {
                alert(json.reason);
            }
        }
    });
});
