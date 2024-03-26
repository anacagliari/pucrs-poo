/*Criação da Classe Ocupacao, contendo:
    atributos privados;
    Método Construtor;
    retorno dos atributos privados com os Métodos get;
    retorno dos dados com o Método toString.*/

export class Ocupacao {

    #idPlanoDeVoo;
    #idAerovia;
    #altitude;
    #data;
    #hora;

    constructor (idPlanoDeVoo, idAerovia, altitude, data, hora) {
        this.#idPlanoDeVoo = idPlanoDeVoo;
        this.#idAerovia = idAerovia;
        this.#altitude = altitude;
        this.#data = data;
        this.#hora = hora;
    }

    get idPlanoDeVoo() {
        return this.#idPlanoDeVoo;
    }

    get idAerovia() {
        return this.#idAerovia;
    }

    get altitude() {
        return this.#altitude;
    }

    get data() {
        return this.#data;
    }

    get hora() {
        return this.#hora;
    }

    toString() {
        return "ID Plano de Voo: " + this.#idPlanoDeVoo + " ID Aerovia: " + this.#idAerovia + " Altitude: " + this.#altitude + " Data: " + this.#data + " Hora: " + this.#hora;
    }
}