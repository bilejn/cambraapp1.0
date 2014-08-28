

/* =========================== H O M E =====================================*/


$(document).on("pagebeforeshow", "#home", function (){


		riskLevel=$.jStorage.get("risk_level");
		$("#place_holder").html('<img src="img/'+riskLevel.level+'.png" />');		
	
	
	if($.jStorage.get("next_appointment") != null){
		var nextAppointment = $.jStorage.get("next_appointment");
		$("#time span").html(nextAppointment);
	}

		$("#other_registration_buttons").html("");
		var objects = $.jStorage.get("objects");
			var output = "";
			for (var i = 0; i < objects.length; i++){
			var model = $.jStorage.get(objects[i]);
			if (model.specific && model.strict && model.active)
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



/* =========================== TO DO =====================================*/

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
			output = output + "<li>" + model.publicName + "</li>";
		}
	}
	
	$("#to_do_list").html(output).listview("refresh");


});



/* =========================== BRUSHING =====================================*/

$(document).on("pagebeforeshow", "#brushing", function (){

	if ($.jStorage.get("fluoride_paste_5000_th") == "true"){
		$("#tooth_paste").html("Use therapeutic toothpaste (5000ppmF) prescribed by your dentist.");
	} else {

		$("#tooth_paste").html("Use standard over-the-counter tooth paste (1100 - 1450 ppm F).");
	}
	$("#brushing").trigger("create");

});


/* =========================== CURRENT STATUS INFO =====================================*/


$(document).on("pagebeforeshow", "#current_status_info", function (){


		var output = "";
		var diagnostic = $.jStorage.get("diagnostic");
		for (var i = 0; i < diagnostic.length; i++){
			model = $.jStorage.get(diagnostic[i]);
			if (model.id = "riskLevel"){
				var overall;
				if (model.count == "low1" || model.count == "low2") model.count = "low";
				if (model.count == "high1" || model.count == "high2") model.count = "high";
			}
				output = output + "<li><h2>" + model.publicName + ": <span class=\"ui-li-count ui-btn-corner-all countBubl \">" + model.count +"</span></h2><p class='wrap'>" + model.text + "</p></li>";

		}

		$("#current_status_list").html(output).listview("refresh");

	
});


/* =========================== CURRENT THERAPY INFO =====================================*/

$(document).on("pagebeforeshow", "#current_therapy_info", function (){

	var output = "<li><h2>Dietary regimen</h2><p class=\"wrap\">No matter what your current caries risk level is, you should reduce eating sugar containing food as much as possible. At least keep frequency of eating it below three times a day (refer to info section).</p></li><li><h2>Keeping oral hygiene</h2><p class=\"wrap\">Brush your teeth two times daily - after breakfast and at bed time. Floss your teeth once daily after teeth brushing. Refer to info section to learn about correct technique and duration of teeth brushing and flossing.</p></li><li><h2>Regular dental visits</h2><p class=\"wrap\">You should regularly visit your dentist for recall exams.</p></li><li data-role=\"list-divider\" class=\"wrap\">Specific therapy prescribed by your dentist:</li>";
	var objects = $.jStorage.get("objects");
	for (var i = 0; i < objects.length; i++){
	
		model = $.jStorage.get(objects[i]);
		if (model.specific)
			output = output + "<li><h2>" + model.publicName + "</h2><p class='wrap'>" + model.text + "</p></li>";

	}

	$("#current_therapy_list").html(output).listview("refresh");
	



});



/* =========================== ADHERENCE INFO =====================================*/

$(document).on("pagebeforeshow", "#compliance", function (){

	var output = "";
	var objects = $.jStorage.get("objects");
	for (var i = 0; i < objects.length; i++){
	
		var model = $.jStorage.get(objects[i]);	
		if (model.strict){
			var result = adherence(model.id);
			output = output + "<li id='" +model.id + "_adherence'><a href='#' onclick=\"drawGraph('" + model.id + "')\"><h4>" + model.publicName + "</h4><p class='wrap'>Adherence: <span class='" + result.color + "'> " + result.text  + "</span></p></a> <a href='#'  onclick=\"refresh('" + model.id + "')\" data-icon='refresh'></a></li>";		
		}
	}	
	
	$("#adherence_list").html(output).listview("refresh");	
});

			
/* =================================== GENERAL DATA =========================================*/

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


/* =================================== DISEASE INDICATORS =========================================*/

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


/* =================================== RISK FACTORS =========================================*/

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




/* =================================== PROTECTIVE FACTORS =========================================*/




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




/* =================================== ANTIBACTERIALS =========================================*/


$(document).on("pagebeforeshow", "#antibacterials", function (){

	if ($.jStorage.get("chlorhexidine") != null){
		document.antibacterials_th.chlorhexidine_th.checked=true;
	}

	if ($.jStorage.get("xylitol") != null){
		document.antibacterials_th.xylitol_th.checked=true;
	}
	
		$("#antibacterials").trigger("create");
});	
	
	
	
	
/* =================================== FLUORIDE THERAPY =========================================*/


