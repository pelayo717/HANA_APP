sap.ui.define([
	"sap/ui/core/mvc/Controller",	
	"sap/m/MessageToast"
], function(Controller,MessageToast) {
	"use strict";

	return Controller.extend("web.webapp.controller.CreacionRiesgo", {
		onNavegacionPrincipal: function(oEvent){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("riesgo");
		},
		onCrearRiesgo: function(oEvent){
			this.titulo = this.getView().byId("ContenedorTitulo").getValue();
			if(this.titulo==""){
				MessageToast.show("El campo Titulo debe estar rellenado");
			}else{
				this.responsable = this.getView().byId("ContenedorResponsable").getValue();
				if(this.responsable==""){
					MessageToast.show("El campo Responsable debe estar rellenado");
				}else{
					//Recepción de tipos de riesgos
					this.gobernanza = this.getView().byId("Gobernanza").getSelected();
					this.estrategico = this.getView().byId("Estrategico").getSelected();
					this.operacional = this.getView().byId("Operacional").getSelected();
					this.competitivo = this.getView().byId("Competitivo").getSelected();
					this.financiero = this.getView().byId("Financiero").getSelected();
					this.reputacional = this.getView().byId("Reputacional").getSelected();
					this.legal = this.getView().byId("Legal").getSelected();
					this.tecnologico = this.getView().byId("Tecnologico").getSelected();
					if(this.gobernanza != true && this.estrategico != true && this.operacional != true
						&& this.competitivo != true && this.financiero != true && this.reputacional != true 
						&& this.legal != true && this.tecnologico != true){
						MessageToast.show("Debe seleccionar al menos un tipo de riesgo");
					}else{
						this.externo = this.getView().byId("Externo").getSelected();
						this.interno = this.getView().byId("Interno").getSelected();
						if(this.externo == true && this.interno == true){ //Ambos
							this.ambito="Ambos";
						}else if(this.externo == true && this.interno != true){
							this.ambito="Externo";
						}else if(this.externo != true && this.interno == true){
							this.ambito="Interno";
						}else{
							MessageToast.show("Debe seleccionar al menos un tipo de ámbito");
						}
						
						if(this.ambito !== undefined){
							this.causas = this.getView().byId("CreacionContenedorCausas").getValue();
							this.fuentes = this.getView().byId("CreacionContenedorFuentes").getValue();
							
							//Recogemos los posibles impactos
							this.financieroImpacto = this.getView().byId("FinancieroImpacto").getSelected();
							this.reputacionalImpacto = this.getView().byId("ReputacionalImpacto").getSelected();
							this.operacionalImpacto = this.getView().byId("OperacionalImpacto").getSelected();
							this.tecnologicoImpacto = this.getView().byId("TecnologicoImpacto").getSelected();
							
							if(this.financieroImpacto != true && this.reputacionalImpacto != true &&
								this.operacionalImpacto != true && this.tecnologicoImpacto != true){
									MessageToast.show("Debe seleccionar al menos un posible impacto del riesgo");
								}else{
									this.descripcion = this.getView().byId("CreacionContenedorDescripcion").getValue();
									this.guardarRiesgo();
									this.guardarTiposRiesgo();
									this.guardarTiposImpacto();
								
									var oRouter = this.getOwnerComponent().getRouter();
									oRouter.navTo("riesgo");
									
								}
						}
					}
				}
			}

		},
		guardarRiesgo: function(){
			//Creamos el riesgo

			//Construimos Actualizacion
			var actualizacion = {};

			actualizacion.RESPONSABLE = this.responsable;
			actualizacion.TITULO = this.titulo;
			actualizacion.DESCRIPCION = this.descripcion;
			actualizacion.POSIBLES_CAUSAS = this.causas;
			actualizacion.POSIBLES_FUENTES = this.fuentes;
			actualizacion.AMBITO = this.ambito;
			actualizacion.ESTADO = "No tratado";
			
			/*var oDataConfig = {}
			oDataConfig.json = true;
			oDataConfig.defaultUpdateMethod = "PUT";
			oDataConfig.useBatch = false;*/
			
			
			//Introducimos datos en BBDD
			var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata"/*, oDataConfig*/);
			oModel.create("/CrearRiesgo", actualizacion,
							{
					success: function() {
						alert("VAMOS BIEN");	
					}, 
					error: function(e) {
						alert("RESPUESTA MAL CONSTRUIDA");
					} 
				});
				
			
		},
		guardarTiposRiesgo: function(){
			//alert("GUARDAMOS DATOS EN TIPOS_RIESGO");
		},
		guardarTiposImpacto: function(){
			//alert("GUARDAMOS DATOS EN TIPOS_IMPACTO");
		}
	});
});









