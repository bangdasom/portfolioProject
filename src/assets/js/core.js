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
            url : "http://192.168.219.117:8080/api/auth/signin",
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
    var _chkSession = sessionStorage.getItem('auth'); //#세션id조회
    var _btnAppend = $('#header').children('div.logo_area'); //#로그아웃 버튼 생길 위치
    var _writeAppend = $('div.list_page'); //#글쓰기 버튼 생길 위치
    var _optBtnAppend = $('div.detail-area'); //#수정,삭제 버튼 생길 위치

    if(_chkSession !== null && _chkSession !== undefined && _chkSession !== '' ){
        _btnAppend.append('<div class="logout-btn"><button type="button" id="btn-logout" class="btn">logout</button></div>'); //#로그아웃버튼 생성
        _writeAppend.prepend('<div class="btn_area"><button type="button" id="btn-write" class="btn">Write</button></div>'); //#글쓰기버튼 생성
        _optBtnAppend.append('<div class="btn_wrap"><a href="#" id="btn-modify" class="btn">Modify</a> <a href="#" id="btn-del" class="btn">Del</a></div>'); //#수정,삭제버튼 생성
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
//@어드민일때 나오는 버튼(쓰기,수정,삭제)
function adminBtn(){
    //#글 쓰기
    $(document).on('click', '#btn-write', function(){
        window.location.href="write.html";//#글쓰기 페이지로 이동
    });
    //#글 삭제하기
    $(document).on('click', '#btn-del', function(){
        //#글 삭제
    });
    //#글 수정하기
    $(document).on('click', '#btn-modify', function(){
        //#글 수정
    });
}
//@Home 홈이동
function goHome(){
    $(document).on("click", 'div.logo > img', function(){
        window.location.href="main.html";//#홈으로 이동
    });
}

$(document).ready(function(){
    login(); //@Login Ajax Call
    loginChk(); //@Logout Btn
    logout(); //@Logout
    adminBtn(); //@어드민일때 나오는 버튼(쓰기,수정,삭제)
    goHome(); //@Home 홈이동
});