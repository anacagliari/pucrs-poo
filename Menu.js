import { ServicoPilotos } from "./ServicoPilotos.js";
import { ServicoAerovias } from "./ServicoAerovias.js";
import { ServicoAeronaves } from "./ServicoAeronaves.js";
import { OcupacaoAerovia } from './OcupacaoAerovia.js';

/*
Criação da Classe Menu, contendo:
    atributos privados;
    Método Construtor instanciando classes de serviços;
    criação de método para buscar aerovia pela origem e destino;
    criação de método para Buscar aerovias cadastradas entre dois aeroportos;
    criação de método para Listar as altitudes livres por data e hora;
    criação de método para Aprovar plano de voo;
    criação de método para listar todos os pilotos; *Fase1
    criação de método para buscar piloto por matricula; *Fase1
    criação de método para listar todas as aerovias; *Fase1
    criação de método para listar todas as aeronaves; *Fase1
    criação de método para Consultar plano de voo por ID;
    criação de método para Listar planos de voo por data;
    criação de método para Visualizar ocupação aerovia por data;
    criação de método para Cancelar plano de voo;
    criação de método para Gravar registros;

Criação do Menu.
*/

export class Menu {
    #servicoPiloto;
    #servicoAerovia;
    #servicoAeronave;
    #ocupacaoAerovia;

    constructor() {
        this.#servicoPiloto = new ServicoPilotos();
        this.#servicoAerovia = new ServicoAerovias();
        this.#servicoAeronave = new ServicoAeronaves();
        this.#ocupacaoAerovia = new OcupacaoAerovia();
    }

    /*
    metodo para buscar aerovia pela origem e destino informados;
    se não encontra, informa ao usuário que a aerovia não foi encontrada;
    trata erros disparados pela camada de serviço.
    */
    buscaAeroviaPorOrigemDestino(origem, destino){
        let retornoDaBusca = undefined;
        try {
            retornoDaBusca = this.#servicoAerovia.recupera(origem, destino);
        } catch (erro) {
            console.log(erro.message);
            return erro.message; //usado para o teste jest pois não consegui capturar do console.log
        }

        if (retornoDaBusca != undefined) {
            console.log(retornoDaBusca.toString());
            return retornoDaBusca.toString(); //usado para o teste jest pois não consegui capturar do console.log
        } else {
            console.log("Aerovia não encontrada!");
            return "Aerovia não encontrada!"; //usado para o teste jest pois não consegui capturar do console.log
        }
    }

    /*
    metodo para listar as altitudes livres em uma determinada aerovia em um determinado dia e horário;
    se não encontra, informa ao usuário que não há altitudes livres;
    trata erros disparados pela camada de serviço.
    */
    listarAltitudesLivres(idAerovia, data, hora) {
        let retornoDaBusca = undefined;
		let aerovia = undefined;
        try {
            retornoDaBusca = this.#ocupacaoAerovia.altitudesOcupadas(idAerovia, data, hora);
			aerovia = this.#servicoAerovia.recuperaPorId(idAerovia);
        } catch (erro) {
            console.log(erro.message);
        }

        if (aerovia != undefined) {
			console.log("Aerovia: " + aerovia.origem + " -> " + aerovia.destino)
            console.log("Ocupação:" + retornoDaBusca.toString());
        } else {
            console.log("Aerovia não encontrada!");
        }
    }

    /* 
    metodo para incluir Plano de Voo e aprovar de acordo com as Regras de negócios.
    trata erros disparados pela camada de serviço.
    */
    aprovaPlanoDeVoo(matricula, idAerovia, prefixo, altitude, dataHora) {
        let piloto = undefined;
        try {
            piloto = this.#servicoPiloto.recupera(matricula);
        } catch (erro) {
            console.log(erro.message);
        }
        if (piloto != undefined) {
            console.log(piloto.toString());
        } else {
            console.log("Piloto não encontrado!");
        }

        let aerovia = undefined;
        try {
            aerovia = this.#servicoAerovia.recuperaPorId(idAerovia);
        } catch (erro) {
            console.log(erro.message);
        }
        if (aerovia != undefined) {
            console.log(aerovia.toString());
        } else {
            console.log("Aerovia não encontrada!");
        }

        let aeronave = undefined;
        try {
            aeronave = this.#servicoAeronave.recuperaPorPrefixo(prefixo);
        } catch (erro) {
            console.log(erro.message);
        }
        if (aeronave != undefined) {
            console.log(aeronave.toString());
        } else {
            console.log("Aeronave não encontrada!");
        }
		try {
			let id = this.#ocupacaoAerovia.aprovaPlanoDeVoo(piloto, aerovia, aeronave, altitude, dataHora);
			console.log("-------------------------------------------------");
			console.log("Plano de Voo aprovado com sucesso! ID gerado: " + id);
            return "Plano de Voo aprovado com sucesso! ID gerado:";
		} catch (erro) {
			console.log(erro.message);
		}
    }

