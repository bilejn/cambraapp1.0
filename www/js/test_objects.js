var snack = {
	id: "snack",
	publicName: "Snack",
	text: "Do not eat sugar containing food more than 3 times a day.",
	alertMessage: "Snack registered. Keep taking sugar containing food below 3 times a day.",
	
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
$.jStorage.set("objects", ["snack","brushing","flossing","xylitol","chlorhexidine","fluoride_mouthrinse"]);