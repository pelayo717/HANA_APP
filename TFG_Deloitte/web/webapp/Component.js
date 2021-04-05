sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "sap/m/MessageToast"
], function (UIComponent, JSONModel, ResourceModel,MessageToast) {
   "use strict";
   return UIComponent.extend("web.webapp.Component", {
				
				metadata: {
					rootView: "web.webapp.view.App",
					type: "XML",
					async: true,
					id: "app",
					routing: {
				         config: {
				            routerClass: "sap.m.routing.Router",
				            viewType: "XML",
				            viewPath: "web.webapp.view",
				            controlId: "app",
				            controlAggregation: "pages",
				            transition: "slide"
				         },
				         routes: [{
				            pattern: "",
				            name: "appHome",
				            target: "home"
				         },{
				            pattern: "riesgo",
				            name: "riesgo",
				            target: "riesgo"
				         },{
				            pattern: "cuestionario",
				            name: "cuestionario",
				            target: "cuestionario"
				         },{
				            pattern: "pendiente",
				            name: "pendiente",
				            target: "pendiente"
				         },{
				            pattern: "principal",
				            name: "principal",
				            target: "principal"
				         },{
				         	pattern: "creacionriesgo",
				            name: "creacionriesgo",
				            target: "creacionriesgo"
				         }
				         ],
				         targets: {
				            home: {
				               viewName: "Home",
				               viewLevel : 1
				            },
				    		riesgo: {
				               viewName: "PlantillaRiesgos",
				               viewLevel : 1
				            },			    		
				            cuestionario: {
				               viewName: "PlantillaCuestionarios",
				               viewLevel : 1
				            },				    		
				            principal: {
				               viewName: "App",
				               viewLevel : 1
				            },
				            creacionriesgo: {
				               viewName: "CreacionRiesgo",
				               viewLevel : 1			            	
				            }
				         }
    				}
				},

      init : function () {
      	MessageToast.show("Bienvenidos");
         // call the init function of the parent
		UIComponent.prototype.init.apply(this, arguments);
		this.getRouter().initialize();
		
		//Temporal


         // set i18n model
         var i18nModel = new ResourceModel({
            bundleName : "web.webapp.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
	}
   });
});


/*sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/m/MessageToast"
], function (UIComponent) {
   "use strict";
   return UIComponent.extend("web.webapp.Component", {
   	
		metadata : {
			routing: {
				config: { // default values for routing
					viewType : "XML",
					viewPath: "web.webapp.view",
					clearTarget: false
				},
                routes:[{
                    pattern: "",
                    name:"App",
                    view:"App"                           
                },{
                    pattern: "",
                    name:"Riesgos",
                    view:"Riesgos"                           
                }
                ]
			}
		}
		
		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			var router = this.getRouter();
			router.initialize();
			MessageToast.show("buenas");
		}
   });
});*/



// set products demo model on this sample
/*oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui/demo/mock/products.json'));
window.alert(oProductsModel.toString());
oProductsModel.setSizeLimit(1000);
this.setModel(oProductsModel, 'products');*/

// set riesgos model on this sample
/*Model = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", {annotationURI:"/xsodata/riesgo.xsodata/ListaRiesgos"});

//var oODataJSONModel = new sap.ui.model.json.JSONModel();
//oODataJSONModel.setData({ modelData : oModel});
this.setModel(oModel,'riesgos');*/

/*var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata");
var oData = oModel.read("/ListaRiesgos");

var oODataJSONModel = new sap.ui.model.json.JSONModel();
oODataJSONModel.setData({ modelData : oData });
this.setModel(oODataJSONModel,'riesgos');*/
