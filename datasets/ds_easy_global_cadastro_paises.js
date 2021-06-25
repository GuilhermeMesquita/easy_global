function createDataset(fields, constraints, sortFields) {
    log.info("ds_easy_global_cadastro_paises - Inicio");

    var nome_tabela = "table_registros";
    var ds_easy_global_cadastro_paises_c1 = DatasetFactory.createConstraint("tablename", nome_tabela, nome_tabela, ConstraintType.MUST);
    var ds_easy_global_cadastro_paises_constraints = [ds_easy_global_cadastro_paises_c1];


    var dataset = DatasetFactory.getDataset("ds_form_eg_cadastro_paises_aux", null, ds_easy_global_cadastro_paises_constraints, null);
    return dataset;
}