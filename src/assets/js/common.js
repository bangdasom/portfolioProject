/*
Modify: 2017.08.27
JS UI script
---------------------------------------
@Function Name
#Function Description
*/

//@Login Input Focus
function inputFocus() {
    $(document).on('focusin focusout', '.login-area input', function(e){
        var _this = $(this);

        if(e.type === 'focusin'){
            _this.addClass('focus');
        } else if(e.type === 'focusout') {
            if(_this.val().length < 1){
                _this.removeClass('focus');
            }
        }
    });
}

$(document).ready(function(){
    /* 메뉴바 gnb */
    $(document).on("click", ".gnb>li>a", function(){
        $(this).closest("li").toggleClass("active");

        if($(this).closest("li").hasClass("active")){
            $(this).closest("li").siblings().removeClass("active").children("ul").css("height", "0");
            var lih = $(this).siblings("ul").children().length * 35;
            $(this).siblings("ul").css("height", lih + 'px');
        } else {
            $(this).closest("li").children("ul").css("height", "0");
        }
    });

    /* 메뉴바 토글버튼 */
    $(document).on("click", ".gnb_trigger", function(){
        $(this).toggleClass("active").siblings(".gnb").toggleClass("active");
    });

    inputFocus(); //@Login Input Focus
});