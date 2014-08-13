/*====================== GENERAL FUNCTIONS ====================*/


			function fCount() {
				var count = 0;
				for (var i = 0; i < this.args.length; i++){
					if (this.args[i]) count = count + 1;
				}
				return count;
			}
			
			
			
			function handle (operation,objectName, objects){
				if (operation == "add"){		
					objects.push(objectName);
					$.jStorage.set("objects", objects);
					
					var object = $.jStorage.get(objectName);
					toDoCount(object.daily);
					
				} else {
					objects.splice(objects.indexOf(objectName),1);
					$.jStorage.set("objects", objects);
				
					var object = $.jStorage.get(objectName);
					var count = object.today - object.daily;
					if (count > 0) count = 0;
					toDoCount(count);
				
				}
			
			}
			

/* toDoCount handles to do counter on home screen indirectly, through local storage "to_do_count" value. Parameter -1 sets to do count for new day. other values increase/decrease to do count if new objects are added or old ones removed during runtime */

			function toDoCount (parametar){
				var toDoCount = $.jStorage.get("to_do_count");
				if (parametar == "reset"){
					var toDoCount = 0;
					var objects = $.jStorage.get("objects");
					for (var i = 0; i < objects.length; i++){
						var model = $.jStorage.get(objects[i]);
						if (model.therapy && model.active && model.strict){
							toDoCount = toDoCount + model.daily;
						}
					}
				} else {				
					toDoCount = toDoCount + parametar;			
				}			
			$.jStorage.set("to_do_count", toDoCount);					
			}



			
/*====================== DIAGNOSTIC OBJECTS CONSTRUCTORS ====================*/
	
	function GeneralData(firstName,lastName,gender,age) {
	
			this.firstName = firstName;
			this.lastName = lastName;	
			this.gender = gender;
			this.age = age;
			
	}
	
	
	
	function DiseaseIndicators (visibleCavities,radiographic,whiteSpots,last3y) {
		
			this.id = "diseaseIndicators";
			this.publicName = "Disease indicators";
			this.text = "Presence of caries lesions <br />  according to last dental examination.";

			this.args = [].slice.call(arguments);
			this.fCount = fCount;
			this.defined = true;
			this.count = this.fCount();	
			this.visibleCavities = visibleCavities;
			this.radiographic = radiographic;
			this.whiteSpots = whiteSpots;
			this.last3y = last3y;
	
	}
	
	
	
	function RiskFactors(msLb,visiblePlaque,frequentSnack,pitsAndFissures,drugUse,inadequateSaliva,salivaReducingFactors,exposedRoots,orthodonticAppliances) {
		
			this.id = "riskFactors";
			this.publicName = "Risk factors";
			this.text = "Factors leading to new caries lesions <br />  according to last dental examination.";
	
			this.args = [].slice.call(arguments);
			this.fCount = fCount;
			this.defined = true;
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
		
			this.id = "protectiveFactors";
			this.publicName = "Protective factors";
			this.text = "Factors lowering risk for new caries lesions <br />  according to last dental examination.";
			
			this.args = [].slice.call(arguments);
			this.fCount = fCount;
			this.defined = true;
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
		this.text = "Likelihood of having <br />  new caries lesions <br /> in coming months or years.";
		
		this.fCalculate = function() {
			var result = "";
			if ($.jStorage.get("disease_indicators").defined && $.jStorage.get("risk_factors").defined && $.jStorage.get("protective_factors").defined){
				var diseaseIndicators = $.jStorage.get("disease_indicators");
				var riskFactors = $.jStorage.get("risk_factors");
				var protectiveFactors = $.jStorage.get("protective_factors");
				
				if (diseaseIndicators.count != 0) {
					if (riskFactors.inadequateSaliva || riskFactors.salivaReducingFactors || riskFactors.drugUse) {
						result = "extreme";
						this.message =  "Your current caries risk level is: Extreme.";
					} else {
						result = "high1";		
						this.message =  "Your current caries risk level is: High.";						
					}
				} else {
					if (riskFactors.count > protectiveFactors.count){
						result = "high2";
						this.message =  "Your current caries risk level is: High.";	
					}else if (riskFactors.count == protectiveFactors.count){
						result = "moderate";
						this.message =  "Your current caries risk level is: Moderate.";	
					}else if(riskFactors.count < protectiveFactors.count && ((protectiveFactors.count - riskFactors.count) < 3)){
						result = "low1"
						this.message =  "Your current caries risk level is: Low.";	
					} else {
						result = "low2";
						this.message =  "Your current caries risk level is: Low.";	
					}
				}	
			} else {
				result = "undefined";
				this.message = "Your current caries risk level is undefined. Visit your dentist to evaluate your caries risk level.";
			}
			return result;
		};

		this.level = this.fCalculate();
		this.count = this.level;
		
		
	}

	
	
	
