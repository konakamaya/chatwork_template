$(document).ready(function(){
    // select boxとボタンを追加
    var selectbox = '<div class=\"cw_buttons cw_toggle template\"> ';
    selectbox += '<select id=\"templates\" class=\"templates\" name=\"example\" ></select>';
    selectbox += '<input type=\"button\" id=\"insert\"  class=\"btn\" name=\"insert\" value=\"保存\">';
    selectbox += '<input type=\"button\" id=\"delete\" class=\"btn\" name=\"delete\" value=\"削除\">';
    selectbox += '<input type=\"button\" id=\"use\" class=\"btn\" name=\"use\" value=\"使用\">';
    selectbox += '</div>';
    $(".toolbar").append(selectbox);

    selectBoxRebuild();

    // 保存ボタンを押した時の挙動
    $("#insert").click(function(){
        var message = $("#cw_chattext").val();
		if(message === "ここにメッセージ内容を入力"){
            alert("メッセージを入力して下さい。");
            return;
        }
        var name = prompt("名前を入力して下さい。");

        if(name){
            setMessage(name, message);
        }else{
            return;
        }

        selectBoxRebuild();

    });

    // 削除ボタンを押した時の挙動
    $("#delete").click(function(){
        var name = $("#templates :selected").text();
        var key = $("#templates :selected").val();
        if(name){
            if(confirm(name + "を削除しますか？")){
                localStorage.removeItem(key);
            }else{
                return;
            }
        }


        selectBoxRebuild();

    });

    // 使用ボタンを押した時の挙動
    $('#use').click(function(){
        var key = $("#templates :selected").val();
        var message = getMessage(key);    
        $('#cw_chattext').trigger("focus");
        var oldMessage = '';
        if($("#cw_chattext").val().length !== 0){
            oldMessage = $("#cw_chattext").val() + "\n";
        }
        $("#cw_chattext").val(oldMessage + message);
    });

    //ローカルストレージにメッセージを登録する。
    function setMessage(name, message){
        // ユニークIDを生成する。
        var uniqueId = new UniqueId();
        var uid = uniqueId.create();

        // localStorageにレコードを追加する。
        localStorage.setItem(uid, JSON.stringify({"name": name, "message": message}));
    }

    //ローカルストレージからkeyを指定してメッセージを取得する。
    function getMessage(key){
        var value = localStorage.getItem(key);
        var item = JSON.parse(value);
        var message = item.message;
        return message;
    }


    // ローカルストレージから登録済みの全てのメッセージを取得して
    // optionタグを再構築するfunction
    function selectBoxRebuild(){
        $('#templates').empty();
        var templates = localStorage;
        for(var i = 0 ;i < templates.length; i++){
            var key = templates.key(i);
            var value = JSON.parse(templates.getItem(key));
            var selectbox = '<option value=\"'+key+'\">'+value.name+'</option> ';
            $('#templates').append(selectbox);
        }
    }
});

//  ユニークIDを生成するfunction
var UniqueId = function() {};
UniqueId.prototype = {
    create: function() {
        var randam = Math.floor(Math.random() * 1000);
        var date = new Date();
        var time = date.getTime();
        return time.toString()  + '_' + randam;
    }
};
