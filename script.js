$(document).ready(function(){
	//ボタンの子要素を追加(select boxとボタン)
	$(".toolbar").append('<div class=\"cw_buttons cw_toggle template\"><select name=\"example\"><option value=\"サンプル1\">サンプル1</option><option value=\"サンプル2\">サンプル2</option><option value=\"サンプル3\">サンプル3</option></select><input type=\"button\" class=\"btn\" name=\"insert\" value=\"保存\"></button></div>');
	//各ボタンを押した時の挙動(追加、削除)
});
