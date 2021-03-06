sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/f/library"
], function(Controller, MessageToast, ODataModel, JSONModel, Filter, FilterOperator, Sorter, fioriLibrary) {
	"use strict";

	return Controller.extend("web.webapp.controller.Riesgos", {
		
		onInit: function(){
			
			//Estado de las vistas (Inicialmente solo esta la vista de riesgo desplegada y las de los detalles no)
			this.desplegado=false;
			
			//Indicamos que no hay ningun riesgo seleccionado
			this.riesgo_seleccionado=-1;
			
			//Guardamos la variable that, que nos sera util de cara al futuro
			var that=this;

			//Recogemos el modelo de la base de datos y procedemos a leer el que nos interesa en realidad
			var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", false);
			oModel.read("/ListaRiesgos", {
		        success: function(results,oData,oResponse) {
				var oODataJSONModelDLSet = new sap.ui.model.json.JSONModel();
				oODataJSONModelDLSet.setData({ "DLSet": oData });
				that.getView().setModel(oODataJSONModelDLSet, "jsonmodel");
		        },
		        error: function() {
		        	MessageToast.show("Recogida de informacion incorrecta");
		        }
		    });

			//Indicamos que no esta ordenado
			this._bDescendingSort = false;
			
			//Guardamos la referencia a la tabla
			this.oProductsTable = this.oView.byId("productsTable");

		},
		onNavegacionPrincipal: function(oEvent){
			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(sap.f.LayoutType.OneColumn);
			this.desplegado = false;
			this.riesgo_seleccionado=-1;
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("appHome");
		},
		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new sap.ui.model.Filter("TITULO", sap.ui.model.FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function () {
			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(sap.f.LayoutType.OneColumn);
			this.riesgo_seleccionado = -1;
			this.desplegado = false;
			
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("creacionriesgo");
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new sap.ui.model.Sorter("ID_RIESGO", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

		onListItemPress: function (oEvent) {
			
			//Recogemos el riesgo indicado
			var productPath = oEvent.getSource().getBindingContext("jsonmodel").getPath(),
			product = productPath.split("/").slice(-1).pop();
			
			//Recogemos modelo para ver a que corresponde el elemento seleccionado
			var aux = this.getView().getModel("jsonmodel");
			var riesgo = aux.getProperty("/DLSet/data/results/" + product.toString() + "/ID_RIESGO");
			
			if(this.desplegado == false && this.riesgo_seleccionado == -1){ //depslegamos
				var oFCL = this.oView.getParent().getParent();
				oFCL.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
				
				//Enviamos información al view complmentario
				sap.ui.getCore().getEventBus().publish(
		        "canalRiesgoDetalleRiesgo",
		        "SomeEvent",
		        riesgo.toString()
		    	);
		    	
		    	//Guardamos el riesgo seleccionado
		    	this.riesgo_seleccionado = riesgo;
		    	
		    	//Indicamos que esta desplegado la vista detallada;
		    	this.desplegado = true;
		    	
			}else if(this.desplegado == true && this.riesgo_seleccionado == riesgo){
				
				oFCL = this.oView.getParent().getParent();
				oFCL.setLayout(sap.f.LayoutType.OneColumn);
				
				this.riesgo_seleccionado = -1;
				
				//Indicamos que ya no esta desplegado la vista detallada;
		    	this.desplegado = false;
		    	
				
			}else if(this.desplegado == true && this.riesgo_seleccionado != riesgo){
				
				//Enviamos información al view complmentario
				sap.ui.getCore().getEventBus().publish(
		        "canalRiesgoDetalleRiesgo",
		        "SomeEvent",
		        riesgo.toString()
		    	);
				
				//Indicamos el nuevo riesgo seleccionado
				this.riesgo_seleccionado = riesgo;
				
				//Indicamos que ya no esta desplegado la vista detallada;
		    	this.desplegado = true;
			}
			
		}
	});
});
