import promptsync from 'prompt-sync';
import { Menu } from "./Menu.js";
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
        
    } else if (resposta === '5') { //trata a resposta '5': Listar os identificadores, origem e destino dos planos aprovados para uma determinada data.
        console.log("-------------------------------------------------");
        let data = prompt('Digite a data (dd/mm/aaaa): ');
        menu.buscaPlanosPorData(data);

    } else if (resposta === '6') { //trata a resposta '6': Listar a ocupação de uma aerovia em uma determinada data.
        console.log("-------------------------------------------------");
        let data = prompt('Digite a data (dd/mm/aaaa): ');
        let idAerovia = prompt('Digite o ID da aerovia: ');
        menu.buscaAeroviaPorData(data, idAerovia);

    } else if (resposta === '7') { //trata a resposta '7': Cancelar plano de voo pelo ID.
        console.log("-------------------------------------------------");
        let idPlano = prompt('Digite o ID do plano de voo: ');
        menu.cancelarPlano(idPlano);

    } else if (resposta === '#') { //trata a resposta '#': Finaliza sistema com mensagem e encerra o while
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