/*====================== THERAPEUTIC OBJECTS CONSTRUCTORS ====================*/
	
	
	
	
	function Therapy (id,publicName,text,therapy,strict,specific,active,daily,monthly){
	
		this.id = id;
		this.publicName = publicName;
		this.text = text;
		
		this.therapy = therapy;
		this.strict = strict;
		this.specific = specific;
		this.active = active;
		
		this.daily = daily;
		this.monthly = monthly;
		this.start = Date.today().toString("dd.MM.yyyy");
		this.today = 0,
		this.last = "",
		this.registration = []
	}





var snack = {
	id: "snack",
	publicName: "Snack",
	text: "Do not eat sugar containing food more than 3 times a day.",
	alertMessage: "Snack registered. Keep taking sugar containing food below 3 times a day.",
	
	therapy: false,
	strict: true,
	specific: false,
	daily: 3,
	
	today:0,
	last: "",
	registration: [],
	active: true
};


var brushing = {
	id: "brushing",
	publicName: "Brushing",
	text: "Brush your teeth two times daily (after breakfast and before bed).",
	toDoText: "Brush your teeth",
	alertMessage: "Brushing registered. Brush your teeth 2 times a day: after breakfast and before bed.",
	
	therapy: true,
	strict: true,
	active: true,
	specific: false,
	daily: 2,
	
	today:0,
	last: "",
	registration: []

};

var flossing = {
	id: "flossing",
	publicName: "Flossing",
	text: "floss your teeth once daily (after brushing).",
	toDoText: "Floss your teeth",
	alertMessage: "Flossing registered. Floss your teeth once daily before brushing.",
	
	therapy: true,
	strict: true,
	active: true,
	specific: false,
	daily: 1,
	
	today:0,
	last: "",
	registration: []	

};
/*
var xylitol = {
	id: "xylitol",
	publicName: "Xylitol",
	text: "Take 1 to 2 candies four times each day.",
	toDoText: "Take xylitol candy",
	alertMessage: "Xylitol candy registered. Take one or two xylitol candies four times daily.",
	
	therapy: true,
	strict: true,
	active: true,
	specific: true,
	daily: 4,
	
	today:0,
	last: "",
	registration: []

};

var chlorhexidine = {
	id: "chlorhexidine",
	publicName: "Chlorhexidine solution",
	text: "Rinse your mouth once daily for seven days in month. Do not use together with fluoride mouthrinse.",
	toDoText: "Rinse with chlorhexidine solution",
	alertMessage: "Chlorhexidine solution registered. Rinse once daily for seven days a month.",
	
	therapy: true,
	strict: true,
	active: true,
	specific: true,
	daily: 1,
	daysInMonth: 7,
	
	today:0,
	last: "",
	registration: []
	
};

var fluoride_mouthrinse = {
	id: "fluoride_mouthrinse",
	publicName: "Fluoride mouthrinse",
	text: "Rinse your mouth with fluoride mouthrinse when mouth feels dry.",
	toDoText: "Rinse with fluoride mouthrinse",
	alertMessage: "Rinsing with fluoride mouthrinse registered. Rinse once daily.",
	
	therapy: true,
	strict: false,
	active: true,
	specific: true,
	daily: 1,
	
	today:0,
	last: "",
	registration: []
	
};
*/

$.jStorage.set("snack", snack);
$.jStorage.set("brushing", brushing);
$.jStorage.set("flossing", flossing);
/*
$.jStorage.set("xylitol", xylitol);
$.jStorage.set("fluoride_mouthrinse", fluoride_mouthrinse);
*/