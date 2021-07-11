<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
    data-params="HelloWorld.instance({message: 'Hello world'})">
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.20/datatables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.6.2/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.print.min.js"></script>
    <script type="text/javascript"
        src="https://cdn.datatables.net/colreorder/1.5.2/js/dataTables.colReorder.min.js"></script>

    <div class="panel panel-primary" id="main_panel">
        <div class="panel-heading">
            <h3 class="panel-title text-center">
                Consulta de Filial
            </h3>
        </div>
        <div class="panel-body">
            <div class="panel-body">
                <div class="row">
                    <div class="table-responsive ">
                        <table id="tableDashboard" class="table table-striped table-bordered" style="width:100%">
                            <thead>
                                <tr>
                                    <th scope="col">FILIAL</th>
                                    <th scope="col">PAÍS</th>
                                    <th scope="col">CIDADE</th>
                                    <th scope="col">MOEDA</th>
                                    <th scope="col">HORÁRIO ATUAL</th>
                                    <th scope="col">FUNCIONAMENTO</th>
                                    <th scope="col">STATUS</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <br>
                    <br>
                    <div class="col-12 col-sm-2 col-md-2">

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/webdesk/vcXMLRPC.js"></script>
    <script src="src/main/webapp/resources/js/SheetJS/xlsx.full.min.js"></script>
    <script src="../webapp/resources/js/main.js"></script>

</div>
</div>