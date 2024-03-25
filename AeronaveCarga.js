import { validate } from "bycontract";
import { AeronaveComercial } from "./AeronaveComercial.js";

/*Criação da Classe AeronaveCarga, contendo:
    herança da Classe AeronaveComercial;
    atributo privado;
    Método Construtor com validação dos tipos dos atributos;
    Método Construtor chamando atributos herdados + atributo criado;
    retorno do atributo privado com o Método get;
    retorno dos dados com o Método toString, chamando atributos herdados + atributo criado.*/

export class AeronaveCarga extends AeronaveComercial {
    #pesoMax;

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA, pesoMax) {
        validate(arguments, ["String", "Number", "Number", "String", "Number"]);
        super(prefixo, velocidadeCruzeiro, autonomia, nomeCIA)
        this.#pesoMax = pesoMax;
    }

    get pesoMax(){ 
        return this.#pesoMax;
    }

    toString(){
        return `Aeronave COMERCIAL DE CARGA: ${super.toString()}, Peso máximo da carga: ${this.#pesoMax} t.`;
    }
}