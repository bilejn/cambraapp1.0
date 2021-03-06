$(function (){


	$.jStorage.set("init", true);
	
	
	
/* ==================== Determine how many times app has been executed ======================*/

	var openingTimes = $.jStorage.get("opening_times");
	if (openingTimes == null){
		openingTimes = 0;
	}else {
		openingTimes = openingTimes + 1;
	}
	$.jStorage.set("opening_times", openingTimes);

	
	
	
/* ================== DIAGNOSTIC OBJECTS INITIALIZATION ================== */	
	
	 if ($.jStorage.get("disease_indicators")== undefined){
		var diseaseIndicators = {
				id: "diseaseIndicators",
				publicName: "Disease indicators",
				text: "Presence of caries lesions <br />  according to last dental examination.",
				
				defined: false,
				count: "n/a"
		}
		$.jStorage.set("disease_indicators", diseaseIndicators);
	 }	

	 if ($.jStorage.get("risk_factors")== undefined){
		var riskFactors = {
				id: "riskFactors",
				publicName: "Risk factors",
				text: "Factors leading to new caries lesions <br /> according to last dental examination.",

				defined: false,
				count: "n/a"
		}
		$.jStorage.set("risk_factors", riskFactors);
	 }	
	
	 if ($.jStorage.get("protective_factors")== undefined){
		var protectiveFactors = {
				id: "protectiveFactors",
				publicName: "Protective factors",
				text: "Factors lowering risk for new caries lesions <br /> according to last dental examination.",

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

				result: "undefined",
				message: "Your current caries risk level is undefined. Visit your dentist to evaluate your caries risk level.",
				count: "undefined"
		}
		$.jStorage.set("risk_level", riskLevel);
	 } 
	 
 		$.jStorage.set("diagnostic", ["risk_level","disease_indicators","risk_factors","protective_factors"]);
	
	
	
	
	
/* ================== THERAPEUTIC OBJECTS INITIALIZATION ================== */
	
	
	var today = new XDate().toString("yyyy-MM-dd");
	if ($.jStorage.get("tracking_day")  == undefined){
		var trackingDay = "1976-04-01";
	} else {
		var trackingDay = $.jStorage.get("tracking_day");
	}
	
	
	
	if ($.jStorage.get("objects") == undefined){
		var snack = new Therapy("snack","Snack","Do not eat sugar containing food more than 3 times a day.",false,true,false,true,3,"all");
		$.jStorage.set("snack", snack);
		
		var brushing = new Therapy("brushing","Brushing","Brush your teeth two times daily (after breakfast and before bed).",true,true,false,true,2,"all");
		$.jStorage.set("brushing", brushing);
		
		var flossing = new Therapy("flossing","Flossing","Floss your teeth once daily before brushing.",true,true,false,true,1,"all");
		$.jStorage.set("flossing", flossing);
		
		$.jStorage.set("objects", ["snack","brushing","flossing"]);	
	}


	
	if ($.jStorage.get("customs") == undefined){	
		$.jStorage.set("customs", 0);
	}

		if ($.jStorage.get("custom_objects") == undefined){
		
		$.jStorage.set("custom_objects", []);	
	}
	



	
	/* ================== THERAPEUTIC OBJECTS UPDATE ================== */	

	
	var objects = $.jStorage.get("objects");
	
	for (var i = 0; i < objects.length; i++){
		model = $.jStorage.get(objects[i]);
		var todaysDate = new XDate();
		var nextMonth =  new XDate(model.nextMonth);
		if (todaysDate.diffDays(nextMonth) <= 0){
			model.nextMonth = nextMonth.addMonths(1,true).toString("yyyy-MM-dd");
			model.thisMonth = 0;
			if (model.monthly != "all"){
			model.today = 0;
			model.thisMonth = 0;
			model.last = new XDate().toString("yyyy-MM-dd");
			model.registration = [[new XDate().toString("yyyy-MM-dd"),0]];
			toDoCount(model.daily);
			}
		}
		
		if (model.monthly != "all"){
			if (model.monthly <= model.thisMonth){
				model.active = false;
			}else{
				model.active = true;
			}
		}
		

		if(model.last!=today && model.active){
			var today = new XDate().toString("yyyy-MM-dd");
			var last = new XDate(model.last);
			while (last.diffDays(today)>0){
				var newEntry = new XDate(last);
				last.addDays(1);
				var newEntry = new XDate(last).toString("yyyy-MM-dd");
				model.registration.push([newEntry,0]);
			}
			model.last = last.toString("yyyy-MM-dd");
		}

		
		$.jStorage.set(objects[i], model);

	}


	

	/* ================== TO DO LIST & COUNT & snack count RESET ================== */	
	
	
	if (today != trackingDay){
		var objects = $.jStorage.get("objects");
		for (var i = 0; i < objects.length; i++){
			model = $.jStorage.get(objects[i]);
			model.today = 0;
			$.jStorage.set(objects[i], model);			
		}
		toDoCount("reset");
		snackCount("reset");
	}
	
	/* ========== SETTINGS =============*/
	
	if ($.jStorage.get("brushigTimerToggle")==undefined){
			$.jStorage.set("brushigTimerToggle", "off");	
	}
	
	
	$.jStorage.set("tracking_day", today);
	$.jStorage.set("init", false);
});




 document.addEventListener("deviceready", function(){
 
 		/*==================== FIRST TIME AND RATING MESSAGES ========================*/
		
	var timesExecuted = $.jStorage.get("opening_times");
	
	if (timesExecuted == 0 || timesExecuted == null){
		var welcomeTitle = "New User";
		var welcomeMessage = "Please refer to info section to learn how to use IntacTooth app.";
		showAlert(welcomeTitle, emptyFunction, welcomeMessage, 'OK');
    }else if(timesExecuted != 0 && timesExecuted % 10 == 0){
		var ratingTitle = "Do You Like IntacTooth?";
		var ratingMessage = "If you have time, please rate our app.";
		var ratingCallback = goRate;
		var ratingButtons =  ['OK','Later'];
		showConfirm (ratingTitle, ratingCallback, ratingMessage, ratingButtons);
	}
	
	
 },true);



/*==================== REGISTRATION ========================*/

function registration (model){

	var today = new XDate().toString("yyyy-MM-dd");
	

	var model = $.jStorage.get(model);
	

	if (model.last == today){
		model.registration[model.registration.length - 1][1] = model.registration[model.registration.length - 1][1] + 1;
	} else {
		model.registration.push([today, 1]);
	}
	
	model.today = model.today + 1;
	if (model.specific == true && model.daily >= model.today){
		model.thisMonth = model.thisMonth + 1;
	}
	model.last = today;
	
	var sum = model.daily-model.today;
	if (model.therapy == true && sum >= 0){
		toDoCount(-1);
	}
	
	if (model.id == "snack"){
		snackCount(1);
	}
	
	var registrationTitle = model.publicName + " Registered";
	showAlert(registrationTitle, emptyFunction, model.text, 'OK');
	//alert (model.publicName+" registered. "+model.text);
	$.jStorage.set(model.id, model);

}