$(document).on("pagebeforeshow", "#fluoride", function (){

	if ($.jStorage.get("fluoride_paste_5000_th") == "true"){
		document.fluoride_th.fluoride_paste_5000_th.checked = true;
	}

	if ($.jStorage.get("fluoride_mouthrinse_th_once") != null){
		document.fluoride_th.fluoride_mouthrinse_th_once.checked=true;
	}

	if ($.jStorage.get("fluoride_mouthrinse_th_twice") != null){
		document.fluoride_th.fluoride_mouthrinse_th_twice.checked=true;
	}
	
	if ($.jStorage.get("fluoride_mouthrinse_extra_th") != null){
		document.fluoride_th.fluoride_mouthrinse_extra_th.checked=true;
	}
	
	if ($.jStorage.get("fluoride_mouthrinse_xerostomia_th") != null){
		document.fluoride_th.fluoride_mouthrinse_xerostomia_th.checked=true;
	}
	
		$("#fluoride").trigger("create");
});		
	
	
/* =================================== PH CONTROL THERAPY =========================================*/	
	
$(document).on("pagebeforeshow", "#ph_control", function (){	
	
	if ($.jStorage.get("ph_th") != null){
		document.ph_control.ph_th.checked=true;
	}	
	
	if ($.jStorage.get("phgum_th") != null){
		document.ph_control.phgum_th.checked=true;
	}
	
		$("#ph_control").trigger("create");
});		
	
	
	
/* =================================== CAP PASTE =========================================*/	
	
$(document).on("pagebeforeshow", "#cap_paste", function (){	
	
	if ($.jStorage.get("cap_th") != null){
		document.cap_paste.cap_th.checked=true;
	}	
	
	
		$("#cap_paste").trigger("create");
});		


/* =============================== 	CUSTOM prescriptions  ======================================= */

$(document).on("pagebeforeshow", "#custom_prescriptions", function (){

	var output = "";
	var objects = $.jStorage.get("custom_objects");
	for (var i = 0; i < objects.length; i++){
	
		var model = $.jStorage.get(objects[i]);
			output = output + "<li id='" +model.id + "_therapy'><a href='#' ><h4>" + model.publicName + "</h4><p class='wrap'>Directions: "+model.text+"</p><p>Daily: "+model.daily+" &nbsp &nbsp  &nbsp  &nbsp   Days in month: "+model.monthly+"</p></a> <a href='#'  onclick=\"removeCustomTh('" + model.id + "')\" data-icon='delete'></a></li>";		
	}	

	$("#custom_entries").html(output).listview("refresh");	
	
});	
	



/* =================================== GRAPH FOR EACH ADHERENCE REGISTRATION =========================================*/

$(document).on("pageshow", "#graph", function (){	

	var data = $.jStorage.get("chartData");
	var labels = $.jStorage.get("chartLabels");
	var limit = $.jStorage.get("chartLimit");
	var placeholder = $.jStorage.get("chartPlaceholder");
	var data = {
			labels: labels,
			datasets: [

				{
					label: "My First dataset",
					fillColor: "rgba(120,120,120,0)",
					strokeColor: "rgba(120,120,120,1)",
					pointColor: "rgba(120,120,120,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: data
				},
				{
					label: "limit",
					fillColor: "rgba(4,129,158,0)",
					strokeColor: "rgba(4,129,158,0.3)",
					pointColor: "rgba(4,129,158,0.3)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(4,129,158,0.3)",
					data: limit
				},
				{
					label: "placeholder",
					fillColor: "rgba(4,129,158,0)",
					strokeColor: "rgba(4,129,158,0)",
					pointColor: "rgba(4,129,158,0)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(4,129,158,0)",
					data: placeholder
				}
			]
		};	
    var graph = document.getElementById("myChart");
    graph.height = window.innerHeight/2;
	graph.width = window.innerWidth -40;
	var ctx = graph.getContext("2d");
	var myNewChart = new Chart(ctx).Line(data);
	$("#graph").trigger("create");
});	

$(document).on("pagebeforehide", "#graph", function (){	
			$.jStorage.set("chartLabels", []);
			$.jStorage.set("chartData", []);
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


	

	$( "#place_holder" ).bind( "click", function () {
	
	var message = $.jStorage.get("risk_level").message;
	
	alert( message);
	});
	
	
	
	$( "#time" ).bind( "click", function () {
	
	alert("Next dental visit.");
	
	});
	
	
	
	
	$( "#take_as_needed" ).change(function() {
		$("#times_daily").toggleClass("ui-disabled");
		$("#days_in_month").toggleClass("ui-disabled");
		$("#custom_entry").trigger("create");
	});

});


