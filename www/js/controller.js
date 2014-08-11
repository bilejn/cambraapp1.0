$(function (){
	$.jStorage.set("init", true);
	

/* ================== DIAGNOSTIC OBJECTS INITIALIZATION ================== */	
	
	 if ($.jStorage.get("disease_indicators")== undefined){
		var diseaseIndicators = {
				id: "diseaseIndicators",
				publicName: "Disease indicators",
				text: "Presence of caries lesions according to last dental examination.",
				
				defined: false,
				count: "n/a"
		}
		$.jStorage.set("disease_indicators", diseaseIndicators);
	 }	

	 if ($.jStorage.get("risk_factors")== undefined){
		var riskFactors = {
				id: "riskFactors",
				publicName: "Risk factors",
				text: "Factors leading to new caries lesions according to last dental examination.",

				defined: false,
				count: "n/a"
		}
		$.jStorage.set("risk_factors", riskFactors);
	 }	
	
	 if ($.jStorage.get("protective_factors")== undefined){
		var protectiveFactors = {
				id: "protectiveFactors",
				publicName: "Protective factors",
				text: "Factors lowering risk for new caries lesions according to last dental examination.",

				defined: false,				
				count: "n/a"
		}
		$.jStorage.set("protective_factors", protectiveFactors);
	 }
	 
	 if ($.jStorage.get("risk_level")== undefined){
		var riskLevel = {
				id: "riskLevel",
				publicName: "Caries risk level",
				text: "Likelihood of having <br />  new caries lesions <br /> in coming months or years.",

				level: "Undefined",
				count: "Undefined"
		}
		$.jStorage.set("risk_level", riskLevel);
	 } 
	 
 		$.jStorage.set("diagnostic", ["risk_level","disease_indicators","risk_factors","protective_factors"]);
	
	
/* ================== TRACKING OBJECTS INITIALIZATION ================== */
	
	
	var today = Date.today().toString("dd.MM.yyyy");
	var trackingDay = "31.07.2014";

	var objects = $.jStorage.get("objects");
	

	/* ================== TO DO LIST & COUNT ================== */	
	
	if (today != trackingDay){
		var toDoCount = 0;
		for (var i = 0; i < objects.length; i++){
			var model = $.jStorage.get(objects[i]);
				if (model.therapy && model.active && model.strict){
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


