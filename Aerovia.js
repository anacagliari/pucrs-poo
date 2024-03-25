import { validate } from "bycontract";

/*Criação da Classe Aerovia, contendo:
    atributos privados;
    Método Construtor com validação dos tipos dos atributos;
    retorno dos atributos privados com os Métodos get;
    retorno dos dados com o Método toString.*/

export class Aerovia {
    #id;
    #origem;
    #destino;
    #tamanho;

    constructor(id, origem, destino, tamanho) {
        validate(arguments, ["String", "String", "String", "Number"]);

        this.#id = id;
        this.#origem = origem;
        this.#destino = destino;
        this.#tamanho = tamanho;
    }

    get id(){ 
        return this.#id;
    }

    get origem(){
        return this.#origem;
    }

    get destino(){
        return this.#destino;
    }

    get tamanho(){
        return this.#tamanho;
    }

    toString(){
        return `ID: ${this.#id}, Aeroporto Origem: ${this.#origem}, Aeroporto Destino: ${this.#destino}, Tamanho da Rota: ${this.#tamanho} km.`;
    }
}