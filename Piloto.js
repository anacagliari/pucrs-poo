import { validate } from "bycontract";

/*Criação da Classe Piloto, contendo:
    atributos privados;
    Método Construtor com validação dos tipos dos atributos;
    retorno dos atributos privados com os Métodos get;
    formatação do atributo booleano para string "Ativa/Inativa";
    retorno dos dados com o Método toString.*/

export class Piloto {
    #matricula;
    #nome;
    #habilitacaoAtiva;

    constructor(matricula, nome, habilitacaoAtiva) {
        validate(arguments, ["String","String" , "Boolean"]);

        this.#matricula = matricula;
        this.#nome = nome;
        this.#habilitacaoAtiva = habilitacaoAtiva;
    }

    get matricula(){ 
        return this.#matricula;
    }

    get nome(){
        return this.#nome;
    }

    get habilitacaoAtiva(){
        return this.#habilitacaoAtiva;
    }

    #habilitacaoFormatada(){
        if (this.#habilitacaoAtiva === true) {
            return "Ativa";
        } 
        return "Inativa";
    }

    toString(){
        return `Matricula: ${this.#matricula}, Nome: ${this.#nome}, Habilitação: ${this.#habilitacaoFormatada()}`;
    }
}