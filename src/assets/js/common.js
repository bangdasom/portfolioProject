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
});
