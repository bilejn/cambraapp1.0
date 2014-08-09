
	
	
	function generalForm() {

			var firstName = document.generalData.first_name.value;
			var lastName = document.generalData.last_name.value;	
			var age = document.generalData.yearpicker.value;			
			var gender = document.generalData.gender.value;

			var generalData = new GeneralData(firstName,lastName,gender,age);
			$.jStorage.set("general_data",generalData);
		
		alert("submitted");
		$.mobile.changePage( "#general_data", { allowSamePageTransition: true } );
		return false;
	}
	
	
	function fDiseaseIndicators() {
	
			var visibleCavities = document.diseaseIndicators.visible_cavities.checked;
			var radiographic = document.diseaseIndicators.radiographic.checked;
			var whiteSpots = document.diseaseIndicators.white_spots.checked;
			var last3y = document.diseaseIndicators.last_3_years.checked;
			
			var diseaseIndicators = new DiseaseIndicators(visibleCavities,radiographic,whiteSpots,last3y);
			$.jStorage.set("disease_indicators",diseaseIndicators);		

		alert("submitted");
		var riskLevel = new RiskLevel();
		$.jStorage.set("risk_level", riskLevel);		
		$.mobile.changePage( "#disease_indicators", { allowSamePageTransition: true } );
		return false;
	}
	
	
	function fRiskFactors() {
		
			var msLb = document.riskFactors.ms_lb.checked;
			var visiblePlaque = document.riskFactors.visible_plaque.checked;
			var frequentSnack = document.riskFactors.frequent_snack.checked;
			var pitsAndFissures = document.riskFactors.pits_and_fissures.checked;
			var drugUse = document.riskFactors.drug_use.checked;
			var inadequateSaliva = document.riskFactors.inadequate_saliva.checked;
			var salivaReducingFactors = document.riskFactors.saliva_reducing_factors.checked;
			var exposedRoots = document.riskFactors.exposed_roots.checked;
			var orthodonticAppliances = document.riskFactors.orthodontic_appliances.checked;
			
			var riskFactors = new RiskFactors(msLb,visiblePlaque,frequentSnack,pitsAndFissures,drugUse,inadequateSaliva,salivaReducingFactors,exposedRoots,orthodonticAppliances);
			$.jStorage.set("risk_factors",riskFactors);	
		
	
		alert("submitted");
		var riskLevel = new RiskLevel();
		$.jStorage.set("risk_level", riskLevel);		
		$.mobile.changePage( "#risk_factors", { allowSamePageTransition: true } );
		return false;
	}
	
	
	function fProtectiveFactors(){
	
			var fluoridatedCommunity = document.protectiveFactors.fluoridated_community.checked;
			var fluoridePasteOnce = document.protectiveFactors.fluoride_paste_once.checked;
			var fluoridePasteTwice = document.protectiveFactors.fluoride_paste_twice.checked;
			var fluorideMouthrinse = document.protectiveFactors.fluoride_mouthrinse.checked;
			var fluoridePasteHighF = document.protectiveFactors.fluoride_5000.checked;
			var fluorideVarnish = document.protectiveFactors.fluoride_varnish.checked;
			var fluorideTopical = document.protectiveFactors.topical_fluoride.checked;
			var chlorhexidine = document.protectiveFactors.chlorhexidine.checked;
			var xylitol = document.protectiveFactors.xylitol.checked;
			var cap = document.protectiveFactors.tooth_mousse.checked;
			var adequateSaliva = document.protectiveFactors.adequate_saliva.checked;

			var protectiveFactors = new ProtectiveFactors(fluoridatedCommunity,fluoridePasteOnce,fluoridePasteTwice,fluorideMouthrinse,fluoridePasteHighF,fluorideVarnish,fluorideTopical,chlorhexidine,xylitol,cap,adequateSaliva);
			$.jStorage.set("protective_factors",protectiveFactors);	
		
		alert("submitted");	
		var riskLevel = new RiskLevel();
		$.jStorage.set("risk_level", riskLevel);		
		$.mobile.changePage( "#protective_factors", { allowSamePageTransition: true } );
		return false;
	
	}
	
	
	
	
	
	
	/* ============================ THERAPY RECOMMENDATIONS FUNCTIONS ================ */
	
	
	function fRecallExams () {
	
	var _RecallExamsFrequency = document.recallExams.recalls.value;
	var broj = parseInt(_RecallExamsFrequency);
	var date = new Date();

	var day = date.getDate(); if (day < 10) { day = "0" + day; }
	var month = date.getMonth() + 1 + broj; 
	var year = date.getFullYear()
 		if (month > 12) {month = month % 12; year = year + 1}
		if (month < 10) { month = "0" + month; }
	var item = day + "." + month + "." + year + ".";

	$.jStorage.set("recallExam", item.toString());

		alert("submitted");
		$.jStorage.set("submit_form_th", "submit");
		$.jStorage.set("submit_form", "submit");		
		$.mobile.changePage( "#recall_exams", { allowSamePageTransition: true } );
		return false;
	}
	
	
	
	function fAntibacterials () {
	
		if (document.antibacterials_th.chlorhexidine_th.checked == true){
			if ($.jStorage.get("chlorhexidine_th") =="false"){
			$.jStorage.set("chlorhexidine_th", "true");
			track("chlorhexidine_th", "add");}
		} else {
			$.jStorage.set("chlorhexidine_th", "false");
			track("chlorhexidine_th", "remove");
		}
		
		if (document.antibacterials_th.xylitol_th.checked == true){
			if ($.jStorage.get("xylitol_th")=="false"){
			$.jStorage.set("xylitol_th", "true");
			track("xylitol_th", "add");}
		} else {
			$.jStorage.set("xylitol_th", "false");
			track("xylitol_th", "remove");
		}
		
		alert("submitted");	
		$.jStorage.set("submit_form", "submit");
		$.jStorage.set("submit_form_th", "submit");
		$.mobile.changePage( "#antibacterials", { allowSamePageTransition: true } );
		return false;
	}
	
	
	function fFluoride () {
	
		if (document.fluoride_th.fluoride_paste_otc_th.checked == true){
			if ($.jStorage.get("fluoride_paste_otc_th")=="false")
			$.jStorage.set("fluoride_paste_otc_th", "true");
		} else {
			$.jStorage.set("fluoride_paste_otc_th", "false");
		}
		
		if (document.fluoride_th.fluoride_paste_5000_th.checked == true){
			if ($.jStorage.get("fluoride_paste_5000_th")=="false")
			$.jStorage.set("fluoride_paste_5000_th", "true");
		} else {
			$.jStorage.set("fluoride_paste_5000_th", "false");
		}

		if (document.fluoride_th.fluoride_mouthrinse_th.checked == true){
			if ($.jStorage.get("fluoride_mouthrinse_th")=="false"){
			$.jStorage.set("fluoride_mouthrinse_th", "true");
			track("fluoride_mouthrinse_th", "add");}
		} else {
			$.jStorage.set("fluoride_mouthrinse_th", "false");
			track("fluoride_mouthrinse_th", "remove");
		}
		
		
		if (document.fluoride_th.fluoride_mouthrinse_extra_th.checked == true){
			if ($.jStorage.get("fluoride_mouthrinse_extra_th")=="false"){
			$.jStorage.set("fluoride_mouthrinse_extra_th", "true");
			track("fluoride_mouthrinse_extra_th", "add");}
		} else {
			$.jStorage.set("fluoride_mouthrinse_extra_th", "false");
			track("fluoride_mouthrinse_extra_th", "remove");
		}
		
		if (document.fluoride_th.fluoride_mouthrinse_xerostomia_th.checked == true){
			if ($.jStorage.get("fluoride_mouthrinse_xerostomia_th")=="false"){
			$.jStorage.set("fluoride_mouthrinse_xerostomia_th", "true");
			as_needed("fluoride_mouthrinse_xerostomia_th", "add");}
		} else {
			$.jStorage.set("fluoride_mouthrinse_xerostomia_th", "false");
			as_needed("fluoride_mouthrinse_xerostomia_th", "remove");
		}
	
		alert("submitted");	
		$.jStorage.set("submit_form", "submit");
		$.jStorage.set("submit_form_th", "submit");
		$.mobile.changePage( "#fluoride", { allowSamePageTransition: true } );
		return false;
	}
	
	
	
	
	
