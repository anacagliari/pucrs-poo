import { Ocupacao } from "./Ocupacao.js";
import { ServicoPlanos } from "./ServicoPlanos.js";
import { AeronaveParticular } from "./AeronaveParticular.js";
import { AeronaveCarga } from "./AeronaveCarga.js";
import { AeronaveComercial } from "./AeronaveComercial.js";
import { PlanoDeVoo } from "./PlanoDeVoo.js";

/*
Criação da Classe OcupacaoAerovia, contendo:
    atributo privado;
    Método Construtor inicializando vetor vazio, atributo instanciando objeto e chamando método para ocupar itens preenchidos no Plano de Voo;
    criação de método para retornar altitudes ocupadas por ID numa data e hora específica;
    criação de método para validar hora;
    criação de método para retornar slots ocupados na data e aerovia informadas;
    criação de método para ocupar os dados de plano de voo;
    criação de método para liberar os dados de plano de voo;
    criação de método para verificar se id da aerovia, a data, a altitude e o slot estão ocupados
    criação de método para cadastrar e aprovar plano de voo;
    criação de método para verificar quantos slots o plano de voo ocupará;
    criação de método para validar os dados cadastrados no plano de voo de acordo com regras de negócio;
    Formatação String para data e hora;
    Formatação data;
    criação de método para buscar plano de voo por ID;
    criação de método para buscar plano de voo por data;
    criação de método para retornar todos os planos de voo;
    criação de método para carregar a ocupação dos planos de voo;
    criação de método para cancelar um plano de voo;
    criação de método para enviar os dados para gravar os registros do plano de voo.
*/

export class OcupacaoAerovia {

    #ocupacao;
    #servicoPlano;

    constructor () {
        this.#ocupacao = [];
        this.#servicoPlano = new ServicoPlanos();
        this.#carregaOCupacao();
    }

    /*
    Retorna as altitudes que estão OCUPADAS para a aerovia, data e slot (hora) informados;
    */
    altitudesOcupadas(idAerovia, data, hora) {
        this.#validaHora(hora);
        let altitudesOcupadas = [];
        for (let i = 0; i < this.#ocupacao.length; i++) {
            const ocupacao = this.#ocupacao[i];
            if(ocupacao.idAerovia == idAerovia && this.#formatarData(ocupacao.data) == data && ocupacao.hora == hora) {
                altitudesOcupadas.push(ocupacao.altitude);
            }
        }
        return altitudesOcupadas;
    }

