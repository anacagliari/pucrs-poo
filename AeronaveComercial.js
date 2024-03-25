import { validate } from "bycontract";
import { Aeronave } from "./Aeronave.js";

/*Criação da Classe AeronaveComercial, contendo:
    herança da Classe Aeronave;
    atributo privado;
    Método Construtor com validação dos tipos dos atributos;
    Método Construtor chamando atributos herdados + atributo criado;
    retorno do atributo privado com o Método get;
    retorno dos dados com o Método toString, chamando atributos herdados + atributo criado.*/

export class AeronaveComercial extends Aeronave {
    #nomeCIA;

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA) {
        validate(arguments, ["String", "Number", "Number", "String"]);
        super(prefixo, velocidadeCruzeiro, autonomia)
        this.#nomeCIA = nomeCIA;
    }

    get nomeCIA(){ 
        return this.#nomeCIA;
    }

    toString(){
        return `${super.toString()}, Nome CIA Aérea: ${this.#nomeCIA}`;
    }
}