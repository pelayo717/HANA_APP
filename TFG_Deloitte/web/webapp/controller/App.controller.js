sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/odata/v2/ODataModel",
   "sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast, JSONModel, ODataModel, ResourceModel) {
   "use strict";
   return Controller.extend("web.webapp.controller.App", {
   });
});

//REUTILIZAR
/*onShowHello : function () {
 // read msg from i18n model
 var oBundle = this.getView().getModel("i18n").getResourceBundle();
 
 // read msg from Omodel
 var sRecipient = this.getView().getModel().getProperty("/recipient/name");

 // Construccion del mensaje
 var sMsg = oBundle.getText("helloMsg", [sRecipient]);
 
 // show message
 MessageToast.show(sMsg);
},
movimiento: function(oEvent){
	var oRouter = this.getOwnerComponent().getRouter();
	oRouter.navTo("riesgo");
}*/