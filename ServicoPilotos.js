import { Piloto } from "./Piloto.js";
import nReadlines from "n-readlines";

/*
Criação da Classe ServicoPilotos, contendo:
    atributo privado;
    Método Construtor inicializando vetor vazio e após chamando método para carregar a lista de Pilotos do arquivo .csv;
    criação de método para localizar piloto por matricula;
    criação de método privado para validar se o valor da matrícula pequisada são números e se tem somente quatro dígitos;
    criação de método para retornar toda lista de pilotos cadastrados;
    criação de método privado para carregar o arquivo .csv com os dados dos pilotos, alimentando o vetor do atributo privado pilotos.
*/

export class ServicoPilotos {
    #pilotos;

    constructor() {
        this.#pilotos = [];
        this.#carregarPilotos();
    }

    /*
    percorre toda a lista de pilotos;
    se o valor digitado pelo usuário corresponde algum valor do campo matrícula cadastrado, retorna o piloto;
    se não localizar, retorna undefined;
    */
    recupera(matricula) {
        this.#validaMatricula(matricula);
        for (let i = 0; i < this.#pilotos.length; i++) {
            const piloto = this.#pilotos[i];
            if (piloto.matricula === matricula) {
                return piloto;
            }
        }
        return undefined;
    }

    /*
    verifica se a entrada tem tamanho de quatro caracteres.
    se o valor for diferente de quatro caracteres, lança erro de matrícula inválida.
    verifica se todos os caracteres são numéricos.
    se o valor não for numérico, lança erro de matrícula inválida.
    */
    #validaMatricula(matricula) {
        if (matricula.length !== 4) {
            throw new Error('Matrícula inválida.');
        }
        for (let i = 0; i < matricula.length; i++) {
            let caractere = matricula.charAt(i);
            if (caractere < "0" || caractere > "9") {
                throw new Error('Matrícula inválida.');
            }
        }
    }

    /*
    retorna todos os pilotos que estão no vetor pilotos
    */
    todos() {
        return this.#pilotos;
    }

    /*
    carrega para o vetor pilotos todos os pilotos listados no arquivo .csv
    */
    #carregarPilotos() {
        //criação de variável para carregar o arquivo .csv
        let arquivo = new nReadlines("Piloto.csv");

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
            //adiciona o piloto no vetor de pilotos com os dados da linha
            this.#pilotos.push(new Piloto(valoresDaLinha[0],valoresDaLinha[1],valoresDaLinha[2] === "true"));
        }
    }
}