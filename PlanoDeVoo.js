export class PlanoDeVoo {

    #id;
    #matricPiloto;
    #idAerovia;
    #prefixoAeronave;
    #data;
    #altitude;
    #slots;
    #cancelado 


    constructor(id, matricPiloto, idAerovia, prefixoAeronave, data, altitude, cancelado) {

        this.#id = id;
        this.#matricPiloto = matricPiloto;
        this.#idAerovia = idAerovia;
        this.#prefixoAeronave = prefixoAeronave;
        this.#data = data;
        this.#altitude = altitude;
        this.#cancelado = cancelado;
        this.#slots = [];
    }

    // Getters
    get id() {
        return this.#id;
    }

    get matricPiloto() {
        return this.#matricPiloto;
    }

    get idAerovia() {
        return this.#idAerovia;
    }

    get prefixoAeronave() {
        return this.#prefixoAeronave;
    }

    get data() {
        return this.#data;
    }

    get altitude() {
        return this.#altitude;
    }

    get slots() {
        return this.#slots;
    }

    get cancelado() {
        return this.#cancelado;
    }

    // Setters
    set id(id) {
        this.#id = id;
    }

    set matricPiloto(matricPiloto) {
        this.#matricPiloto = matricPiloto;
    }

    set idAerovia(idAerovia) {
        this.#idAerovia = idAerovia;
    }

    set prefixoAeronave(prefixoAeronave) {
        this.#prefixoAeronave = prefixoAeronave;
    }


    set data(data) {
        this.#data = data;
    }

    set altitude(altitude) {
        this.#altitude = altitude;
    }

    set slots(slots) {
        this.#slots = slots;
    }

    set cancelado(cancelado) {
        this.#cancelado = cancelado;
    }

    #formatarData(data) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
    
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    }

    #formataSlots(slots) {
        let retorno = "";
        for (let i = 0; i < slots.length; i++) {
            const element = slots[i];
            retorno += element + "H ";
        }
        return retorno;
    }

    #formataSlotsCvs(slots) {
        let retorno = "[";
        for (let i = 0; i < slots.length; i++) {
            const element = slots[i];
            retorno += element + ",";
        }
        retorno = retorno.slice(0, -1);
        retorno += "]"
        return retorno;
    }
    
    #formataStatusVoo(){
        if (this.#cancelado) {
            return "Cancelado";
        }
        return "Previsto";
    }

    toString() {
        return "PLANO DE VOO --> ID: " +  this.#id + " Matrícula Piloto: " + this.#matricPiloto + " ID Aerovia: " + this.#idAerovia + " Prefixo Aeronave: " + this.#prefixoAeronave + " Data e Hora: " + this.#formatarData(this.#data) + " Altitude: " + this.#altitude + " Status plano de voo: " + this.#formataStatusVoo() + " Slots ocupados: " + this.#formataSlots(this.#slots);
    }

    toCsv(){
        return this.#id + "|" + this.#matricPiloto + "|" + this.#idAerovia + "|" + this.#prefixoAeronave + "|" + this.#formatarData(this.#data) + "|" + this.#altitude + "|" + this.#cancelado + "|" + this.#formataSlotsCvs(this.#slots);
    }
}