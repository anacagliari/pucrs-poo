import { validate } from "bycontract";
import { AeronaveComercial } from "./AeronaveComercial.js";

/*Criação da Classe AeronavePassageiros, contendo:
    herança da Classe AeronaveComercial;
    atributo privado;
    Método Construtor com validação dos tipos dos atributos;
    Método Construtor chamando atributos herdados + atributo criado;
    retorno do atributo privado com o Método get;
    retorno dos dados com o Método toString, chamando atributos herdados + atributo criado.*/

export class AeronavePassageiros extends AeronaveComercial {
    #maxPassageiros;

    constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA, maxPassageiros) {
        validate(arguments, ["String", "Number", "Number", "String", "Number"]);
        super(prefixo, velocidadeCruzeiro, autonomia, nomeCIA)
        this.#maxPassageiros = maxPassageiros;
    }

    get maxPassageiros(){ 
        return this.#maxPassageiros;
    }

    toString(){
        return `Aeronave COMERCIAL DE PASSAGEIROS: ${super.toString()}, Máximo de passageiros: ${this.#maxPassageiros}.`;
    }
}