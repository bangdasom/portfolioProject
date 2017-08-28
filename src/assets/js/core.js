/*
Modify: 2017.08.27
JS Core script
---------------------------------------
@Function Name
#Function Description
*/

//@Login Ajax Call
function login(){
    $(document).on('click', '#btn-login', function(e){
        var _id = $('#login-id').val(); //# auth ID (creativesomii)
        var _pw = $('#login-pw').val(); //#auth PW (qet13524)

        $.ajax({
            type : "POST",
            url : "http://192.168.219.117:8080/api/user/signin",
            dataType : "json",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                id: _id,
                password: _pw
            }),
            error : function(data){
                var _error = data.responseJSON.message;
                alert(_error);
            },
            success : function(data){
                if(data.result === 'OK'){
                    alert("로그인에 성공했습니다");
                    sessionStorage.setItem('auth', _id); //세션 값생성
                    window.location.href='main.html'; //#로그인 성공시 메인페이지 이동
                }
            }
        });
    });
}
//@Logout Btn
function loginChk (){
    var _chkSession = sessionStorage.getItem('auth');
    var _btnAppend = $('#header').children('div.logo_area');

    if(_chkSession !== null && _chkSession !== undefined && _chkSession !== '' ){
        _btnAppend.append('<div class="logout-btn"><button type="button" id="btn-logout" class="btn">logout</button></div>');
    } else {
        return false;
    }
}
//@Logout
function logout(){
    $(document).on('click', '#btn-logout', function(e){
        if(confirm('로그아웃 하시겠습니까?')){
            sessionStorage.removeItem('auth');
            window.location.reload();
        }
    });
}

$(document).ready(function(){
    login(); //@Login Ajax Call
    loginChk(); //@Logout Btn
    logout(); //@Logout

});