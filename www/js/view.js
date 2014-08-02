
$(document).on("pagebeforeshow", "#home", function (){

	if ($.jStorage.get("active_therapy")){
		$("#other_registration_buttons").html("");
		var active_therapy = $.jStorage.get("active_therapy");
			var output = "";
			for (var i = 0; i < active_therapy.length; i++){
			output = output + '<a href="#" data-role="button" id="'+active_therapy[i].public_name+'_registration_button">'+active_therapy[i].public_name+'</a>';
			}
	}
	$("#other_registration_buttons").html(output);
	$("#home").trigger("create");
});