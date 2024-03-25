import { validate } from "bycontract";
import { Aeronave } from "./Aeronave.js";

/*Criação da Classe AeronaveParticular, contendo:
    herança da Classe Aeronave;
    atributo privado;
    Método Construtor com validação dos tipos dos atributos;
    Método Construtor chamando atributos herdados + atributo criado;
    retorno do atributo privado com o Método get;
    retorno dos dados com o Método toString, chamando atributos herdados + atributo criado.*/

export class AeronaveParticular extends Aeronave {
    #respmanutencao;

    constructor(prefixo, velocidadeCruzeiro, autonomia, respmanutencao) {
        validate(arguments, ["String", "Number", "Number", "String"]);
        super(prefixo, velocidadeCruzeiro, autonomia)
        this.#respmanutencao = respmanutencao;
    }

    get respmanutencao(){ 
        return this.#respmanutencao;
    }

    toString(){
        return `Aeronave PARTICULAR: ${super.toString()}, Responsável pela manutenção: ${this.#respmanutencao}`;
    }
}