    /*
    método para mostrar ao usuário a lista de todos os pilotos carregados dentro do serviço
    */
    listaTodosPilotos(){ //fase1
        let todosPilotos = this.#servicoPiloto.todos();
        
        console.log("Lista de Pilotos:");

        for (let i = 0; i < todosPilotos.length; i++) {
            const piloto = todosPilotos[i];
            console.log(piloto.toString());
        }
    }

    /*
    metodo para mostrar ao usuário a busca do piloto pela matricula informada;
    se não encontra, informa ao usuário que o piloto não foi encontrado;
    trata erros disparados pela camada de serviço.
    */
    buscaPilotoPorMatricula(matricula){ //fase1
        let retornoDaBusca = undefined;
        try {
            retornoDaBusca = this.#servicoPiloto.recupera(matricula);
        } catch (erro) {
            console.log(erro.message);
        }

        if (retornoDaBusca != undefined) {
            console.log(retornoDaBusca.toString());
        } else {
            console.log("Piloto não encontrado!");
        }
    }

    /*
    método para mostrar ao usuário a lista de todas as aerovias carregados dentro do serviço
    */
    listaTodasAerovias(){ //fase1
        let todasAerovias = this.#servicoAerovia.todos();
        
        console.log("Lista de Aerovias:");

        for (let i = 0; i < todasAerovias.length; i++) {
            const aerovia = todasAerovias[i];
            console.log(aerovia.toString());
        }
    }

    /*
    método para mostrar ao usuário a lista de todas as aeronaves carregados dentro do serviço
    */
    listaTodasAeronaves(){ //fase1
        let todasAeronaves = this.#servicoAeronave.todos();
        
        console.log("Lista de Aeronaves:");

        for (let i = 0; i < todasAeronaves.length; i++) {
            const aeronave = todasAeronaves[i];
            console.log(aeronave.toString());
        }
    }

    /*
    metodo para mostrar ao usuário a busca do plano de voo por ID informado;
    se não encontra, informa ao usuário que o plano de voo não foi encontrado;
    */
    buscarPlanoDeVooPorId(id){
        let planosDeVoo = this.#ocupacaoAerovia.buscarPlanoDeVooPorId(id);
        if (planosDeVoo != undefined) {
            console.log(planosDeVoo.toString());
        } else {
            console.log("Plano de Voo não encontrado.");
        }
    }

    /*
    metodo para mostrar ao usuário a busca do plano de voo por data informada;
    se não encontra, informa ao usuário que o plano de voo não foi encontrado;
    */
    buscaPlanosPorData(data){
        let listaPlanosPorData = this.#ocupacaoAerovia.buscaPlanosPorData(data);
        console.log("Lista de Planos de Voos: ");
        if (listaPlanosPorData.length == 0) {
            console.log("Não há planos de voo para essa data.");
        } else {
            for (let i = 0; i < listaPlanosPorData.length; i++) {
                const element = listaPlanosPorData[i];
                let aerovia = this.#servicoAerovia.recuperaPorId(element.idAerovia);
                let origemDestino = "Origem: " + aerovia.origem + " Destino: " + aerovia.destino;
                console.log(element.toString() + origemDestino);
            }
        }
    }

    /*
    metodo para mostrar ao usuário a busca de aerovia por data informada;
    se não encontra, informa ao usuário que não há a aerovia;
    */
    buscaAeroviaPorData(data, idAerovia){
        console.log("-------------------------------------------------");
        let listaOcupacaoPorData = this.#ocupacaoAerovia.buscaAeroviaPorData(data, idAerovia);
        console.log("Lista de Aerovias: ");
        if (listaOcupacaoPorData.length == 0) {
            console.log("Não há aerovias para essa data.");
        } else {
            for (let i = 0; i < listaOcupacaoPorData.length; i++) {
                const element = listaOcupacaoPorData[i];
                let aerovia = this.#servicoAerovia.recuperaPorId(element.idAerovia);
                console.log("ID Plano: " + element.idPlanoDeVoo + " Origem: " + aerovia.origem + " Destino: " + aerovia.destino);
            }
        }
    }

    /*
    metodo para usuário cancelar plano de voo por ID informado;
    */
    cancelarPlano(idPlano){
        try {
            this.#ocupacaoAerovia.cancelaPlanoDeVoo(idPlano);
            console.log("-------------------------------------------------");
            console.log("Plano de voo cancelado com sucesso!");
        } catch (erro) {
            console.log(erro.message);
        }
    }

    /*
    metodo para gravar as mudanças de registros feitas pelo usuário;
    */
    gravaRegistros() {
        this.#ocupacaoAerovia.gravaRegistros();
    }

}