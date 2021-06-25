var key = "aOlSRCfErzkTeDMEXmiH";
// https://timezoneapi.io/api/timezone/?${zone}/${cidades}&token=${key}

const verify = () => {
    var id = $("#table_registros tbody > tr:last-child > td > select")[0].id.split("___")[1];
    if ($(`filial___${id}`).val() != "" && $(`#continente___${id}`).val() != "" && $(`#pais___${id}`).val() != "" && $(`#cidade___${id}`).val() != "" && $(`#horario___${id}`).val() != "") {
        // reqTimezone(document.getElementById(`cidade___${id}`).value);
    }
}


