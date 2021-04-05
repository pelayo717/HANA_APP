sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/core/Fragment"
], function(Controller,MessageToast,JSONModel,ODataModel,Fragment) {
	"use strict";

	return Controller.extend("web.webapp.controller.DetalleRiesgos", {
		onInit: function() {
			// Definimos el canal de comunicación con el controlador del riesgo
		    sap.ui.getCore().getEventBus().subscribe(
		        "canalRiesgoDetalleRiesgo",
		        "SomeEvent",
		        this.someFunctionOfTheFirstController,
		        this
		    );
		},
		
		// Esta funcion, se asocia con el escuchador, y se ejecutara
		// siempre que reciba nuevos datos. 
		// Temporal => Muestra el riesgo enviado
		someFunctionOfTheFirstController: function (sChannelId, sEventId, sData) {

		    var that=this;
		    this.riesgo_seleccionado=sData;
		    
		    var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", false);
			oModel.read("/RiesgoConcreto(" + sData.toString() + ")", {
		        success: function(results,oData,oResponse) {
					var oODataJSONModelDLSet = new sap.ui.model.json.JSONModel();
					oODataJSONModelDLSet.setData({ "DLSet": oData });
					that.getView().setModel(oODataJSONModelDLSet, "jsonmodel2");
					
					if(results["ESTADO"] == "Cerrado" && results["FECHA_FIN"] !== null){
						that.getView().byId("botonEvaluacion").setVisible(false);
						that.getView().byId("botonEliminacion").setVisible(false);
						that.getView().byId("botonCambioCausas").setVisible(false);
						that.getView().byId("botonCambioFuentes").setVisible(false);
						that.getView().byId("botonCambioDescripcion").setVisible(false);
						that.getView().byId("botonCambioAmbito").setVisible(false);
						that.getView().byId("botonCambioEstado").setVisible(false);
					}else{
						that.getView().byId("botonEvaluacion").setVisible(true);
						that.getView().byId("botonEliminacion").setVisible(true);
						that.getView().byId("botonCambioCausas").setVisible(true);
						that.getView().byId("botonCambioFuentes").setVisible(true);
						that.getView().byId("botonCambioDescripcion").setVisible(true);
						that.getView().byId("botonCambioAmbito").setVisible(true);
						that.getView().byId("botonCambioEstado").setVisible(true);

					}
		        },
		        error: function() {
		        	MessageToast.show("Recogida de informacion incorrecta");
		        }
		    });
			
			var filters = new Array();  
			var filterByName = new sap.ui.model.Filter("ID_RIESGO", sap.ui.model.FilterOperator.Contains, sData);  
			filters.push(filterByName); 
			
		    oModel.read("/RiesgoConcretoEvaluaciones", {
		    	filters:filters,
		        success: function(results,oData,oResponse) {
					var oODataJSONModelDLSet = new sap.ui.model.json.JSONModel();
					oODataJSONModelDLSet.setData({ "DLSet": oData });
					that.getView().setModel(oODataJSONModelDLSet, "jsonmodel3");
		        },
		        error: function() {
		        	MessageToast.show("Recogida de informacion incorrecta");
		        }
		    });
		    

		    oModel.read("/RiesgoConcretoImpactos", {
		    	filters:filters,
		        success: function(results,oData,oResponse) {
					var oODataJSONModelDLSet = new sap.ui.model.json.JSONModel();
					oODataJSONModelDLSet.setData({ "DLSet": oData });
					that.getView().setModel(oODataJSONModelDLSet, "jsonmodel4");
		        },
		        error: function() {
		        	MessageToast.show("Recogida de informacion incorrecta");
		        }
		    });
		    
		    
		    oModel.read("/RiesgoConcretoRiesgos", {
		    	filters:filters,
		        success: function(results,oData,oResponse) {
					var oODataJSONModelDLSet = new sap.ui.model.json.JSONModel();
					oODataJSONModelDLSet.setData({ "DLSet": oData });
					that.getView().setModel(oODataJSONModelDLSet, "jsonmodel5");
		        },
		        error: function() {
		        	MessageToast.show("Recogida de informacion incorrecta");
		        }
		    });
		    
		},
		actualizarDatos: function(){
		
		    var that=this;
		    
		    var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", false);
			oModel.read("/RiesgoConcreto(" + this.riesgo_seleccionado.toString() + ")", {
		        success: function(results,oData,oResponse) {
					var oODataJSONModelDLSet = new sap.ui.model.json.JSONModel();
					oODataJSONModelDLSet.setData({ "DLSet": oData });
					that.getView().setModel(oODataJSONModelDLSet, "jsonmodel2");
					
					if(results["ESTADO"] == "Cerrado" && results["FECHA_FIN"] !== null){
						that.getView().byId("botonEvaluacion").setVisible(false);
						that.getView().byId("botonEliminacion").setVisible(false);
						that.getView().byId("botonCambioCausas").setVisible(false);
						that.getView().byId("botonCambioFuentes").setVisible(false);
						that.getView().byId("botonCambioDescripcion").setVisible(false);
						that.getView().byId("botonCambioAmbito").setVisible(false);
						that.getView().byId("botonCambioEstado").setVisible(false);
					}else{
						that.getView().byId("botonEvaluacion").setVisible(true);
						that.getView().byId("botonEliminacion").setVisible(true);
						that.getView().byId("botonCambioCausas").setVisible(true);
						that.getView().byId("botonCambioFuentes").setVisible(true);
						that.getView().byId("botonCambioDescripcion").setVisible(true);
						that.getView().byId("botonCambioAmbito").setVisible(true);
						that.getView().byId("botonCambioEstado").setVisible(true);

					}
		        },
		        error: function() {
		        	MessageToast.show("Recogida de informacion incorrecta");
		        }
		    });

		},
		evaluarRiesgo: function(){
			MessageToast.show("Funcion de evaluación en desarollo");
		},
		
		eliminarRiesgo: function(oEvent){
			this.obtenerDialogoEliminacionRiesgo().open();
		},
		obtenerDialogoEliminacionRiesgo: function(){
			if(!this._oDialogEliminacion){
				this._oDialogEliminacion = sap.ui.xmlfragment("web.webapp.view.fragmentRisk.EliminacionRiesgo",this);
				this.getView().addDependent(this._oDialogEliminacion);
			}	
			
			return this._oDialogEliminacion;
		},
		
		cancelarEliminacionRiesgo: function(oEvent){
			MessageToast.show("Abortamos la eliminacion del riesgo");
			this.obtenerDialogoEliminacionRiesgo().close();
		},
		
		aceptarEliminacionRiesgo: function(oEvent){
			
			var that = this;
			
			//Acceso a base de datos
			//1.Cambio fecha
			//2.Cambio estado del riesgo
			//3.Quitar los botones adecuados para los riesgos eliminados
			
			//Construimos la actualizacion
			var actualizacion = {};
			
			//Recogemos el modelo
			var modeloRiesgo = this.getView().getModel("jsonmodel2").getData();
			actualizacion = modeloRiesgo["DLSet"]["data"];

			//Construimos llamada
			var oDataConfig = {}
			oDataConfig.json = true;
			oDataConfig.defaultUpdateMethod = "PUT";
			oDataConfig.useBatch = false;
			
			//Introducimos datos en BBDD
			var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", oDataConfig);
			oModel.update("/EliminarRiesgo(" + this.riesgo_seleccionado + ")",actualizacion,
							{
					success: function() {
						alert("VAMOS BIEN");	
					}, 
					error: function(e) {
						alert("RESPUESTA MAL CONSTRUIDA");
						that.actualizarDatos(); //Temporal
					} 
				});
			

			//Quitar los botones de edicion del riesgo (solo para los riesgos eliminados)
			//Quitar boton evaluacion y eliminacion (solo para el riesgo eliminado)
			this.getView().byId("botonEvaluacion").setVisible(false);
			this.getView().byId("botonEliminacion").setVisible(false);
			this.getView().byId("botonCambioCausas").setVisible(false);
			this.getView().byId("botonCambioFuentes").setVisible(false);
			this.getView().byId("botonCambioDescripcion").setVisible(false);
			this.getView().byId("botonCambioAmbito").setVisible(false);
			this.getView().byId("botonCambioEstado").setVisible(false);

			
			this.obtenerDialogoEliminacionRiesgo().close();
		},
		
		cambioCausas: function(oEvent){
        	this.obtenerDialogoCausas().open();
		},
		cambioFuentes: function(oEvent){
        	this.obtenerDialogoFuentes().open();
		},
		cambioDescripcion: function(oEvent){
        	this.obtenerDialogoDescripcion().open();
		},
		cambioAmbito: function(oEvent){
        	this.obtenerDialogoAmbito().open();
		},
		cambioEstado: function(oEvent){
        	this.obtenerDialogoEstado().open();
		},
		obtenerDialogoCausas : function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("web.webapp.view.fragmentRisk.CambioCausas",this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
    	},
    	obtenerDialogoFuentes : function () {
			if (!this._oDialogFuentes) {
				this._oDialogFuentes = sap.ui.xmlfragment("web.webapp.view.fragmentRisk.CambioFuentes",this);
				this.getView().addDependent(this._oDialogFuentes);
			}
			return this._oDialogFuentes;
    	},
    	obtenerDialogoDescripcion : function () {
			if (!this._oDialogDescripcion) {
				this._oDialogDescripcion = sap.ui.xmlfragment("web.webapp.view.fragmentRisk.CambioDescripcion",this);
				this.getView().addDependent(this._oDialogDescripcion);
			}
			return this._oDialogDescripcion;
    	},
    	obtenerDialogoAmbito : function () {
			if (!this._oDialogAmbito) {
				this._oDialogAmbito = sap.ui.xmlfragment("web.webapp.view.fragmentRisk.CambioAmbito",this);
				this.getView().addDependent(this._oDialogAmbito);
			}
			return this._oDialogAmbito;
    	},
    	obtenerDialogoEstado : function () {
			if (!this._oDialogEstado) {
				this._oDialogEstado = sap.ui.xmlfragment("web.webapp.view.fragmentRisk.CambioEstado",this);
				this.getView().addDependent(this._oDialogEstado);
			}
			return this._oDialogEstado;
    	},
		salvarDialogoCausas : function () {
			var that=this;
			var value=sap.ui.getCore().byId("ContenedorCausas").getValue();
			sap.ui.getCore().byId("ContenedorCausas").setValue("");
			this.obtenerDialogoCausas().close();
			
			if(value==""){
				MessageToast.show("Debe introducir el texto correspondiente para poder actualizar el riesgo");
			}else{
				//Construimos Actualizacion
				var actualizacion = {};
				
				//Recogemos el modelo
				var modeloRiesgo = this.getView().getModel("jsonmodel2").getData();
				actualizacion = modeloRiesgo["DLSet"]["data"];
				actualizacion.POSIBLES_CAUSAS = value;
				
				//Construimos llamada
				var oDataConfig = {}
				oDataConfig.json = true;
				oDataConfig.defaultUpdateMethod = "PUT";
				oDataConfig.useBatch = false;
				
				//Introducimos datos en BBDD
				var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", oDataConfig);
				oModel.update("/ModificarRiesgoCausas(" + this.riesgo_seleccionado + ")",actualizacion,
								{
						success: function() {
							alert("VAMOS BIEN");	
						}, 
						error: function(e) {
							alert("RESPUESTA MAL CONSTRUIDA");
							that.actualizarDatos(); //Temporal
						} 
					});
				
			}
		},
		salvarDialogoFuentes : function () {
			var that=this;
			var value=sap.ui.getCore().byId("ContenedorFuentes").getValue();
			sap.ui.getCore().byId("ContenedorFuentes").setValue("");
			this.obtenerDialogoFuentes().close();
			
			if(value==""){
				MessageToast.show("Debe introducir el texto correspondiente para poder actualizar el riesgo");
			}else{
				//Construimos Actualizacion
				var actualizacion = {};
				
				//Recogemos el modelo
				var modeloRiesgo = this.getView().getModel("jsonmodel2").getData();
				actualizacion = modeloRiesgo["DLSet"]["data"];
				actualizacion.POSIBLES_FUENTES = value;
				
				//Construimos llamada
				var oDataConfig = {}
				oDataConfig.json = true;
				oDataConfig.defaultUpdateMethod = "PUT";
				oDataConfig.useBatch = false;
				
				//Introducimos datos en BBDD
				var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", oDataConfig);
				oModel.update("/ModificarRiesgoFuentes(" + this.riesgo_seleccionado + ")",actualizacion,
								{
						success: function() {
							alert("VAMOS BIEN");	
						}, 
						error: function(e) {
							alert("RESPUESTA MAL CONSTRUIDA");
							that.actualizarDatos(); //Temporal
						} 
					});
			}
		},
		salvarDialogoDescripcion : function () {
			var that=this;
			var value=sap.ui.getCore().byId("ContenedorDescripcion").getValue();
			sap.ui.getCore().byId("ContenedorDescripcion").setValue("");
			this.obtenerDialogoDescripcion().close();
			
			if(value==""){
				MessageToast.show("Debe introducir el texto correspondiente para poder actualizar el riesgo");
			}else{
				//Construimos Actualizacion
				var actualizacion = {};
				
				//Recogemos el modelo
				var modeloRiesgo = this.getView().getModel("jsonmodel2").getData();
				actualizacion = modeloRiesgo["DLSet"]["data"];
				actualizacion.DESCRIPCION = value;
				
				//Construimos llamada
				var oDataConfig = {}
				oDataConfig.json = true;
				oDataConfig.defaultUpdateMethod = "PUT";
				oDataConfig.useBatch = false;
				
				//Introducimos datos en BBDD
				var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", oDataConfig);
				oModel.update("/ModificarRiesgoDescripcion(" + this.riesgo_seleccionado + ")",actualizacion,
								{
						success: function() {
							alert("VAMOS BIEN");	
						}, 
						error: function(e) {
							alert("RESPUESTA MAL CONSTRUIDA");
							that.actualizarDatos(); //Temporal
						} 
					});
			}
		},
		salvarDialogoAmbito : function (oEvent) {
			var that=this;
			var value=sap.ui.getCore().byId("ContenedorAmbito").getSelectedItem();
			this.obtenerDialogoAmbito().close();
			if(value.toString().includes("Interno")){
				value="Interno";
			}else if(value.toString().includes("Ambos")){
				value="Ambos";
			}else if(value.toString().includes("Externo")){
				value="Externo";
			}
			
			//Construimos Actualizacion
			var actualizacion = {};
			
			//Recogemos el modelo
			var modeloRiesgo = this.getView().getModel("jsonmodel2").getData();
			actualizacion = modeloRiesgo["DLSet"]["data"];
			
			//Comprobamos si el ambito es el mismo, para no realizar tareas de forma innecesaria
			if(value == actualizacion["AMBITO"]){
				MessageToast.show("El ambito seleccionado es el mismo que ya tiene asignado el riesgo");
			}else{
				//Actualizamos el ambito
				actualizacion.AMBITO = value;
				
				//Construimos llamada
				var oDataConfig = {}
				oDataConfig.json = true;
				oDataConfig.defaultUpdateMethod = "PUT";
				oDataConfig.useBatch = false;
				
				//Introducimos datos en BBDD
				var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", oDataConfig);
				oModel.update("/ModificarRiesgoAmbito(" + this.riesgo_seleccionado + ")",actualizacion,
								{
						success: function() {
							alert("VAMOS BIEN");	
						}, 
						error: function(e) {
							alert("RESPUESTA MAL CONSTRUIDA");
							that.actualizarDatos(); //Temporal
						} 
					});
			}
		},
		salvarDialogoEstado: function(){
			var that=this;
			var value=sap.ui.getCore().byId("ContenedorEstado").getSelectedItem();
			this.obtenerDialogoEstado().close();
			if(value.toString().includes("Notratado")){
				value="No tratado";
			}else if(value.toString().includes("Monitorizando")){
				value="Monitorizando";
			}else if(value.toString().includes("Tratando")){
				value="Tratando";
			}else if(value.toString().includes("Cerrado")){
				value="Cerrado";
			}
			
			//Construimos Actualizacion
			var actualizacion = {};
			
			//Recogemos el modelo
			var modeloRiesgo = this.getView().getModel("jsonmodel2").getData();
			actualizacion = modeloRiesgo["DLSet"]["data"];
			
			//Comprobamos si el ambito es el mismo, para no realizar tareas de forma innecesaria
			if(value == actualizacion["ESTADO"]){
				MessageToast.show("El ambito seleccionado es el mismo, que ya tiene asignado el riesgo");
			}else{
				//Actualizamos el ambito
				actualizacion.ESTADO = value;
				
				//Construimos llamada
				var oDataConfig = {}
				oDataConfig.json = true;
				oDataConfig.defaultUpdateMethod = "PUT";
				oDataConfig.useBatch = false;
				
				//Introducimos datos en BBDD
				var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", oDataConfig);
				oModel.update("/ModificarRiesgoEstado(" + this.riesgo_seleccionado + ")",actualizacion,
								{
						success: function() {
							alert("VAMOS BIEN");	
						}, 
						error: function(e) {
							alert("RESPUESTA MAL CONSTRUIDA");
							that.actualizarDatos(); //Temporal
						} 
					});
			}
		},
		cerrarDialogoCausas : function () {
			sap.ui.getCore().byId("ContenedorCausas").setValue("");
			this.obtenerDialogoCausas().close();
		},
		cerrarDialogoFuentes : function () {
			sap.ui.getCore().byId("ContenedorFuentes").setValue("");
			this.obtenerDialogoFuentes().close();
		},
		cerrarDialogoDescripcion : function () {
			sap.ui.getCore().byId("ContenedorDescripcion").setValue("");
			this.obtenerDialogoDescripcion().close();
		},
		cerrarDialogoAmbito : function () {
			this.obtenerDialogoAmbito().close();
		},
		cerrarDialogoEstado : function () {
			this.obtenerDialogoEstado().close();
		}
	});
});
