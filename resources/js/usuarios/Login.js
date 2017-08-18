var urlCtrl = "usuarios/"; 

function Registro(){
	var obj = UserInterfaceToData($("#form"));
	 $.ajax({
        url: urlCtrl + "registro/save",
        type: "POST",
        data: obj,
        success: function (resp) {
        	ValidateErrors($("#form"), resp);
            if (resp.code == 0) {
            	$('#modRegistro').modal('hide');
            	AlertToastr(resp.code, resp.msg, resp.title, 3);
            	$('#UserMenu').click();
            }
            else if (resp.code == 1 || resp.code == 2) {
            	AlertToastr(resp.code, resp.msg, resp.title, 3);
            }
        }
    });
}

function Login(){
	var obj = UserInterfaceToData($("#FrmLogin"));
	 $.ajax({
        url: "j_spring_security_check",
        type: "POST",
        data: obj,
        success: function (resp) {
        	var estatus = resp.trim().substring(0,1);
        	if(estatus == "0"){
        		AlertToastr(0, "Redireccionando...", "", 1);
        		setTimeout(function () {location.reload();}, 1000);
        	}
        	else{
        		AlertToastr(3, "Nombre de usuario o contraseña incorrecta", "", 3);
        	}
        }
    });
}