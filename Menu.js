import promptsync from 'prompt-sync';
import { ServicoPilotos } from "./ServicoPilotos.js";
import { ServicoAerovias } from "./ServicoAerovias.js";
import { ServicoAeronaves } from "./ServicoAeronaves.js";
import { OcupacaoAerovia } from './OcupacaoAerovia.js';

/*
Criação da Classe Menu, contendo:
    atributos privados;
    Método Construtor instanciando classes de serviços;
    criação de método para listar todos os pilotos;
    criação de método para buscar piloto por matricula;
    criação de método para listar todas as aerovias;
    criação de método para buscar aerovia pela origem e destino;
    criação de método para listar todas as aeronaves.
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
    metodo para mostrar ao usuário a busca da aerovia pela origem e destino informados;
    se não encontra, informa ao usuário que a aerovia não foi encontrada;
    trata erros disparados pela camada de serviço.
    */
    buscaAeroviaPorOrigemDestino(origem, destino){
        let retornoDaBusca = undefined;
        try {
            retornoDaBusca = this.#servicoAerovia.recupera(origem, destino);
        } catch (erro) {
            console.log(erro.message);
        }

        if (retornoDaBusca != undefined) {
            console.log(retornoDaBusca.toString());
        } else {
            console.log("Aerovia não encontrada!");
        }
    }

    /*
    metodo para listar as altitudes livres em uma determinada aerovia em um determinado dia e horário;
    se não encontra, informa ao usuário que não há altitudes livres;
    trata erros disparados pela camada de serviço.
    */
    listarAltitudesLivres(idAerovia, data, hora) {
        let retornoDaBusca = undefined;
        try {
            retornoDaBusca = this.#servicoAerovia.recupera(origem, destino);
        } catch (erro) {
            console.log(erro.message);
        }

        if (retornoDaBusca != undefined) {
            console.log(retornoDaBusca.toString());
        } else {
            console.log("Aerovia não encontrada!");
        }
    }

    aprovaPlanoDeVoo(matricula, idAerovia, prefixo, altitude, dataHora) {
        let pitolo = this.#servicoPiloto.recupera(matricula);
        let aerovia = this.#servicoAerovia.recuperaPorId(idAerovia);
        let aeronave = this.#servicoAeronave.recuperaPorPrefixo(prefixo);
        let id = this.#ocupacaoAerovia.aprovaPlanoDeVoo(pitolo, aerovia, aeronave, altitude, dataHora);
        console.log("-------------------------------------------------");
        console.log("Plano de Voo aprovado com sucesso! ID gerado: " + id);
    }

    /*
    método para mostrar ao usuário a lista de todos os pilotos carregados dentro do serviço
    */
    listaTodosPilotos(){
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
    buscaPilotoPorMatricula(matricula){
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
    listaTodasAerovias(){
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
    listaTodasAeronaves(){
        let todasAeronaves = this.#servicoAeronave.todos();
        
        console.log("Lista de Aeronaves:");

        for (let i = 0; i < todasAeronaves.length; i++) {
            const aeronave = todasAeronaves[i];
            console.log(aeronave.toString());
        }
    }

    buscarPlanoDeVooPorId(id){
        let planosDeVoo = this.#ocupacaoAerovia.buscarPlanoDeVooPorId(id);
        if (planosDeVoo != undefined) {
            console.log(planosDeVoo.toString());
        } else {
            console.log("Plano de Voo não encontrado.");
        }
    }

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

    buscaAeroviaPorData(data, idAerovia){
        console.log("-------------------------------------------------");
        let listaOcupacaoPorData = this.#ocupacaoAerovia.buscaAeroviaPorData(data, idAerovia);
        console.log("Lista de Planos de Voos: ");
        if (listaOcupacaoPorData.length == 0) {
            console.log("Não há planos de voo para essa data.");
        } else {
            for (let i = 0; i < listaOcupacaoPorData.length; i++) {
                const element = listaOcupacaoPorData[i];
                let aerovia = this.#servicoAerovia.recuperaPorId(element.idAerovia);
                console.log("ID Plano: " + element.idPlanoDeVoo + " Origem: " + aerovia.origem + " Destino: " + aerovia.destino);
            }
        }
    }

    cancelaPlano(idPlano) {
        console.log("-------------------------------------------------");
        this.#ocupacaoAerovia.cancelaPlanoDeVoo(idPlano);
        console.log("Plano de voo cancelado com sucesso!");
    }

    gravaRegistros() {
        this.#ocupacaoAerovia.gravaRegistros();
    }

}

/*
Início da interação com o usuário através de um Menu de ações.
*/
const prompt = promptsync({sigint: true});

let menu = new Menu();
let resposta = 0;

console.log("-------------------------------------------------");
console.log("-------- Bem-vindo ao Sistema de Aviação! -------");

while(resposta != '#'){
    //apresenta opções possíveis ao usuário
    console.log("-------------------------------------------------");
    console.log("--------------------- MENU ----------------------");
    console.log("-------------------------------------------------");
    console.log("(1) Buscar aerovias cadastradas entre dois aeroportos.");
    console.log("(2) Listar as altitudes livres por data e hora.");
    console.log("(3) Aprovar plano de voo.");
    console.log("(4) Consultar plano de voo por ID.");
    console.log("(5) Listar planos de voo por data.");
    console.log("(6) Visualizar ocupação aerovia por data.");
    console.log("(7) Cancelar plano de voo.");
    console.log("(#) Encerrar");

    //solicita interação ao usuário
    resposta = prompt('Digite a opção desejada: ');

    //trata a respostas do usuário
    if (resposta === '1') { //trata a resposta '1': retorna todas as aerovias cadastradas
        console.log("-------------------------------------------------");
        let origem = prompt('Digite o aeroporto de origem: ');
        let destino = prompt('Digite o aeroporto de destino: ');
        menu.buscaAeroviaPorOrigemDestino(origem, destino);

    } else if (resposta === '2') { //trata a resposta '2': retorna todas as altitudes livres de uma determinada aerovia de um determinado horario.
        console.log("-------------------------------------------------");
        let idAerovia = prompt('Digite o ID da aerovia desejada: ');
        let data = prompt('Digite a data desejada (dd/mm/aaaa): ');
        let hora = prompt('Digite a hora desejada (hora cheia hh): ');
        menu.listarAltitudesLivres(idAerovia, data, hora);

    } else if (resposta === '3') { //trata a resposta '3': Cadastra/Aprova Plano de Voo.
        console.log("-------------------------------------------------");
        let matriculaPiloto = prompt('Digite a matrícula do piloto: ');
        let idAerovia = prompt('Digite o ID da aerovia: ');
        let prefixoAeronave = prompt('Digite o prefixo da aeronave: ');
        let altitude = prompt('Digite a altitude: ');
        let dataHora = prompt('Digite a data e hora (dd/mm/aaaa hh:mm): ');
        menu.aprovaPlanoDeVoo(matriculaPiloto, idAerovia, prefixoAeronave, altitude, dataHora);

    } else if (resposta === '4') { //trata a resposta '4': Listar plano de voo por id.
        console.log("-------------------------------------------------");
        let idPlano = prompt('Digite o ID do plano de voo: ');
        menu.buscarPlanoDeVooPorId(idPlano);
        
    } else if (resposta === '5') { //trata a resposta '5': Listar todos os planos previstos para uma determinada data. Listar os identificadores, origem e destino dos planos aprovados para uma determinada data.
        console.log("-------------------------------------------------");
        let data = prompt('Digite a data (dd/mm/aaaa): ');
        menu.buscaPlanosPorData(data);

    } else if (resposta === '6') { //trata a resposta '6': Listar a ocupação de uma aerovia em uma determinada data.
        console.log("-------------------------------------------------");
        let data = prompt('Digite a data (dd/mm/aaaa): ');
        let idAerovia = prompt('Digite o ID da aerovia: ');
        menu.buscaAeroviaPorData(data, idAerovia);

    } else if (resposta === '7') { //trata a resposta '7': Cancelar plano de voo.
        console.log("-------------------------------------------------");
        let idPlano = prompt('Digite o ID do plano de voo: ');
        menu.cancelaPlano(idPlano);

    } else if (resposta === '#') { //trata a resposta '#': finaliza sistema com mensagem e encerra o while
        console.log("-------------------------------------------------");
        console.log("-----Sistema de aviação agradece sua visita!-----");
        console.log("-------------------------------------------------");
        menu.gravaRegistros();
    } else { //trata qualquer outra resposta informada pelo usuário
        console.log("-------------------------------------------------");
        console.log("Opção inválida!");
        console.log("-------------------------------------------------");
    }
}