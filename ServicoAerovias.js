import { Aerovia } from "./Aerovia.js";
import nReadlines from "n-readlines";

/*
Criação da Classe ServicoAerovias, contendo:
    atributo privado;
    Método Construtor inicializando vetor vazio e após chamando método para carregar a lista de Aerovias do arquivo .csv;
    criação de método para localizar aerovia por origem e destino;
    criação de método para localizar aerovia por ID;
    criação de método privado para validar se o valor da origem e do destino pequisada são letras e se tem somente três dígitos;
    criação de método para retornar toda lista de aerovias cadastradas;
    criação de método privado para carregar o arquivo .csv com os dados das aerovias, alimentando o vetor do atributo privado aerovias.
*/

export class ServicoAerovias {
    #aerovias;

    constructor() {
        this.#aerovias = [];
        this.#carregarAerovias();
    }

    /*
    altera valor de entrada para letras em caixa alta;
    percorre toda a lista de aerovias visando corresponder origem e destino;
    se os valores digitados pelo usuário corresponde algum valor dos campos origem e destino no mesmo cadastrado, retorna a aerovia;
    se não localizar, retorna undefined;
    */
    recupera(origem, destino) {
        origem = origem.toUpperCase();
        destino = destino.toUpperCase();

        this.#validaRota(origem);
        this.#validaRota(destino);

        for (let i = 0; i < this.#aerovias.length; i++) {
            const aerovia = this.#aerovias[i];
            if (aerovia.origem === origem && aerovia.destino === destino) {
                return aerovia;
            }
        }
        return undefined;
    }

    /*
    percorre toda a lista de aerovias visando corresponder ID;
    se os valores digitados pelo usuário corresponde algum valor do campo ID no mesmo cadastrado, retorna a aerovia;
    se não localizar, retorna undefined;
    */
    recuperaPorId(id) {
        for (let i = 0; i < this.#aerovias.length; i++) {
            const aerovia = this.#aerovias[i];
            if (aerovia.id === id) {
                return aerovia;
            }
        }
        return undefined;
    }

    /*
    verifica se a entrada tem tamanho de três caracteres.
    se o valor for diferente de três caracteres, lança erro de origem/destino inválido.
    verifica se todos os caracteres são letras.
    se o valor não for letra pelo código ASCII, lança erro de origem/destino inválido.
    */
    #validaRota(trecho) {
        if (trecho.length !== 3) {
            throw new Error('Origem/Destino inválido.');
        }
        for (let i = 0; i < trecho.length; i++) {
            let charCode = trecho.charCodeAt(i);
            if (!(charCode >= 65 && charCode <= 90)) {
                throw new Error('Origem/Destino inválido.');
            }
        }
    }

    /*
    retorna todas as aerovias que estão no vetor aerovias
    */
    todos() {
        return this.#aerovias;
    }

    /*
    carrega para o vetor aerovias todas as aerovias listadas no arquivo .csv
    */
    #carregarAerovias() {
        //criação de variável para carregar o arquivo .csv
        let arquivo = new nReadlines("Aerovia.csv");

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
          //adiciona a aerovia no vetor de aerovias com os dados da linha
          this.#aerovias.push(new Aerovia(valoresDaLinha[0],valoresDaLinha[1],valoresDaLinha[2],parseFloat(valoresDaLinha[3])));
        }
    }
}