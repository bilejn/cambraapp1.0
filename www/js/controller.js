$(function (){
	$.jStorage.set("init", true);
	
	
	
	
	var riskLevel = new RiskLevel();
	$.jStorage.set("risk_level", riskLevel);
	
	
	var today = Date.today().toString("dd.MM.yyyy");
	var trackingDay = "31.07.2014";

	var objects = $.jStorage.get("objects");
	

	/* ================== TO DO LIST & COUNT ================== */	
	
	if (today != trackingDay){
		var toDoCount = 0;
		for (var i = 0; i < objects.length; i++){
			var model = $.jStorage.get(objects[i]);
				if (model.therapy && model.active){
				toDoCount = toDoCount + model.daily;
				}
		}
		$.jStorage.set("to_do_count", toDoCount);
	}
	
	
	
	/* ================== SNACK ================== */	
	
	if (today != trackingDay){
		var snack = 0;
			$.jStorage.set("snack_count", snack);
	}
	
	
	$.jStorage.set("tracking_day", today);
	$.jStorage.set("init", false);
});



function registration (model){

	var today = Date.today().toString("dd.MM.yyyy");
	

	var model = $.jStorage.get(model);
	
	if (model.last == today){
		model.registration[model.registration.length - 1][1] = model.registration[model.registration.length - 1][1] + 1;
	} else {
		model.registration.push([today, 1]);
	}
	
	model.today = model.today + 1;
	model.last = today;
	
	var sum = model.daily-model.today;
	if (model.therapy == true && sum >= 0){
		var toDoCount = $.jStorage.get("to_do_count");
		toDoCount = toDoCount -1;
		$.jStorage.set("to_do_count", toDoCount);
	}
	
	if (model.id == "snack"){
		var snackCount = $.jStorage.get("snack_count");
		snackCount = snackCount + 1;
		$.jStorage.set("snack_count", snackCount);
	}
	
	
	alert (model.alertMessage);
	$.jStorage.set("model", model);

}


