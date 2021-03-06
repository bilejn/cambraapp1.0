
	
	
	function generalForm() {

			var firstName = document.generalData.first_name.value;
			var lastName = document.generalData.last_name.value;				
			var gender = document.generalData.gender.value;
			var age = document.generalData.birthday.value;

			var generalData = new GeneralData(firstName,lastName,gender,age);
			$.jStorage.set("general_data",generalData);
		
		showAlert("Submitted", emptyFunction, "Thank you.", 'OK');
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

		showAlert("Submitted", emptyFunction, "Submit all three Current Status forms in order to calculate caries risk level.", 'OK');
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
		
	
		showAlert("Submitted", emptyFunction, "Submit all three Current Status forms in order to calculate caries risk level.", 'OK');
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
		
		showAlert("Submitted", emptyFunction, "Submit all three Current Status forms in order to calculate caries risk level.", 'OK');
		var riskLevel = new RiskLevel();
		$.jStorage.set("risk_level", riskLevel);		
		$.mobile.changePage( "#protective_factors", { allowSamePageTransition: true } );
		return false;
	
	}
	
	
	
	
	
	
	/* ============================ THERAPY RECOMMENDATIONS FUNCTIONS ================ */
	
	
	function fNextAppointment () {
	
	var date = document.nextAppointment.next_appointment.value;
	$.jStorage.set("next_appointment", date);
	
	

		showAlert("Submitted", emptyFunction, "Thank you.", 'OK');	
		$.mobile.changePage( "#next_appointment", { allowSamePageTransition: true } );
		return false;
	}
	
	
	
	function fAntibacterials () {

		var objects = $.jStorage.get("objects");
		if (document.antibacterials_th.chlorhexidine_th.checked){
				var objectName = "chlorhexidine";
				if (objects.indexOf(objectName) == -1){
					var chlorhexidine = new Therapy("chlorhexidine","Chlorhexidine","Rinse your mouth with chlorhexidine solution once daily for seven days a month. Do not use together with fluoride mouthrinse.",true,true,true,true,1,7);
					$.jStorage.set(objectName, chlorhexidine);
					handle("add", objectName, objects);
				}
		} else {
				var objectName = "chlorhexidine";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
		
		if (document.antibacterials_th.xylitol_th.checked){
				var objectName = "xylitol";
				if (objects.indexOf(objectName) == -1){
					var xylitol = new Therapy("xylitol","Xylitol","Take one or two xylitol candies four times a day.",true,true,true,true,4,"all");
					$.jStorage.set(objectName, xylitol);
					handle("add", objectName, objects);
				}
		} else {
				var objectName = "xylitol";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
		
		
		

		
		showAlert("Submitted", emptyFunction, "Thank you.", 'OK');		
		$.mobile.changePage( "#antibacterials", { allowSamePageTransition: true } );
		return false;
	}
	
	
	
	
	
	
	
	
	
	function fFluoride () {
	
		var objects = $.jStorage.get("objects");
		
		if (document.fluoride_th.fluoride_paste_5000_th.checked){
		var objectName = "fluoride_paste_5000_th";
				if (objects.indexOf(objectName) == -1){
					var fluoride_paste_5000_th = new Therapy("fluoride_paste_5000_th","Therapeutic tooth paste 5000ppm F","Use instead of regular over-the-counter tooth paste.",true,false,true,true,0,"all");
					$.jStorage.set(objectName, fluoride_paste_5000_th);
					handle("add", objectName, objects);
				}
		}  else {
				var objectName = "fluoride_paste_5000_th";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
		
		
		if (document.fluoride_th.fluoride_mouthrinse_th_once.checked){
				var objectName = "fluoride_mouthrinse_th_once";
				if (objects.indexOf(objectName) == -1){
					var fluoride_mouthrinse_th_once = new Therapy("fluoride_mouthrinse_th_once","Fluoride mouthrinse 0.05%","Rinse your mouth once daily with fluoride mouthrinse.",true,true,true,true,1,"all");
					$.jStorage.set(objectName, fluoride_mouthrinse_th_once);
					handle("add", objectName, objects);
				}
		}  else {
				var objectName = "fluoride_mouthrinse_th_once";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
		
		
		if (document.fluoride_th.fluoride_mouthrinse_th_twice.checked){
				var objectName = "fluoride_mouthrinse_th_twice";
				if (objects.indexOf(objectName) == -1){
					var fluoride_mouthrinse_th_twice = new Therapy("fluoride_mouthrinse_th_twice","Fluoride mouthrinse 0.05%","Rinse your mouth twice daily with fluoride mouthrinse.",true,true,true,true,2,"all");
					$.jStorage.set(objectName, fluoride_mouthrinse_th_twice);
					handle("add", objectName, objects);
				}
		}  else {
				var objectName = "fluoride_mouthrinse_th_twice";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
		
		if (document.fluoride_th.fluoride_mouthrinse_extra_th.checked){
				var objectName = "fluoride_mouthrinse_extra_th";
				if (objects.indexOf(objectName) == -1){
					var fluoride_mouthrinse_extra_th = new Therapy("fluoride_mouthrinse_extra_th","Fluoride mouthrinse 0.2%","Rinse your mouth once daily with 0.2% fluoride mouthrinse.",true,true,true,true,1,"all");
					$.jStorage.set(objectName, fluoride_mouthrinse_extra_th);
					handle("add", objectName, objects);
				}
		}  else {
				var objectName = "fluoride_mouthrinse_extra_th";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
		
		if (document.fluoride_th.fluoride_mouthrinse_xerostomia_th.checked){
				var objectName = "fluoride_mouthrinse_xerostomia_th";
				if (objects.indexOf(objectName) == -1){
					var fluoride_mouthrinse_xerostomia_th = new Therapy("fluoride_mouthrinse_xerostomia_th","Fluoride mouthrinse 0.05%","Rinse with fluoride mouthrinse when mouth feels dry, after snacking, breakfast, and lunch.",true,false,true,true,0,"all");
					$.jStorage.set(objectName, fluoride_mouthrinse_xerostomia_th);
					handle("add", objectName, objects);
				}
		}  else {
				var objectName = "fluoride_mouthrinse_xerostomia_th";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
	
		showAlert("Submitted", emptyFunction, "Thank you.", 'OK');		
		$.mobile.changePage( "#fluoride", { allowSamePageTransition: true } );
		return false;
	}
	
	
	
	
	
function fPhControl () {

		var objects = $.jStorage.get("objects");
	
		if (document.ph_control.ph_th.checked){
				var objectName = "ph_th";
				if (objects.indexOf(objectName) == -1){
					var ph_th = new Therapy("ph_th","Acid-neutralizing rinse"," Use as needed if mouth feels dry, after snacking, bedtime and after breakfast.",true,false,true,true,0,"all");
					$.jStorage.set(objectName, ph_th);
					handle("add", objectName, objects);
				}
		}  else {
				var objectName = "ph_th";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
		
		if (document.ph_control.phgum_th.checked){
				var objectName = "phgum_th";
				if (objects.indexOf(objectName) == -1){
					var phgum_th = new Therapy("phgum_th","Baking soda chewing gum"," Use as needed if mouth feels dry, after snacking, bedtime and after breakfast.",true,false,true,true,0,"all");
					$.jStorage.set(objectName, phgum_th);
					handle("add", objectName, objects);
				}
		}  else {
				var objectName = "phgum_th";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
	
		showAlert("Submitted", emptyFunction, "Thank you.", 'OK');		
		$.mobile.changePage( "#ph_control", { allowSamePageTransition: true } );
		return false;
}
	
	
	function fCaPPaste() {
	
		var objects = $.jStorage.get("objects");
		
		if (document.cap_paste.cap_th.checked){
		var objectName = "cap_th";
				if (objects.indexOf(objectName) == -1){
					var cap_th = new Therapy("cap_th","Calcium phosphate paste"," Apply calcium phosphate paste twice daily.",true,true,true,true,2,"all");
					$.jStorage.set(objectName, cap_th);
					handle("add", objectName, objects);
				}
		}  else {
				var objectName = "cap_th";
				if (objects.indexOf(objectName) != -1){
					handle("remove", objectName, objects);			
					$.jStorage.deleteKey(objectName);	
				}
		}
	
		showAlert("Submitted", emptyFunction, "Thank you.", 'OK');	
		$.mobile.changePage( "#cap_paste", { allowSamePageTransition: true } );
		return false;
	}
	
	
	function fCustom(){
		var customs = $.jStorage.get("customs");
		var daily;
		var monthly;
		var strict;
		
		var productName = document.custom_prescription.product_name.value;
		var directions = document.custom_prescription.directions.value;


		if (document.custom_prescription.take_as_needed.checked){
			strict = false;
			daily = 0;
			monthly = "all";
		}else{
			strict = true;
			daily = parseInt (document.custom_prescription.times_daily.value);
			if (parseInt(document.custom_prescription.days_in_month.value) == 0){
				monthly = "all";
			}else{
				monthly = parseInt(document.custom_prescription.days_in_month.value);
				monthly = monthly * daily;
			}
		}	
		
		
		customs = customs +1;
		var id = "custom"+customs;

			
		var objects = $.jStorage.get("objects");
		
		var objectName = id;
			var newCustomTh = new Therapy(id,productName,directions,true,strict,true,true,daily,monthly);
			$.jStorage.set(objectName, newCustomTh);
			$.jStorage.set("customs",customs);
			
			var customObjects = $.jStorage.get("custom_objects");
			customObjects.push(id);
			$.jStorage.set("custom_objects",customObjects);
			
			handle("add", objectName, objects);

	
		showAlert("Submitted", emptyFunction, "Thank you.", 'OK');		
		$.mobile.changePage("#custom_entry", { allowSamePageTransition: true } );
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

	
	

	
	
	
	
	
	
	
	
	
	