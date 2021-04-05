/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";


/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/

/***************** CREACION/ELIMINACION Y MODIFICACION DEL RIESGO *******************/
//responsable,titulo,descripcion,ambito,posibles_causas,posibles_fuentes
function crearRiesgo(param) {
	//try {
		var output = "Access Users records !";
		var stmt = 'select * from "'+ param.afterTableName + '"', 
	    xStmt = param.connection.prepareStatement( stmt ).executeQuery();
	    var data = xStmt._rows[0];
	    var responsable = xStmt._rows[0][1];
	    var titulo = xStmt._rows[0][2];
	    var descripcion = xStmt._rows[0][3];
		var ambito = xStmt._rows[0][4];
	    var causas = xStmt._rows[0][5];
	    var fuentes = xStmt._rows[0][6];
	    var estado = xStmt._rows[0][9];
	    
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("INSERT INTO \"RIESGO\" " +
			"(RESPONSABLE,TITULO,DESCRIPCION,AMBITO,POSIBLES_CAUSAS,POSIBLES_FUENTES,ESTADO) " +
			"VALUES('" + responsable+ "','" + titulo + "','" + descripcion + "','" + ambito + "','" + causas
			+ "','" + fuentes + "','" + estado + "')");
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		//ANIADIR FECHA INICIO
		
		getRow.close();
		conn.close();
		xStmt.close();
		return data;
	/*} catch (e) {
		console.error(e);
		throw e;
	}*/
}

function eliminarRiesgo(param) {
	try {
		var output = "Access Users records !";
		var stmt = 'select * from "'+ param.afterTableName + '"', 
	    xStmt = param.connection.prepareStatement( stmt ).executeQuery();
	    var id = xStmt._rows[0][0];
		
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET FECHA_FIN = CURRENT_DATE WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET ESTADO = 'Cerrado' WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function modificarRiesgoDescripcion(param) {
	try{
		var output = "Access Users records !";
		var stmt = 'select * from "'+ param.afterTableName + '"', 
	    xStmt = param.connection.prepareStatement( stmt ).executeQuery();
	    var id = xStmt._rows[0][0];
	    var descripcion = xStmt._rows[0][3];
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET DESCRIPCION='" + descripcion + "' WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET FECHA_INICIO = CURRENT_DATE WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		getRow.close(); //ARREGLAR RESPUESTA
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}


function modificarRiesgoAmbito(param) {
	try{
		var output = "Access Users records !";
		var stmt = 'select * from "'+ param.afterTableName + '"', 
	    xStmt = param.connection.prepareStatement( stmt ).executeQuery();
	    var id = xStmt._rows[0][0];
	    var ambito = xStmt._rows[0][4];
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET AMBITO='" + ambito + "' WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET FECHA_INICIO = CURRENT_DATE WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		getRow.close(); //ARREGLAR RESPUESTA
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}	
}

function modificarRiesgoPosiblesCausas(param) {
	try {
		var output = "Access Users records !";
		var stmt = 'select * from "'+ param.afterTableName + '"', 
	    xStmt = param.connection.prepareStatement( stmt ).executeQuery();
	    var id = xStmt._rows[0][0];
	    var causas = xStmt._rows[0][5];
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET POSIBLES_CAUSAS='" + causas + "' WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET FECHA_INICIO = CURRENT_DATE WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		getRow.close(); //ARREGLAR RESPUESTA
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function modificarRiesgoFuentes(param) {
	try {
		var output = "Access Users records !";
		var stmt = 'select * from "'+ param.afterTableName + '"', 
	    xStmt = param.connection.prepareStatement( stmt ).executeQuery();
	    var id = xStmt._rows[0][0];
	    var fuentes = xStmt._rows[0][6];
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET POSIBLES_FUENTES='" + fuentes + "' WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET FECHA_INICIO = CURRENT_DATE WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		getRow.close(); //ARREGLAR RESPUESTA
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function modificarRiesgoEstado(param) {
	try {
		var output = "Access Users records !";
		var stmt = 'select * from "'+ param.afterTableName + '"', 
	    xStmt = param.connection.prepareStatement( stmt ).executeQuery();
	    var id = xStmt._rows[0][0];
	    var estado = xStmt._rows[0][9];
		
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET ESTADO='" + estado + "' WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		var getRow = conn.prepareStatement("UPDATE \"RIESGO\" SET FECHA_INICIO = CURRENT_DATE WHERE ID_RIESGO=" + id);
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

/****************************************************************************************************************/



function insertarValor(param1,param2) {
	try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("INSERT INTO \"TIPOS_RIESGO\" VALUES('" + param1 + "','" + param2 +"')");
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function actualizarValor(param1,param2,param3) {
	try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("UPDATE \"TIPOS_RIESGO\" SET TIPO_RIESGO='" + param3 + "' WHERE ID_RIESGO=" + param1 + " AND TIPO_RIESGO='" + param2 + "'");
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}


function eliminarValor(param1,param2) {
	try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("DELETE FROM \"TIPOS_RIESGO\" WHERE ID_RIESGO=" + param1 + " AND TIPO_RIESGO='" + param2 + "'");
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function borrarValores() {
	try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement("TRUNCATE TABLE TIPOS_RIESGO");
		var getrs = getRow.executeUpdate();
		output = getrs;
		conn.commit();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}


function listaRiesgos() {
	try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement( "call OBTENERLISTARIESGOS()" );
		var getrs = getRow.executeQuery();
		output = getrs;
		getrs.close();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function listaCuestionarios(){
	try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement( "call OBTENERLISTACUESTIONARIOS()" );
		var getrs = getRow.executeQuery();
		output = getrs;
		console.log(getrs);
		getrs.close();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function riesgoConcreto(param){
		try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement( "call OBTENERRIESGOCONCRETO(" + param + ")" );
		var getrs = getRow.executeQuery();
		output = getrs;
		console.log(getrs);
		getrs.close();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function cuestionarioConcreto(param){
		try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement( "call OBTENERCUESTIONARIOCONCRETO(" + param + ")" );
		var getrs = getRow.executeQuery();
		output = getrs;
		console.log(getrs);
		getrs.close();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function cuestionarioConcretoCalculos(param){
		try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement( "call OBTENERCUESTIONARIOCONCRETCALCULOS(" + param + ")" );
		var getrs = getRow.executeQuery();
		output = getrs;
		console.log(getrs);
		getrs.close();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}


function cuestionarioConcretoComentarios(param){
		try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement( "call OBTENERCUESTIONARIOCONCRETOCOMENTARIOS(" + param + ")" );
		var getrs = getRow.executeQuery();
		output = getrs;
		console.log(getrs);
		getrs.close();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function cuestionarioConcretoCuestiones(param){
		try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement( "call OBTENERCUESTIONARIOCONCRETOCUESTIONES(" + param + ")" );
		var getrs = getRow.executeQuery();
		output = getrs;
		console.log(getrs);
		getrs.close();
		getRow.close();
		conn.close();
		return output;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

function riesgoConcretoEvaluaciones(param){
		try {
		var output = "Access Users records !";
		var conn = $.db.getConnection();
		var getRow = conn.prepareStatement( "call OBTENERRIESGOEVALUACIONES(" + param + ")" );
		
		console.log(getRow);
		
		/*getRow.execute(); 
		var getrs = getRow.getResultSet();
		
		var result = {
		    records : [ ]   
		}; 

		while (getrs.next()) { 
		  result.records.push({value: getrs}); 
		} 
		
		getrs.close();
		getRow.close();
		conn.close();
		return output;*/
	} catch (e) {
		console.error(e);
		throw e;
	}
}
