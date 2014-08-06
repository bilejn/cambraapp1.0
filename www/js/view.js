
$(document).on("pagebeforeshow", "#home", function (){

	$("#place_holder").html('<img src="img/'+riskLevel.specificRisk+'.png" />');

	if ($.jStorage.get("active_therapy")){
		$("#other_registration_buttons").html("");
		var trackingButtons = $.jStorage.get("objects");
			var output = "";
			for (var i = 0; i < trackingButtons.length; i++){
			var model = $.jStorage.get(trackingButtons[i]);
			if (model.specific)
			output = output + '<a href="#" data-role="button" id="'+model.id+'_registration_button" data-theme="d" onclick="registration(\''+model.id+'\')">'+model.publicName+'</a>';
			}
	}
	
	$("#other_registration_buttons").html(output);
	
	var toDoCount = $.jStorage.get("to_do_count");
	$("#to_do_count span").html(" &nbsp "+toDoCount+" &nbsp ");
	if (toDoCount == 0) {
		$("#to_do_count span").addClass("green");
	} else {
		$("#to_do_count span").addClass("red");
	}
	
	var snackCount = $.jStorage.get("snack_count");
	$("#snack_count span").html(" &nbsp "+snackCount+" &nbsp ");
	if (snackCount <= 3) {
		$("#snack_count span").addClass("green");
	} else {
		$("#snack_count span").addClass("red");
	}

	
	
	$("#home").trigger("create");
});


$(document).on("pagebeforeshow", "#to_do", function (){

	var output = "";
	var objects = $.jStorage.get("objects");
	for (var i = 0; i < objects.length; i++){
		model = $.jStorage.get(objects[i]);
		if (model.therapy){
			var sum = model.daily - model.today; if (sum < 0) sum = 0;
			output = output + "<li>" + model.toDoText + ": " + sum + "</li>";
		}
	}

	$("#to_do_list").html(output).listview("refresh");


});



$(document).on("pagebeforeshow", "#current_therapy_info", function (){

	var output = "";
	var objects = $.jStorage.get("objects");
	for (var i = 0; i < objects.length; i++){
	
		model = $.jStorage.get(objects[i]);
		if (model.specific)
			output = output + "<li><h2>" + model.publicName + "</h2><p class='wrap'>" + model.text + "</p></li>";

	}

	$("#current_therapy_list").append(output).listview("refresh");


});

$(document).on("pagebeforeshow", "#current_status_info", function (){

	var output = "";
	var diagnostic = $.jStorage.get("diagnostic");
	for (var i = 0; i < diagnostic.length; i++){
		model = $.jStorage.get(diagnostic[i]);

			output = output + "<li><h2>" + model.publicName + ": <span class="+model.style+">" + model.present +"</span></h2><p class='wrap'>" + model.text + "</p></li>";

	}

	$("#current_status_list").html(output).listview("refresh");


});



/*================= EVENTS =================*/

$.jStorage.listenKeyChange("to_do_count", function(){
	if (!$.jStorage.get("init")){

		var toDoCount = $.jStorage.get("to_do_count");
		$("#to_do_count span").html(" &nbsp "+toDoCount+" &nbsp ");
		if (toDoCount > 0) {
			$("#to_do_count span").addClass("red");
		} else {
			$("#to_do_count span").removeClass("red");
			$("#to_do_count span").addClass("green");
		}
	$("#home").trigger("create");
	}
});

$.jStorage.listenKeyChange("snack_count", function(){
	if (!$.jStorage.get("init")){
		var snackCount = $.jStorage.get("snack_count");
		$("#snack_count span").html(" &nbsp "+snackCount+" &nbsp ");
		if (snackCount <= 3) {
			$("#snack_count span").addClass("green");
		} else {
			$("#snack_count span").removeClass("green");
			$("#snack_count span").addClass("red");
		}
	$("#home").trigger("create");
	}
});


