sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/odata/v2/ODataModel",
   "sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast, JSONModel, ODataModel, ResourceModel) {
   "use strict";
   return Controller.extend("web.webapp.controller.Home", {
   	
   		onInit: function(){
   			
		    //Guardamos this en that
		    var that=this;
		    
		    //Recogo el oData
		    var oModel = new sap.ui.model.odata.v2.ODataModel("/xsodata/riesgo.xsodata", false /*{annotationURI:"/xsodata/riesgo.xsodata/ListaRiesgos"}*/);

			//Leo del odata la lista de riesgos
			oModel.read("/ListaRiesgos", {
		        success: function(results,oData,oResponse) {
		        	var cantidad= results.results;
					var modeloFinal = {
						numero: 5
					};
					
					//Asignamos a nuestro modelo, el numero de riesgos
					modeloFinal.numero=cantidad.length;
					oModel = new JSONModel(modeloFinal);
					that.getView().setModel(oModel,"cantidadRiesgos");
		        },
		        error: function() {
		        	MessageToast.show("Recogida de informacion incorrecta");
		        }
		    });
		    
		    //Leo del odata la lista de cuestionarios
			oModel.read("/ListaCuestionarios", {
		        success: function(results,oData,oResponse) {
		        	var cantidad= results.results;
					var modeloFinal = {
						numero: 5
					};
					
					//Asignamos a nuestro modelo, el numero de riesgos
					modeloFinal.numero=cantidad.length;
					oModel = new JSONModel(modeloFinal);
					that.getView().setModel(oModel,"cantidadCuestionarios");
		        },
		        error: function() {
		        	MessageToast.show("Recogida de informacion incorrecta");
		        }
		    });
		    

			// set i18n model on view
			/*var i18nModel = new ResourceModel({
				bundleName: "web.webapp.i18n.i18n",
				supportedLocales: [""],
				fallbackLocale: ""
			});
			
			// Establecemos el modelo i18n para las propiedades 
			this.getView().setModel(i18nModel, "i18n");*/
			
	/*============================================================================================================================================*/

		    var data = {
				"accounts": [
				{
					"Impacto": "1-2",
					"Probabilidad": "0-30",
					"Cantidad": "2"
				},
				{
					"Impacto": "1-2",
					"Probabilidad": "30-60",
					"Cantidad": "1"
				},
				{
					"Impacto": "1-2",
					"Probabilidad": "60-100",
					"Cantidad": "3"
				},
				{
					"Impacto": "2-4",
					"Probabilidad": "0-30",
					"Cantidad": "5"
				},
				{
					"Impacto": "2-4",
					"Probabilidad": "30-60",
					"Cantidad": "10"
				},
				{
					"Impacto": "2-4",
					"Probabilidad": "60-100",
					"Cantidad": "1"
				},
				{
					"Impacto": "4-6",
					"Probabilidad": "0-30",
					"Cantidad": "2"
				},
				{
					"Impacto": "4-6",
					"Probabilidad": "30-60",
					"Cantidad": "4"
				},
				{
					"Impacto": "4-6",
					"Probabilidad": "60-100",
					"Cantidad": "16"
				},
				{
					"Impacto": "6-8",
					"Probabilidad": "0-30",
					"Cantidad": "2"
				},
				{
					"Impacto": "6-8",
					"Probabilidad": "30-60",
					"Cantidad": "1"
				},
				{
					"Impacto": "6-8",
					"Probabilidad": "60-100",
					"Cantidad": "1"
				},
				{
					"Impacto": "8-10",
					"Probabilidad": "0-30",
					"Cantidad": "3"
				},
				{
					"Impacto": "8-10",
					"Probabilidad": "30-60",
					"Cantidad": "1"
				},
				{
					"Impacto": "8-10",
					"Probabilidad": "60-100",
					"Cantidad": "0"
				}
				]
			};

			// Creamos el modelo mediante el json
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);

		    // Recogemos vizframe y establecemos el modelo
		    var oVizFrameMatrix = this.getView().byId("matrizRiesgos");
 			oVizFrameMatrix.setModel(oModel);
 			
 			// Construimos el metada para los ejes y los datos
		    var dataset = new sap.viz.ui5.data.FlattenedDataset({
		      dimensions: [{
		          name: "Impacto",
		          value: "{Impacto}"
		        },
		        {
		          name: "Probabilidad",
		          value: "{Probabilidad}"
		        }
		      ],
		      measures: [{
		        name: "Cantidad",
		        value: "{Cantidad}"
		      }],
		      data: {
		        path: "/accounts",
		        events: {
		          dataReceived: function(oEvent) {}
		        }
		      }
		    });
			  
			// Establecemos los datos e indicamos el tipo de gráfico
			oVizFrameMatrix.setDataset(dataset);
			oVizFrameMatrix.setVizType('heatmap');
			
			// Incluimos los valores que se presentaran de pulsar en un cuadrado
			var oFeedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      "uid": "color",
		      "type": "Measure",
		      "values": ["Cantidad"]
		    });
		    var feedCategoryAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      "uid": "categoryAxis2",
		      "type": "Dimension",
		      "values": ["Probabilidad"]
		    });
		    var feedCategoryAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      "uid": "categoryAxis",
		      "type": "Dimension",
		      "values": ["Impacto"]
		    });
			
			// Aniadimos estos valores de cada cuadrado al VizFrame
			oVizFrameMatrix.addFeed(oFeedValueAxis);
			oVizFrameMatrix.addFeed(feedCategoryAxis1);
			oVizFrameMatrix.addFeed(feedCategoryAxis2);
			
			// Indicamos las propiedades
			oVizFrameMatrix.setVizProperties({
		      legend: {
		        formatString: "#0",
		        visible: false
		      },
		      plotArea: {
		        dataLabel: {
		          visible: false
		        }
		      },
		      dataLabel: {
		        formatString: "#,##0.00",
		        visible: false
		      },
		      title: {
		      	text: "Riesgos por Criterio",
		        visible: true
		      }
		
		    });
		    
		    // Aniadimos las escalas para la leyenda
			var scales = [{
		      "feed": 'color',
		      "numOfSegments": 9,
		      "legendValues": [0,2,4,6,10,12,14,16,18,20],
		      "palette": ["sapUiChartPaletteSequentialHue2Light3",
		        "sapUiChartPaletteSequentialHue2Light1",
		        "sapUiChartPaletteSequentialHue2",
		        "sapUiChartPaletteSequentialHue2Dark2"
		      ]
		    }];
			oVizFrameMatrix.setVizScales(scales);

	/*===========================================================================================================================================*/
			
			// Obtenemos el identificador del fram
			var oVizFrame = this.getView().byId("graficoRiesgos");
			
			// Creamos el json y el odata
			var oModel = new sap.ui.model.json.JSONModel();
			var data = {
			'cantidad' : [
			{"Model": "No tratar","Value": "12"},
			{"Model": "Monitorizar","Value": "15"},
			{"Model": "Tratar","Value": "4"},
			{"Model": "Tratar Urg.","Value": "1"},
			]};
			oModel.setData(data);

 			// Construimos el metada para los ejes y los datos
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions : [{
				name : 'Tipo',
				value : '{Model}'}],
				
				measures : [{
				name : 'Cantidad',
				value : '{Value}'} ],
				
				data : {
				path : "/cantidad"
				}
			});
			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);
			oVizFrame.setVizType('bar');
			
			
			// Establecemos algunas propiedades al gráfico
			oVizFrame.setVizProperties({
			plotArea: { colorPalette : d3.scale.category20().range()},
			legend: { visible: false},
			title: {visible: true, text: "Riesgos por tipo de Evaluación"}
			});
			
			var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			'uid': "valueAxis",
			'type': "Measure",
			'values': ["Cantidad"]
			}),
			feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			'uid': "categoryAxis",
			'type': "Dimension",
			'values': ["Tipo"]
			});
			oVizFrame.addFeed(feedValueAxis);
			oVizFrame.addFeed(feedCategoryAxis);
   		},
	   	onNavegacionRiesgos: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("riesgo");
		},
	   	onNavegacionCuestionarios: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("cuestionario");
		},
	   	onNavegacionPendientes: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("pendientes");
		}
   });

});