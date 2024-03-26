import { AeronaveParticular } from "./AeronaveParticular.js";
import { AeronavePassageiros } from "./AeronavePassageiros.js";
import { AeronaveCarga } from "./AeronaveCarga.js";
import nReadlines from "n-readlines";

/*
Criação da Classe ServicoAeronaves, contendo:
    atributo privado;
    Método Construtor inicializando vetor vazio e após chamando método para carregar a lista de Aeronaves do arquivo .csv;
    criação de método para retornar aeronave por prefixo;
    criação de método para retornar toda lista de aeronaves cadastradas;
    criação de método privado para carregar o arquivo .csv com os dados das aeronaves, alimentando o vetor do atributo privado aeronaves.
*/

export class ServicoAeronaves {
    #aeronaves;

    constructor() {
        this.#aeronaves = [];
        this.#carregarTodasAeronaves();
    }

    /*
    retorna aeronave pelo prefixo
    se não localizar, retorna undefined;
    */
    recuperaPorPrefixo(prefixo) {
        for (let i = 0; i < this.#aeronaves.length; i++) {
            const aeronave = this.#aeronaves[i];
            if(aeronave.prefixo == prefixo) {
                return aeronave;
            }   
        }
        return undefined;
    }

    /*
    retorna todas as aeronaves que estão no vetor aeronaves
    */
    todos() {
        return this.#aeronaves;
    }

    /*
    carrega para o vetor aeronaves todas as aeronaves listadas no arquivo .csv
    */
    #carregarTodasAeronaves() {
        //criação de variável para carregar o arquivo .csv
        let arquivo = new nReadlines("Aeronave.csv");

        //espaço para armazenar as linhas
        let buffer = "";
        
        //descarta cabeçalho do arquivo tabela de dados
        arquivo.next()

        //enquanto houverem linhas, lê o conteúdo da próxima linha
        while (buffer = arquivo.next()) {
            //ajusta o formato dos caracteres para utf8
            let linha = buffer.toString('utf8');
            //separa os valores do arquivo pela vírgula e limpa os espaços em branco
            let valoresDaLinha = linha.trim().split(",");

            //verifica qual o tipo da aeronave conforme os dados que a linha do arquivo possui, cria objeto específico do seu tipo e adiciona a aeronave no vetor da aeronave
            if (valoresDaLinha[3] != "") {
                this.#aeronaves.push(new AeronaveParticular(valoresDaLinha[0],parseFloat(valoresDaLinha[1]),parseFloat(valoresDaLinha[2]),valoresDaLinha[3]));
            } else if (valoresDaLinha[5] != "") {
                this.#aeronaves.push(new AeronavePassageiros(valoresDaLinha[0],parseFloat(valoresDaLinha[1]),parseFloat(valoresDaLinha[2]),valoresDaLinha[4],parseInt(valoresDaLinha[5])));
            } else if (valoresDaLinha[6] != "") {
                this.#aeronaves.push(new AeronaveCarga(valoresDaLinha[0],parseFloat(valoresDaLinha[1]),parseFloat(valoresDaLinha[2]),valoresDaLinha[4],parseFloat(valoresDaLinha[6])));
            }
        }
    }
}