	
	function GeneralData(firstName,lastName,age,gender) {
	
			this.firstName = firstName;
			this.lastName = lastName;	
			this.age = age;
			this.gender = gender;
			
	}
	
	function DiseaseIndicators (visibleCavities,radiographic,whiteSpots,last3y) {

			this.args = [].slice.call(arguments);
			this.fCount = function () {
				var count = 0;
				for (var i = 0; i < this.args.length; i++){
					if (this.args[i]) count = count + 1;
				}
				return count;
			};
			this.count = this.fCount();	
			this.visibleCavities = visibleCavities;
			this.radiographic = radiographic;
			this.whiteSpots = whiteSpots;
			this.last3y = last3y;
	
	}
	
	function RiskFactors(msLb,visiblePlaque,frequentSnack,pitsAndFissures,drugUse,inadequateSaliva,salivaReducingFactors,exposedRoots,orthodonticAppliances) {
	
			this.args = [].slice.call(arguments);
			this.fCount = function () {
				var count = 0;
				for (var i = 0; i < this.args.length; i++){
					if (this.args[i]) count = count + 1;
				}
				return count;
			};
			this.count = this.fCount();			
			this.msLb = msLb;
			this.visiblePlaque = visiblePlaque;
			this.frequentSnack = frequentSnack;
			this.pitsAndFissures = pitsAndFissures;
			this.drugUse = drugUse;
			this.inadequateSaliva = inadequateSaliva;
			this.salivaReducingFactors = salivaReducingFactors;
			this.exposedRoots = exposedRoots;
			this.orthodonticAppliances = orthodonticAppliances;
			
	}
	
	function ProtectiveFactors(fluoridatedCommunity,fluoridePasteOnce,fluoridePasteTwice,fluorideMouthrinse,fluoridePasteHighF,fluorideVarnish,fluorideTopical,chlorhexidine,xylitol,cap,adequateSaliva) {
			
			this.args = [].slice.call(arguments);
			this.fCount = function () {
				var count = 0;
				for (var i = 0; i < this.args.length; i++){
					if (this.args[i]) count = count + 1;
				}
				return count;
			};
			this.count = this.fCount();
			this.fluoridatedCommunity = fluoridatedCommunity;
			this.fluoridePasteOnce = fluoridePasteOnce;
			this.fluoridePasteTwice = fluoridePasteTwice;
			this.fluorideMouthrinse = fluorideMouthrinse;
			this.fluoridePasteHighF = fluoridePasteHighF;
			this.fluorideVarnish = fluorideVarnish;
			this.fluorideTopical = fluorideTopical;
			this.chlorhexidine = chlorhexidine;
			this.xylitol = xylitol;
			this.cap = cap;
			this.adequateSaliva = adequateSaliva;
			
	}


	function RiskLevel () {
	
		this.id = "riskLevel";
		this.publicName = "Caries risk level";
		this.text = "Likelihood of having new caries lesions in coming months or years.";
		
		this.fCalculate = function() {
			var result = "";
			if ($.jStorage.get("disease_indicators") != null && $.jStorage.get("risk_factors") != null && $.jStorage.get("protective_factors") != null){
				var diseaseIndicators = $.jStorage.get("disease_indicators");
				var riskFactors = $.jStorage.get("risk_factors");
				var protectiveFactors = $.jStorage.get("protective_factors");
				
				if (diseaseIndicators.count != 0) {
					if (riskFactors.inadequateSaliva || riskFactors.salivaReducingFactors || riskFactors.drugUse) {
						result = "extreme";
					} else {
						result = "high1";				
					}
				} else {
					if (riskFactors.count > protectiveFactors.count){
						result = "high2";
					}else if (riskFactors.count == protectiveFactors.count){
						result = "moderate";
					}else if(riskFactors.count < protectiveFactors.count && riskFactors.count > 0 ){
						result = "low1";
					} else {
						result = "low2";
					}
				}	
			} else {
				result = "undefined";
			}
			return result;
		};

		this.level = this.fCalculate();
		this.style = "red";
		
		
	}







var snack = {
	id: "snack",
	publicName: "Snack",
	text: "Do not eat sugar containing food more than 3 times a day.",
	alertMessage: "Snack registered. Keep taking sugar containing food below 3 times a day.",
	
	type: "tracking",
	therapy: false,
	active: true,
	specific: false,
	daily: 3,
	
	today:0,
	last: "",
	registration: []

};


var brushing = {
	id: "brushing",
	publicName: "Teeth brushing",
	text: "Brush your teeth two times daily (after breakfast and before bed).",
	toDoText: "Brush your teeth",
	alertMessage: "Brushing registered. Brush your teeth 2 times a day: after breakfast and before bed.",
	
	type: "tracking",
	therapy: true,
	active: true,
	specific: false,
	daily: 2,
	
	today:0,
	last: "",
	registration: []

};

var flossing = {
	id: "flossing",
	publicName: "Teeth flossing",
	text: "floss your teeth once daily (after brushing).",
	toDoText: "Floss your teeth",
	alertMessage: "Flossing registered. Floss your teeth once daily before brushing.",
	
	type: "tracking",
	therapy: true,
	active: true,
	specific: false,
	daily: 1,
	
	today:0,
	last: "",
	registration: []	

};

var xylitol = {
	id: "xylitol",
	publicName: "Xylitol",
	text: "Take 1 to 2 candies four times each day.",
	toDoText: "Take xylitol candy",
	alertMessage: "Xylitol candy taking registered. Take one or two xylitol candies four times daily.",
	
	type: "tracking",
	therapy: true,
	active: true,
	specific: true,
	daily: 4,
	
	today:0,
	last: "",
	registration: []

};

var chlorhexidine = {
	id: "chlorhexidine",
	publicName: "Chlorhexidine",
	text: "Rinse your mouth once daily for seven days in month. Do not use together with fluoride mouthrinse.",
	toDoText: "Rinse with chlorhexidine solution",
	alertMessage: "Rinsing with chlorhexidine solution registered. Rinse once daily for seven days a month.",
	
	type: "tracking",
	therapy: true,
	active: true,
	specific: true,
	daily: 1,
	
	today:0,
	last: "",
	registration: []
	
};

var fluoride_mouthrinse = {
	id: "fluoride_mouthrinse",
	publicName: "Fluoride mouthrinse",
	text: "Rinse your mouth once daily with fluoride mouthrinse.",
	toDoText: "Rinse with fluoride mouthrinse",
	alertMessage: "Rinsing with fluoride mouthrinse registered. Rinse once daily.",
	
	type: "tracking",
	therapy: true,
	active: true,
	specific: true,
	daily: 1,
	
	today:0,
	last: "",
	registration: []
	
};


$.jStorage.set("snack", snack);
$.jStorage.set("brushing", brushing);
$.jStorage.set("flossing", flossing);
$.jStorage.set("xylitol", xylitol);
$.jStorage.set("chlorhexidine", chlorhexidine);
$.jStorage.set("fluoride_mouthrinse", fluoride_mouthrinse);
$.jStorage.set("objects", ["snack","brushing","flossing","xylitol","chlorhexidine"]);