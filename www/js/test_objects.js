

var riskLevel = {
	id: "riskLevel",
	publicName: "Caries risk level",
	text: "Likelihood of having new caries lesions in coming months or years.",
	
	type: "status",
	present: "high",
	specificRisk: "low2",
	style: "red",

};

var diseaseIndicators = {
	id: "diseaseIndicators",
	publicName: "Disease Indicators",
	text: "Presence of caries lesions according to last dental examination.",
	
	type: "status",
	
	present: 2,
	style: "red",
	
	visibleCavities: false,
	radiographic: true,
	whiteSpots: false,
	last3y: true,

};

var riskFactors = {
	id: "riskFactors",
	publicName: "Caries risk factors",
	text: "Factors leading to new caries lesions according to last dental examination.",
	
	type: "status",
	
	present: 0,
	style: "green",
	
	mslbCount: false,
	heavyPlaque: true,
	frequentSnacks: false,
	deepPits: true,
	drugUse: true,
	inadequateSaliva: false,
	exposedRoots: false,
	orthodonticAppliances:false,

};

var protectiveFactors = {
	id: "protectiveFactors",
	publicName: "Caries protective factors",
	text: "Factors lowering risk for new caries lesions according to last dental examination.",
	
	type: "status",
	
	present: 4,
	style: "green",
	
	fluoridatedCommunity: false,
	ftoothpOnce: true,
	ftoothpTwice: false,
	fMouthrinse: true,
	fthpasteDaily: true,
	fVarnish: false,
	fTopical: false,
	chlorhexidine:false,
	xylitol:false,
	cap:false,
	adequateSaliva: true,

};

$.jStorage.set("diseaseIndicators", diseaseIndicators);
$.jStorage.set("riskFactors", riskFactors);
$.jStorage.set("protectiveFactors", protectiveFactors);
$.jStorage.set("riskLevel", riskLevel);
$.jStorage.set ("diagnostic" ,["riskLevel", "diseaseIndicators", "riskFactors", "protectiveFactors"]);






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