function fPhControl () {
	
		if (document.ph_control.ph_th.checked == true){
			if ($.jStorage.get("ph_th")=="false"){
			$.jStorage.set("ph_th", "true");
			as_needed("ph_th", "add");}
		} else {
			$.jStorage.set("ph_th", "false");
			track("ph_th", "remove");
		}
		
		if (document.ph_control.phgum_th.checked == true){
			if ($.jStorage.get("phgum_th")=="false"){
			$.jStorage.set("phgum_th", "true");
			as_needed("phgum_th", "add");}
		} else {
			$.jStorage.set("phgum_th", "false");
			as_needed("phgum_th", "remove");
		}
	
		alert("submitted");	
		$.jStorage.set("submit_form", "submit");
		$.jStorage.set("submit_form_th", "submit");
		$.mobile.changePage( "#ph_control", { allowSamePageTransition: true } );
		return false;
	}
	
	
	function fCaPPaste() {
	
		if (document.cap_paste.cap_th.checked == true){
			if ($.jStorage.get("cap_th")=="false"){
			$.jStorage.set("cap_th", "true");
			track("cap_th", "add");}
		} else {
			$.jStorage.set("cap_th", "false");
			track("cap_th", "remove");
		}
	
		alert("submitted");	
		$.jStorage.set("submit_form", "submit");	
		$.jStorage.set("submit_form_th", "submit");		
		$.mobile.changePage( "#cap_paste", { allowSamePageTransition: true } );
		return false;
	}
	


/* ====================================== tracking list =======================================*/


	function track (string, mark){		

		
		var track = $.jStorage.get("track");
		
		if (mark == "add"){
			if(track.indexOf(string) == -1) track.push(string);
		} else {
			if(track.indexOf(string) != -1) track.splice(track.indexOf(string),1);
		}	
		
		$.jStorage.set("track", track);

	}
	
	
	function as_needed (string, mark){


			var as_needed = $.jStorage.get("as_needed");
			
			if (mark == "add"){
				if(as_needed.indexOf(string) == -1) as_needed.push(string);
			} else {
				if(as_needed.indexOf(string) != -1) as_needed.splice(as_needed.indexOf(string),1);
			}	
			
			$.jStorage.set("as_needed", as_needed);


	}

	
	

	
	
	
	
	
	
	
	
	
	