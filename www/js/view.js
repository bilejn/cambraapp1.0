
$(document).on("pagebeforeshow", "#home", function (){

	if ($.jStorage.get("risk_level").level == "undefined"){
		$("#place_holder").html('<img src="img/undefined.png" />');	
	} else {
		riskLevel=$.jStorage.get("risk_level");
		$("#place_holder").html('<img src="img/'+riskLevel.level+'.png" />');		
	}
	
	if($.jStorage.get("next_appointment") != null){
		var nextAppointment = $.jStorage.get("next_appointment");
		$("#time span").html(nextAppointment);
	}

		$("#other_registration_buttons").html("");
		var objects = $.jStorage.get("objects");
			var output = "";
			for (var i = 0; i < objects.length; i++){
			var model = $.jStorage.get(objects[i]);
			if (model.specific && model.strict)
			output = output + '<a href="#" data-role="button" id="'+model.id+'_registration_button" data-theme="d" onclick="registration(\''+model.id+'\')">'+model.publicName+'</a>';
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

	var output = "<li data-role=\"list divider\"  data-theme=\"b\">Daily:</li>";
	var objects = $.jStorage.get("objects");
	for (var i = 0; i < objects.length; i++){
		model = $.jStorage.get(objects[i]);
		if (model.therapy && model.strict && model.active){
			var sum = model.daily - model.today; if (sum < 0) sum = 0;
			output = output + "<li>" + model.publicName + ": <span class=\"ui-li-count ui-btn-corner-all countBubl \">" + sum + "</span></li>";
		}
	}
	
	output = output + "<li data-role=\"list divider\"  data-theme=\"b\">As needed:</li>";
			
	for (var i = 0; i < objects.length; i++){
		model = $.jStorage.get(objects[i]);
		if (model.therapy && !model.strict && model.active){
			var sum = model.daily - model.today; if (sum < 0) sum = 0;
			output = output + "<li>" + model.toDoText + "</li>";
		}
	}
	
	$("#to_do_list").html(output).listview("refresh");


});



$(document).on("pagebeforeshow", "#current_therapy_info", function (){

	var output = "<li><h2>Dietary regimen</h2><p class=\"wrap\">No matter what your current caries risk level is, you should reduce eating sugar containing food as much as possible. At least keep frequency of eating it below three times a day (refer to info section).</p></li><li><h2>Keeping oral hygiene</h2><p class=\"wrap\">Brush your teeth two times daily - after breakfast and at bed time. Floss your teeth once daily after teeth brushing. Refer to info section to learn about correct technique and duration of teeth brushing and flossing.</p></li><li><h2>Regular dental visits</h2><p class=\"wrap\">You should regularly visit your dentist for recall exams.</p></li><li data-role=\"list-divider\" class=\"wrap\">Specific therapy prescribed by your dentist:</li>";
	var objects = $.jStorage.get("objects");
	for (var i = 0; i < objects.length; i++){
	
		model = $.jStorage.get(objects[i]);
		if (model.specific)
			output = output + "<li><h2>" + model.publicName + "</h2><p class='wrap'>" + model.text + "</p></li>";

	}

	$("#current_therapy_list").html(output).listview("refresh");;
	



});

$(document).on("pagebeforeshow", "#current_status_info", function (){


		var output = "";
		var diagnostic = $.jStorage.get("diagnostic");
		for (var i = 0; i < diagnostic.length; i++){
			model = $.jStorage.get(diagnostic[i]);

				output = output + "<li><h2>" + model.publicName + ": <span class=\"ui-li-count ui-btn-corner-all countBubl \">" + model.count +"</span></h2><p class='wrap'>" + model.text + "</p></li>";

		}

		$("#current_status_list").html(output).listview("refresh");

	
});


/* ================== FORMS ==================*/

$(document).on("pagebeforeshow", "#general_data", function (){

	if ($.jStorage.get("general_data") != null){
	
		var generalData = $.jStorage.get("general_data");
		document.generalData.first_name.value = generalData.firstName;
		document.generalData.last_name.value = generalData.lastName;	
		document.generalData.gender.value = generalData.gender;
		document.generalData.birthday.value = generalData.age;
		$("#general_data").trigger("create");
	}

});


$(document).on("pagebeforeshow", "#disease_indicators", function (){

	if ($.jStorage.get("disease_indicators") != null){
	
		var diseaseIndicators = $.jStorage.get("disease_indicators");
		document.diseaseIndicators.visible_cavities.checked = diseaseIndicators.visibleCavities;
		document.diseaseIndicators.radiographic.checked = diseaseIndicators.radiographic;	
		document.diseaseIndicators.white_spots.checked = diseaseIndicators.whiteSpots;
		document.diseaseIndicators.last_3_years.checked = diseaseIndicators.last3y;
		
		$("#disease_indicators").trigger("create");
	}

});


$(document).on("pagebeforeshow", "#risk_factors", function (){

	if ($.jStorage.get("risk_factors") != null){
	
		var riskFactors = $.jStorage.get("risk_factors");
		document.riskFactors.ms_lb.checked = riskFactors.msLb;
		document.riskFactors.visible_plaque.checked = riskFactors.visiblePlaque;
		document.riskFactors.frequent_snack.checked = riskFactors.frequentSnack;
		document.riskFactors.pits_and_fissures.checked = riskFactors.pitsAndFissures;
		document.riskFactors.drug_use.checked = riskFactors.drugUse;
		document.riskFactors.inadequate_saliva.checked = riskFactors.inadequateSaliva;
		document.riskFactors.saliva_reducing_factors.checked = riskFactors.salivaReducingFactors;
		document.riskFactors.exposed_roots.checked = riskFactors.exposedRoots;
		document.riskFactors.orthodontic_appliances.checked = riskFactors.orthodonticAppliances;

		$("#risk_factors").trigger("create");
	}

});

$(document).on("pagebeforeshow", "#protective_factors", function (){

	if ($.jStorage.get("protective_factors") != null){
		
		var protectiveFactors = $.jStorage.get("protective_factors");
		document.protectiveFactors.fluoridated_community.checked = protectiveFactors.fluoridatedCommunity;
		document.protectiveFactors.fluoride_paste_once.checked = protectiveFactors.fluoridePasteOnce;
		document.protectiveFactors.fluoride_paste_twice.checked = protectiveFactors.fluoridePasteTwice;
		document.protectiveFactors.fluoride_mouthrinse.checked = protectiveFactors.fluorideMouthrinse;
		document.protectiveFactors.fluoride_5000.checked = protectiveFactors.fluoridePasteHighF;
		document.protectiveFactors.fluoride_varnish.checked = protectiveFactors.fluorideVarnish;
		document.protectiveFactors.topical_fluoride.checked = protectiveFactors.fluorideTopical;
		document.protectiveFactors.chlorhexidine.checked = protectiveFactors.chlorhexidine;
		document.protectiveFactors.xylitol.checked = protectiveFactors.xylitol;
		document.protectiveFactors.tooth_mousse.checked = protectiveFactors.cap;
		document.protectiveFactors.adequate_saliva.checked = protectiveFactors.adequateSaliva;

		$("#protective_factors").trigger("create");
	}

});







/*================= EVENTS =================*/
$(function(){

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



	$( "#place_holder" ).bind( "tap", function () {
	
	var message = $.jStorage.get("risk_level").message;
	
	alert( message);
	});
	
	
	
  
	
	
});


