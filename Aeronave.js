import { validate } from "bycontract";

/*Criação da Classe Aeronave, contendo:
    atributos privados;
    Método Construtor com validação dos tipos dos atributos;
    retorno dos atributos privados com os Métodos get;
    retorno dos dados com o Método toString.*/

export class Aeronave {
    #prefixo;
    #velocidadeCruzeiro;
    #autonomia;

    constructor(prefixo, velocidadeCruzeiro, autonomia) {
        validate(arguments, ["String", "Number", "Number"]);

        this.#prefixo = prefixo;
        this.#velocidadeCruzeiro = velocidadeCruzeiro;
        this.#autonomia = autonomia;
    }

    get prefixo(){ 
        return this.#prefixo;
    }

    get velocidadeCruzeiro(){
        return this.#velocidadeCruzeiro;
    }

    get autonomia(){
        return this.#autonomia;
    }

    toString(){
        return `Prefixo: ${this.#prefixo}, Velocidade de Cruzeiro: ${this.#velocidadeCruzeiro} km/h, Autonomia: ${this.#autonomia} km`;
    }
}