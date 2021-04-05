sap.ui.define([
	/*"sap/ui/core/mvc/XMLView"*/
	"sap/ui/core/ComponentContainer"
], function (/*XMLView*/ComponentContainer) {
	"use strict";
	
	new ComponentContainer({
		name:"web.webapp",
		settings:{
			id: "webapp"
		},
		async: true
	}).placeAt("content");

});

//REUTILIZAR
/*XMLView.create({
	viewName: "web.webapp.view.App"
}).then(function (oView) {
	oView.placeAt("content");
});*/