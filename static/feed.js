var data=[];

var dataCount;
var showMax=10;
var onPage=1;
var pageCount;
var isPageBarReady=false;
var maxSearchResult=10;
var username="";


$(document).ready(function(){
    username = $.cookie("username");
    $.ajax({
        data: JSON.stringify({"username":username}),
        url:"getPostCount",
        type:"POST",
        dataType:"text",
        contentType:"application/json",
        timeout:60000,
        error: function () {alert("Communication error");},
        success: function (response) {
            var data = JSON.parse(response);
                if(data['error']) {
                    showErrorMsg(data['error']);//

                }else{
                    dataCount = data['count'];
                    //showPageBar();
                    getData();
                }
        }
    });
    /*
    $("#userDropdown").click(function(){
        if(!userDropDown){
            $("#userDropdown").addClass('nav-item dropdown show').removeClass('nav-item dropdown');
            $("#userDropDownMenu").attr("aria-expanded",true);
            userDropDown = true;
        }else{
            $("#userDropdown").addClass('nav-item dropdown').removeClass('nav-item dropdown show');
            $("#userDropDownMenu").attr("aria-expanded",false);
            userDropDown = false;
        }
    });*/


});


function getData(){
    var pageRequest = {
        "page": onPage,
        "max":showMax,
        "username":username
    };

    $.ajax(
        {
            url:"getPosts",
            type:"POST",
            data:JSON.stringify(pageRequest),
            contentType:"application/json",
            dataType:"text",
            timeout:60000,
            error: function (data) {alert("Communication failed!"+data);},
            success: function (result) {
                var dataDict = JSON.parse(result);
                if(dataDict["error"]){
                    showErrorMsg(dataDict["error"]);
                }else{
                    var feedList = $("#feed_list");
                    feedList.empty();
                    var dataList = dataDict["data"];
                    for(var id=0; id<dataList.length;id++){
                        var content = "<div class='apost'><div class=\"card\" style=\"width:275px\">\n" +
                            "    <img class=\"card-img-top\" src=\"data:image/png;base64, "+dataList[id]['img']+"\" alt=\"Card image\" style=\"width:100%\">\n" +
                            "    <div class=\"card-body\">\n" +
                            "      <h4 class=\"card-title\">"+dataList[id]['content_name']+"</h4>\n" +
                            "      <p class=\"card-text\">Uploaded By: "+dataList[id]['username']+"</p>\n" +
                            "      <p class=\"card-text\">Date Uploaded: "+dataList[id]['timest']+"</p>\n" +
                            "      <a href=\"#\" class=\"btn btn-primary\">See Profile</a>\n" +
                            "    </div>\n" +
                            "  </div></div>";
                        feedList.append(content);
                    }

                }
            }
        });
}

function showErrorMsg(msg){
    $(".msgbox").removeAttr("hidden");
    $("#msg").html("<strong>Oops! </strong>"+msg);
}

function showPageBar(){
    pageCount = Math.ceil(dataCount/showMax);
    for(var i=1;i<=pageCount;i++){
        var pageN='<li class=""><a href="#" id="'+i+'">'+" "+i+" "+'</a></li>';
        $('#page').append(pageN);
    }
}

function stripBase64Img(imgString){

}

function getPosts(){

}