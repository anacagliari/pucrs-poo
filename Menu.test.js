import { Menu } from "./Menu";

let menu = undefined;
beforeEach(() => {
    menu = new Menu();
});

describe('Teste da busca de Aerovia por Origem e Destino - busca com sucesso!', () => {   
    it.each([
        [169852, "FLN", "POA"],
        [741384, "POA", "FLN"],
    ])('deve retornar Aeroporto ID: %i Origem: %s, Aeroporto Destino: %s', (idAerovia, origem, destino) => {
        expect(menu.buscaAeroviaPorOrigemDestino(origem, destino)).toBe("ID: " + idAerovia + ", Aeroporto Origem: "+ origem + ", Aeroporto Destino: "+ destino + ", Tamanho da Rota: 376 km.");
    });        
 }); 

 describe('Teste da aprovação de plano de voo. - aprova com sucesso!', () => { 
    it.each([
        ["2533","169852","PS-BFH","34000","02/03/2024 15:00"],
    ])('deve retornar \"Plano de Voo aprovado com sucesso! ID gerado:\" ', (matriculaPiloto, idAerovia, prefixoAeronave, altitude, dataHora) => {
        expect(menu.aprovaPlanoDeVoo(matriculaPiloto, idAerovia, prefixoAeronave, altitude, dataHora)).toBe("Plano de Voo aprovado com sucesso! ID gerado:");
    });        
 }); 