var dttable = [];


document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        console.log("easy_global - onreadystatechange");

        process().init();
    }
}



var process = () => {
    let processo = {

        init: async function () {
            console.log("easy_global - init");
            this.events();
            await this.reqTimezone();
            this.onload.getSeconds();
        },

        // Função que retorna os valores do DS customizado (Formulário Auxiliar de cadastro de filiais)
        getDS: function () {
            return DatasetFactory.getDataset("ds_easy_global", null, null, null);
        },

        // Função responsável pela requisição da API Timezone, puxando informações via DS customizado também.
        reqTimezone: async function (location) {
            const ds_form_eg_aux = this.getDS();
            console.log(ds_form_eg_aux);
            var obj_req = {};
            var urls = [];
            for (var i = 0; i < ds_form_eg_aux.values.length; i++) {
                var key = "aOlSRCfErzkTeDMEXmiH";
                var continente = ds_form_eg_aux.values[i]["Continente"];
                var filial = ds_form_eg_aux.values[i]["Filial"];
                var pais = ds_form_eg_aux.values[i]["Pais"];
                var cidade = ds_form_eg_aux.values[i]["Cidade"];
                var fechamento = ds_form_eg_aux.values[i]["Horario"];
                pais = pais.replace(" ", "%");

                var url = `https://timezoneapi.io/api/timezone/?${continente}/${cidade}&token=${key}`;
                urls.push(url);
            }

            urls.forEach(async (e, i) => {
                let requisicao = await fetch(e);
                let retorno_requisicao = await requisicao.json();

                var moeda = retorno_requisicao["data"]["timezone"].currency_name;
                var horario_atual = retorno_requisicao["data"]["datetime"].time;



                obj_req = {
                    "moeda": moeda,
                    "horario_atual": horario_atual,
                }


                dttable.push(obj_req);
                if (e == urls[urls.length - 1]) this.initializeDataTable(dttable);
            });
        },

        // Função responsável por inicializar o DataTable de maneira dinâmica, puxando os valores do DS customizado e da Requisição da API Timezone.
        initializeDataTable: function (tabela) {
            const ds_form_eg_aux = this.getDS();
            for (var i = 0; i < ds_form_eg_aux.values.length; i++) {
                if (tabela[i] === undefined) {
                    $("[class^=wcm-all-content]").css("opacity", "0.5");
                    $("[id^=main_panel]").css("display", "none");

                    this.showToast("Erro.\n",
                        "Houve um erro! Favor recarregar a página.\n",
                        "danger"
                    );

                    $("#tableDashboard tbody > tr").length = 0;
                }
                document.querySelector("#tableDashboard tbody").innerHTML += "<tr>" +
                    "<td>" + ds_form_eg_aux.values[i]["Filial"] + "</td>" +
                    "<td>" + ds_form_eg_aux.values[i]["Pais"] + "</td>" +
                    "<td>" + ds_form_eg_aux.values[i]["Cidade"] + "</td>" +
                    "<td>" + tabela[i]["moeda"] + "</td>" +
                    `<td id='horario_atual___${i}'>` + tabela[i]["horario_atual"] + "</td>" +
                    `<td id='fechamento___${i}'>` + ds_form_eg_aux.values[i]["Horario"] + "</td>"
            }

            // Estrutura de repetição responsável pelo STATUS
            var date = new Date();
            for (var i = 0; i < $("#tableDashboard tbody > tr").length; i++) {
                var [hora, minutos, segundos] = document.querySelector(`#horario_atual___${i}`).innerText.split(":");
                date.setHours(hora);
                date.setMinutes(minutos);
                date.setSeconds(segundos);

                var fechamento_abertura = document.querySelector(`#fechamento___${i}`).innerText.split(":")[0];
                var fechamento_fim = document.querySelector(`#fechamento___${i}`).innerText.split(":")[1].split("-")[1].trim();

                if (date.getHours() < fechamento_abertura || date.getHours() > fechamento_fim) {
                    document.querySelector(`#tableDashboard`).children[1].children[i].innerHTML += `<td id='stat___${i}' style='color: red;'>FECHADO</td>`
                } else {
                    document.querySelector(`#tableDashboard`).children[1].children[i].innerHTML += `<td id='stat___${i}'  style='color: green;'>ABERTO</td>`
                }
            }


            // Configurações do DataTable
            $("#tableDashboard").DataTable({
                responsive: true,
                searching: false,
                bPaginate: true,
                bLengthChange: false,
                bFilter: true,
                bInfo: true,
                bAutoWidth: true,
                pageLength: 5,
                scrollX: true,
                language: {
                    sSearch: 'Buscar:',
                    sEmptyTable: 'Nenhum registro encontrado',
                    sInfo: '',
                    sInfoEmpty: 'Mostrando 0 á 0 de 0 registros',
                    sInfoFiltered: '(Filtrados TODOS os registros)',
                    sInfoPostFix: '',
                    sInfoThousands: '.',
                    sLengthMenu: '_MENU_ resultados por página',
                    sLoadingRecords: 'Carregando...',
                    sProcessing: 'Processando...',
                    sZeroRecords: 'Nenhum registro encontrado',
                    oPaginate: {
                        sNext: 'Próximo',
                        sPrevious: 'Anterior',
                        sFirst: 'Primeiro',
                        sLast: 'Último',
                    },
                },
            });

            // Ajusta o surgimento das informações dinâmicas para juntar ao header.
            $(".dataTables_scrollBody").css("margin-top", "-2%");
        },

        // Método responsável por mostrar o toast de alerta.
        showToast: function (title, message, type = "success") {
            FLUIGC.toast({
                title: title,
                message: message,
                type: type,
            });
        },


        events: function () {

            console.log("easy_global - events");
            let that = this;
        },

        onload: {

            // Método responsável por chamar a função startSeconds.
            getSeconds: function () {
                if (document.querySelector("[id^=main_panel]").style.display != "none") {
                    setInterval("process().onload.startSeconds()", 1000);
                } else {
                    return processo;
                }
            },

            // Método responsável por contar os segundos em tempo real.
            startSeconds: function () {
                for (var i = 0; i < $("#tableDashboard tbody > tr").length; i++) {
                    var horario_atual = document.querySelector(`#horario_atual___${i}`);

                    var horas_atual = horario_atual.innerText.split(":")[0];
                    var minutos_atual = horario_atual.innerText.split(":")[1];
                    var segundos_atual = horario_atual.innerText.split(":")[2];

                    segundos_atual = Number(++segundos_atual);

                    var horas_contador = horario_atual.innerText.split(":")[0] = horas_atual;
                    var minutos_contador = horario_atual.innerText.split(":")[1] = minutos_atual;
                    var segundos_contador = horario_atual.innerText.split(":")[2] = segundos_atual;

                    if (segundos_atual >= 60) {
                        minutos_atual = Number(++minutos_atual);
                        segundos_atual = Number("00");
                        horario_atual.innerText = horas_contador + ":" + minutos_atual + ":" + segundos_atual;
                    }

                    if (minutos_atual >= 60) {
                        horas_atual = Number(++horas_atual);
                        minutos_atual = Number("00");
                        horario_atual.innerText = horas_contador + ":" + minutos_atual + ":" + segundos_atual;
                    }

                    if (horas_atual > 23) {
                        horas_atual = Number("00");
                        horario_atual.innerText = horas_contador + ":" + minutos_contador + ":" + segundos_contador;
                    }

                    horario_atual.innerText = horas_contador + ":" + minutos_contador + ":" + segundos_contador;
                    // Desenvolver funcao para este innerText
                }
            },
        }
    }
    return processo;
}