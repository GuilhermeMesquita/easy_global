function createDataset(fields, constraints, sortFields) {
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("Continente");
    dataset.addColumn("Filial");
    dataset.addColumn("Pais");
    dataset.addColumn("Cidade");
    dataset.addColumn("Horario");




    //Cria a constraint para buscar os formulários ativos
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));

    var datasetPrincipal = DatasetFactory.getDataset("ds_form_aux", null, constraints, null);

    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var WKNumProces = datasetPrincipal.getValue(i, "WKNumProces");
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var constraintsFilhos = new Array();
        constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "table_registros", "table_registros", ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("ds_form_aux", null, constraintsFilhos, null);

        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                datasetFilhos.getValue(j, "continente"),
                datasetFilhos.getValue(j, "filial"),
                datasetFilhos.getValue(j, "pais"),
                datasetFilhos.getValue(j, "cidade"),
                datasetFilhos.getValue(j, "horario")));
        }
    }

    return dataset;
}