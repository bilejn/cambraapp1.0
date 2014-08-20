/*====================== FUNCTIONS ====================*/

/*function fCount is method of diagnostic objects constructors. Calculates number of attributes set to true.  The function is called from view.js, - pagebeforeshow #current status event.*/


			function fCount() {
				var count = 0;
				for (var i = 0; i < this.args.length; i++){
					if (this.args[i]) count = count + 1;
				}
				return count;
			}
			
			
/*function handle adds/removes objects from object list and updates to do counter during runtime when new therapeutic objects are added/removed. The function is called from submitForm.js functions. */			
			
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
			

/* toDoCount and snackCount handle counters on home screen indirectly, through local storage values.
 Parameter "reset" sets counters for new day. Other values increase/decrease counters.
ToDoCount handles to do counter if new objects are added or old ones removed during runtime */

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
		
		
			function snackCount (parametar){
				var snackCount = $.jStorage.get("snack_count");
				if (parametar == "reset"){
					var snackCount = 0;
				} else {				
					snackCount = snackCount + parametar;			
				}			
			$.jStorage.set("snack_count", snackCount);					
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

	
	
	
	
	
	
	
/*====================== THERAPEUTIC OBJECTS CONSTRUCTOR ====================*/
	
	
	
	
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
		this.start = new XDate().toString("yyyy-MM-dd");
		this.nextMonth = new XDate().addMonths(1).toString("yyyy-MM-dd");
		this.today = 0,
		this.thisMonth = 0,
		this.last = "",
		this.registration = []
	}





