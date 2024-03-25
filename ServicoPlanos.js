import { PlanoDeVoo } from "./PlanoDeVoo.js";
import nReadlines from "n-readlines";
import fs from 'fs';

/*
Criação da Classe ServicoPlanos, contendo:
    atributo privado;
    Método Construtor inicializando vetor vazio e após chamando método para carregar a lista de Planos do arquivo .csv;
    criação de método para localizar planos por id;
    criação de método privado para validar se o valor do id pequisado são números e se tem somente quatro dígitos;
    criação de método para retornar toda lista de planos cadastrados;
    criação de método privado para carregar o arquivo .csv com os dados dos planos de voo, alimentando o vetor do atributo privado planos.
*/

export class ServicoPlanos {
    #planos;
    #maiorId;

    constructor() {
        this.#planos = [];
        this.#maiorId = 0;
        this.#carregarPlanos();
    }

    /*
    percorre toda a lista de planos;
    se o valor digitado pelo usuário corresponde algum valor do campo id cadastrado, retorna o plano;
    se não localizar, retorna undefined;
    */
    recupera(id) {
        this.#validaId(id);
        for (let i = 0; i < this.#planos.length; i++) {
            const plano = this.#planos[i];
            if (plano.id === id) {
                return plano;
            }
        }
        return undefined;
    }

    /*
    verifica se a entrada tem tamanho de quatro caracteres.
    se o valor for diferente de quatro caracteres, lança erro de ID inválido.
    verifica se todos os caracteres são numéricos.
    se o valor não for numérico, lança erro de ID inválido.
    */
    #validaId(id) {
        if (id.length !== 4) {
            throw new Error('ID inválido.');
        }
        for (let i = 0; i < id.length; i++) {
            let caractere = id.charAt(i);
            if (caractere < "0" || caractere > "9") {
                throw new Error('ID inválido.');
            }
        }
    }

    /*
    retorna todos os planos de voo que estão no vetor planos
    */
    todos() {
        return this.#planos;
    }

    /*
    carrega para o vetor planos todos os planos de voo listados no arquivo .csv
    */
    #carregarPlanos() {
        //criação de variável para carregar o arquivo .csv
        let arquivo = new nReadlines("PlanosDeVoo.csv");

        //espaço para armazenar as linhas
        let buffer = "";

        //descarta cabeçalho do arquivo tabela de dados
        arquivo.next()

        //enquanto houverem linhas, lê o conteúdo da próxima linha
        while (buffer = arquivo.next()) {
            //ajusta o formato dos caracteres para utf8
            let linha = buffer.toString('utf8');
            //separa os valores do arquivo pela vírgula e limpa os espaços em branco
            let valoresDaLinha = linha.trim().split("|");
            //adiciona o plano no vetor de planos com os dados da linha
            let plano = new PlanoDeVoo(valoresDaLinha[0],valoresDaLinha[1],valoresDaLinha[2],valoresDaLinha[3], this.#stringParaData(valoresDaLinha[4]),valoresDaLinha[5],valoresDaLinha[6] === "true")
            plano.slots = JSON.parse(valoresDaLinha[7])
            this.#planos.push(plano);
            if (valoresDaLinha[0] > this.#maiorId) {
                this.#maiorId = valoresDaLinha[0];
            }
        }
    }
    
    /*
    Insere planos de voo no vetor planos
    */
    consiste(plano) {
        let idPlanoDeVoo = this.#criaIdPlanoDeVoo();
        plano.id = idPlanoDeVoo;
        this.#planos.push(plano);
        return plano.id;
    }

    #criaIdPlanoDeVoo() {
        this.#maiorId++;
        return this.#maiorId;
    }

    #stringParaData(stringDataHora) {
        const partes = stringDataHora.split(' '); // Dividindo a string em data e hora
        const dataPartes = partes[0].split('/'); // Dividindo a parte da data em dia, mês e ano
        const horaPartes = partes[1].split(':'); // Dividindo a parte da hora em horas e minutos
    
        const dia = parseInt(dataPartes[0], 10);
        const mes = parseInt(dataPartes[1], 10) - 1; // Os meses em JavaScript são baseados em zero
        const ano = parseInt(dataPartes[2], 10);
        const hora = parseInt(horaPartes[0], 10);
        const minutos = parseInt(horaPartes[1], 10);
    
        return new Date(ano, mes, dia, hora, minutos);
    }

    gravaRegistros(){
        let textoParaGravacao = "id|matricPiloto|idAerovia|prefixoAeroNave|data|altitude|cancelado|slots";
        for (let i = 0; i < this.#planos.length; i++) {
            const element = this.#planos[i];
            textoParaGravacao += "\n" + element.toCsv();
        }
        this.escreverArquivo("PlanosDeVoo.csv", textoParaGravacao).then(() => {
            console.log('Arquivo escrito com sucesso!');
        }).catch((err) => {
            console.error('Erro ao escrever no arquivo:', err);
        });
    }

    escreverArquivo(caminho, conteudo) {
        return new Promise((resolve, reject) => {
            fs.writeFile(caminho, conteudo, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}