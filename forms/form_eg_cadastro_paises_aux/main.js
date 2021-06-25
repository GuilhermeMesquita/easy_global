document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        console.log('document.readyState === "complete"');
        processo().init();
    }
}




const processo = () => {

    const processo = {

        /** Funções executadas com o carregamento da página. */
        init: function () {

            console.log("init");

            if (this.isMobile == "false") {/** ----------------------------------------------- Se for Desktop */

                console.log("init - Desktop");


                if (this.formMode != "VIEW") {/**Se não for View. */

                    console.log("init - Desktop - Modo de Edição");
                    this.events();


                } else {/**Se for View. */

                    console.log("init - Desktop - View");
                }

            } else {/** ----------------------------------------------------------------------- Se for Mobile */


                console.log("init - Mobile");

                if (this.formMode != "VIEW") {/**Se não for View. */

                    console.log("init - Mobile - Modo de Edição");

                    this.events();

                } else {/**Se for View. */

                    console.log("init - Mobile - View");

                }

            }

        },
        /** Aqui ficam todos os eventos do formulário, exceto
         *  eventos de tabelas pai X filho ao adicionar uma linha nova.*/
        events: function () {

            console.log("events");
            let that = this;

            $("[value='Novo']").on("click", () => {
                this.onload.alignExcludeIcon();
            });
        },

        onload: {
            alignExcludeIcon: function () {
                $("[class*='bpm-mobile-trash-column']").css("display", "contents");
            }
        }
    }

    return processo;
}