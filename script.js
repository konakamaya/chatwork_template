$(document).ready(function(){
	//ボタンの子要素を追加(select boxとボタン)
	var templates = localStorage;
	var selectbox = '<div class=\"cw_buttons cw_toggle template\"><select id=\"templates\" class=\"templates\" name=\"example\" > ';

	for(var i = 0 ;i < templates.length; i++){
		var key = templates.key(i);
		var value = JSON.parse(templates.getItem(key));
		selectbox += '<option value=\"'+key+'\">'+value.name+'</option> ';
	}
    selectbox += '</select><input id=\"insert\" type=\"button\" class=\"btn\" name=\"insert\" value=\"保存\"><input id=\"delete\" type=\"button\" class=\"btn\" name=\"delete\" value=\"削除\"><input id=\"use\" type=\"button\" class=\"btn\" name=\"use\" value=\"使用\"></div>';
	$(".toolbar").append(selectbox);

	//各ボタンを押した時の挙動(追加、削除)
	$("#insert").click(function(){
		var value = $("#cw_chattext").val();
		if(value == "ここにメッセージ内容を入力"){
			alert("メッセージを入力して下さい。");
			return;
		}
		var name = prompt("名前を入力して下さい。");
		var uniqueId = new UniqueId();
		var uid = uniqueId.create();
		if(name){
			localStorage.setItem(uid, JSON.stringify({"name": name, "message": value}));
		}else{
			return;
		}

		$('#templates').empty();
		var templates = localStorage;
		for(var i = 0 ;i < templates.length; i++){
			var key = templates.key(i);
			var value = JSON.parse(templates.getItem(key));
			var selectbox = '<option value=\"'+key+'\">'+value.name+'</option> ';
			$('#templates').append(selectbox);
		}		
	});

	$("#delete").click(function(){
		var name = $("#templates :selected").text();
		var key = $("#templates :selected").val();
		var isConfirmed = confirm(name + "を削除しますか？");
		if(isConfirmed){
			localStorage.removeItem(key);
		}else{
			return;
		}

		$('#templates').empty();
		var templates = localStorage;
		for(var i = 0 ;i < templates.length; i++){
			var key = templates.key(i);
			var value = JSON.parse(templates.getItem(key));
			var selectbox = '<option value=\"'+key+'\">'+value.name+'</option> ';
			$('#templates').append(selectbox);
		}

	});

	$('#use').click(function(){
		var key = $("#templates :selected").val();
		var value = JSON.parse(localStorage.getItem(key));
		var message = value.message;
		$('#cw_chattext').trigger("focus");
		var oldMessage = '';
		if($("#cw_chattext").val().length != 0){
			oldMessage = $("#cw_chattext").val() + "\n";
		}
		$("#cw_chattext").val(oldMessage + message);
	});
});

var UniqueId = function() {};
UniqueId.prototype = {
	create: function() {
		var randam = Math.floor(Math.random() * 1000);
		var date = new Date();
		var time = date.getTime();
		return time.toString()  + '_' + randam;
	}
};
