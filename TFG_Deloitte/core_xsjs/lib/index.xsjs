$.response.contentType = "text/plain";

$.import("xsjs","riesgo")

/*var SimpleLib = $.xsjs.riesgo;

var oResponse = {};
oResponse.directCall = $.xsjs.riesgo.imprimirSession();                         

$.response.setBody(JSON.stringify(oResponse));
$.response.status = $.net.http.OK;*/

var libreria = $.xsjs.riesgo;

var oResponse={};
//oResponse.directCall = $.xsjs.riesgo.insertarValor(2,'prueba');                         
/*oResponse.directCall = $.xsjs.riesgo.borrarValores();  
oResponse.directCall = $.xsjs.riesgo.insertarValor(1,'operacional');
oResponse.directCall = $.xsjs.riesgo.insertarValor(1,'financiero');
oResponse.directCall = $.xsjs.riesgo.insertarValor(3,'reputacional');
oResponse.directCall = $.xsjs.riesgo.insertarValor(2,'operacional');
oResponse.directCall = $.xsjs.riesgo.insertarValor(2,'gobernanza');
oResponse.directCall = $.xsjs.riesgo.actualizarValor(1,'operacional','prueba1');
oResponse.directCall = $.xsjs.riesgo.eliminarValor(1,'financiero');*/

//oResponse.directCall = $.xsjs.riesgo.crearRiesgo('pelayo perez','perdida xx..','el caso es que...','externo','desconocidas1','desconocidas2');
oResponse.directCall = $.xsjs.riesgo.modificarRiesgoPosiblesCausas(1,"desconodidos");



$.response.setBody(oResponse);
$.response.status = $.net.http.OK;

//$.response.setBody("Hello World");



