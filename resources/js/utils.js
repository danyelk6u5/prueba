function UserInterfaceToData(form) {
    var obj = new Object();
    $.each(form.serializeArray(), function (i, field) {
        try {
            field.name = field.name.replace(".", "\\.");
            obj[field.name] = field.value;
        } catch (ex) {
            console.log(ex);
        }
    })
    return obj;
}

function ValidateErrors(form, resp) {
    CleanValidation(form);
    if (resp.code == 2) {
        $.each(resp.data, function (key, value) {
            if (value != null) {
                $(form).find('span[data-valmsg-for="' + key + '"]').text(value.substring(3)).removeClass("field-validation-valid").addClass("field-validation-error");
                $(form).find('input[name="' + key + '"]').removeClass("input-validation-valid").addClass("input-validation-error");
                $(form).find('select[name="' + key + '"]').removeClass("input-validation-valid").addClass("input-validation-error");
                $(form).find('textarea[name="' + key + '"]').removeClass("input-validation-valid").addClass("input-validation-error");
            } else {
                $(form).find('span[data-valmsg-for="' + key + '"]').text("").removeClass("field-validation-error").addClass("field-validation-valid");
                $(form).find('input[name="' + key + '"]').removeClass("input-validation-error").addClass("input-validation-valid");
                $(form).find('select[name="' + key + '"]').removeClass("input-validation-error").addClass("input-validation-valid");
                $(form).find('textarea[name="' + key + '"]').removeClass("input-validation-error").addClass("input-validation-valid");
            }
        });
    }
    return resp.errors != undefined && resp.errors != null ? resp.errors.length : 0;
}

function CleanValidation(form){
    $(form).find(".field-validation-error").text("");
    $(form).find(".field-validation-error").removeClass("field-validation-error").addClass("field-validation-valid");
    $(form).find(".form-control").removeClass("input-validation-error").addClass("input-validation-valid");
}

function AlertToastr(tipo, mensaje, titulo, timeOut) {
	timeOut = timeOut * 1000;
    if (tipo == 0)
        tipo = "success";
    else if (tipo == 1)
        tipo = "error";
    else if (tipo == 2)
        tipo = "info";
    else if (tipo == 3)
        tipo = "warning";
    if (tipo === "success") {
        toastr.options.timeOut = InputHasValue(timeOut) ? timeOut : 5000;
        toastr.options.extendedTimeOut = 1000;
        toastr.options.tapToDismiss = true;
        toastr.options.positionClass = "toast-top-right";
        toastr.options.closeButton = true;
        toastr.options.progressBar = true;
    } else {
        if (InputHasValue(timeOut)) {
            toastr.options.timeOut = timeOut;
            toastr.options.extendedTimeOut = 1000;
            toastr.options.tapToDismiss = true;
            toastr.options.positionClass = "toast-top-right";
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
        }
        else {
            toastr.options.timeOut = 0;
            toastr.options.extendedTimeOut = 0;
            toastr.options.tapToDismiss = false;
            toastr.options.positionClass = "toast-top-full-width";
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
        }
    }
    if (InputHasValue(titulo))
        toastr[tipo](mensaje, titulo);
    else
        toastr[tipo](mensaje);
}

function InputHasValue(input) {
    if (input != null && $.trim(input) != '') {
        return true;
    }
    else {
        return false;
    }
}