    /*
    verifica se hora está no intervalo correto
    */
    #validaHora(hora) {
        if (hora < 0 || hora > 23) {
            throw new Error('Hora inválida.');
        }
    }

    /*
    Retorna os slots (hora cheias para uso) que estão OCUPADOS para a aerovia, data e altitudes informadas;
    */
    slotsOcupados(idAerovia, data, altitude) {
        let slotsOcupados = [];
        for (let i = 0; i < this.#ocupacao.length; i++) {
            const ocupacao = this.#ocupacao[i];
            if(ocupacao.idAerovia == idAerovia && ocupacao.data == data && ocupacao.altitude == altitude) {
                slotsOcupados.push(ocupacao.hora);
            }
        }
        return slotsOcupados;
    }

    /*
    método para ocupar dados informados no plano de voo que foi aprovado
    */
    ocupa(idPlanoDeVoo, idAerovia, data, altitude, slots) {
        for (let i = 0; i < slots.length; i++) {
            let ocupacao = new Ocupacao(idPlanoDeVoo, idAerovia, altitude, data, slots[i])
            this.#ocupacao.push(ocupacao);
        }
    }

    /*
    método para libera dados de plano de voo que foi solicitado cancelar
    */
    libera(idAerovia, data, altitude, slots) {
        for (let i = 0; i < slots.length; i++) {
            for (let j = 0; j < this.#ocupacao.length; j++) {
                const ocupacao = this.#ocupacao[j];
                if(ocupacao.idAerovia == idAerovia && this.#formatarData(ocupacao.data) == this.#formatarData(data) && ocupacao.hora == slots[i] && ocupacao.altitude == altitude) {
                    this.#ocupacao.splice(j, 1);
                }
            }
        }
    }

    /*
    Método recebe o id da aerovia, a data, a altitude e o slot (hora de uso) e devolve true quando está ocupada e false quando está livre
    */
    isOcupado(idAerovia, data, altitude, slot) {
        for (let i = 0; i < this.#ocupacao.length; i++) {
            const ocupacao = this.#ocupacao[i];
            if(ocupacao.idAerovia == idAerovia && 
               this.#formatarData(ocupacao.data) == this.#formatarData(data) && 
               ocupacao.hora == slot && 
               ocupacao.altitude == altitude) {
                return true;
            }
        }
        return false;
    }

    /*
    valida de os itens informados pelo usuário existem
    chama metodos para formatar, calcular e validar dados
    inclui plano de voo
    retorna id do plano de voo
    */
    aprovaPlanoDeVoo(piloto, aerovia, aeronave, altitude, data){
        if (piloto == undefined) {
            throw new Error('Piloto não encontrado.');
        }
        if (aerovia == undefined) {
            throw new Error('Aerovia não encontrada.');
        }
        if (aeronave == undefined) {
            throw new Error('Aeronave não encontrada.');
        }
        if (data == undefined) {
            throw new Error('Data inválida.');
        }
        let dataHora = this.#stringParaData(data);
        let slots = this.#calculaSlots(aeronave, aerovia, dataHora);
        this.#validaPlanoDeVoo(piloto, aerovia, aeronave, altitude, dataHora, slots);
        let planoDeVooAprovado = new PlanoDeVoo("1", piloto.matricula, aerovia.id, aeronave.prefixo, dataHora, altitude, false);
        planoDeVooAprovado.slots = slots;
        let idPlanoDeVoo = this.#servicoPlano.consiste(planoDeVooAprovado);
        this.ocupa(idPlanoDeVoo, aerovia.id, dataHora, altitude, slots);
        return idPlanoDeVoo;
    }

    /*
    retorna slots calculados de acordo com a regra de negocio
    */
    #calculaSlots(aeronave, aerovia, dataHora) {
        let slots = [];
        let tempoViagem = aerovia.tamanho / aeronave.velocidadeCruzeiro;
        let hora = dataHora.getHours();
        let minuto = dataHora.getMinutes();
        let minutosTempoViagem = (tempoViagem % 1) * 0.6;
        for (let i = 0; i < tempoViagem; i++) {
            hora += i;
            if(hora > 23) {
                hora = 0;
            }
            slots.push(hora);
        }
        if ((minutosTempoViagem + minuto) > 60) {
            hora++;
            if(hora > 23) {
                hora = 0;
            }
            slots.push(hora);
        }
        return slots;
    }

    /*
    valida plano de voo de acordo com as regras de negócio
    */
    #validaPlanoDeVoo(piloto, aerovia, aeronave, altitude, data, slots){
        if (!piloto.habilitacaoAtiva) {
            throw new Error('Habilitação de piloto inativa.');
        }
        
        let autonomiaAeronave10p = (aerovia.tamanho * 1.1);

        if (autonomiaAeronave10p > aeronave.autonomia) {
            throw new Error('Autonomia da aeronave insuficiente.');
        }

        if (altitude < 25000 || altitude > 34000) {
            throw new Error('Altitude inválida.');
        }

        if (aeronave instanceof AeronaveParticular) {
            if (altitude > 27000 || altitude < 25000) {
                throw new Error('Aeronave incompatível com a altitude do plano de voo.');
            }
        }

        if (aeronave instanceof AeronaveComercial) {
            if (altitude < 28000) {
                throw new Error('Aeronave incompatível com a altitude do plano de voo.');
            }
        }

        if (aeronave instanceof AeronaveCarga) {
            for (let i = 0; i < slots.length; i++) {
                const slot = slots[i];
                if (slot > 6) {
                    throw new Error('Aeronave incompatível com o horário permitido para voo.');
                }
            }
        }

        for (let i = 0; i < slots.length; i++) {
            const slot = slots[i];
            if (this.isOcupado(aerovia.id, data, altitude, slot)) {
                throw new Error('Aerovia ocupada.');
            }
        }
    }

    /*
    formata data em string para data e hora dd/mm/aaaa hh:mm
    */
    #stringParaData(stringDataHora) {
        const partes = stringDataHora.split(' ');
        const dataPartes = partes[0].split('/');
        const horaPartes = partes[1].split(':');
    
        const dia = parseInt(dataPartes[0], 10);
        const mes = parseInt(dataPartes[1], 10) - 1; // Os meses em JavaScript são baseados em zero
        const ano = parseInt(dataPartes[2], 10);
        const hora = parseInt(horaPartes[0], 10);
        const minutos = parseInt(horaPartes[1], 10);
    
        return new Date(ano, mes, dia, hora, minutos);
    }

    /*
    Formata a data para dd/mm/aaaa
    */
    #formatarData(data) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    /*
    busca plano de voo por id
    retorna plano de voo por id;
    */
    buscarPlanoDeVooPorId(id) {
        let planoDeVoo = undefined;
        let listaPlanoDeVoo = this.#servicoPlano.todos();
        for (let i = 0; i < listaPlanoDeVoo.length; i++) {
            const element = listaPlanoDeVoo[i];
            if (element.id == id) {
                planoDeVoo = element;
            }
        }
        return planoDeVoo;
    }

    /*
    busca plano de voo por data
    retorna plano de voo por data;
    */
    buscaPlanosPorData(data) {
        let listaPlanosDeVooPorData = [];
        let listaPlanosDeVoo = this.#servicoPlano.todos();
        for (let i = 0; i < listaPlanosDeVoo.length; i++) {
            const element = listaPlanosDeVoo[i];
            if (this.#formatarData(element.data) == data) {
                listaPlanosDeVooPorData.push(element);
            }
        }
        return listaPlanosDeVooPorData;
    }

    /*
    busca aerovia por data e id
    retorna aerovia por data;
    */
    buscaAeroviaPorData(data, idAerovia) {
        let listaOcupacaoAeroviaPorData = [];
        for (let i = 0; i < this.#ocupacao.length; i++) {
            const element = this.#ocupacao[i];
            if (this.#formatarData(element.data) == data && element.idAerovia == idAerovia) {
                listaOcupacaoAeroviaPorData.push(element);
            }
        }
        return listaOcupacaoAeroviaPorData;
    }

    /*
    retorna todos os planos de voo
    */
    todosPlanosDeVoo() {
        return this.#servicoPlano.todos();
    }

    /*
    método é responsável por criar as ocupações quando o programa é iniciado baseado nos planos de voo que estão no arquivo
    */
    #carregaOCupacao() {
        let planosDeVooo = this.todosPlanosDeVoo();
        for (let i = 0; i < planosDeVooo.length; i++) {
            const plano = planosDeVooo[i];
            if(!plano.cancelado){
                this.ocupa(plano.id, plano.idAerovia, plano.data, plano.altitude, plano.slots);
            }
        }
    }

    /*
    confere pelo id se plano de voo já esteja cancelado e trata erro, se achar id e não estiver cancela, chama metodo libera();
    troca cancelado para true, libera slots e altera o plano de voo para cancelado;
    se não achar id, retorna erro.
    */
    cancelaPlanoDeVoo(id) {
        let listaPlanosDeVoo = this.#servicoPlano.todos();
        for (let i = 0; i < listaPlanosDeVoo.length; i++) {
            const element = listaPlanosDeVoo[i];
            if (id == element.id) {
                if (element.cancelado) {
                    throw new Error('Voo já está cancelado.');
                }
                this.libera(element.idAerovia, element.data, element.altitude, element.slots);
                element.cancelado = true;
                element.slots = [];
                listaPlanosDeVoo[i] = element;
                return;
            }
        }
        throw new Error('ID de plano de voo não localizado.');
    }

    /*
    enviar os dados para gravar os registros do plano de voo
    */
    gravaRegistros(){
        this.#servicoPlano.gravaRegistros();
    }
}