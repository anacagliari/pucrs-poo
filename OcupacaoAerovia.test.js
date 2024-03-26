import { OcupacaoAerovia } from "./OcupacaoAerovia";

let ocupacaoAerovia = undefined;
beforeEach(() => {
    ocupacaoAerovia = new OcupacaoAerovia();
});

describe('Teste da busca Plano de Voo por ID - busca não localizada, retorna erro', () => {   
    it.each([
        [169852],
        ["x"]
    ])('deve retornar exceção', (idPlanoDeVoo) => {
        expect(ocupacaoAerovia.buscarPlanoDeVooPorId(idPlanoDeVoo)).toBe(undefined);
    });        
}); 

describe('Teste de cancelar Plano de Voo por ID - retorna erro', () => {   
    it.each([
        [169852],
        ["x"]
    ])('deve retornar exceção', (id) => {
        expect(() => ocupacaoAerovia.cancelaPlanoDeVoo(id)).toThrow('ID de plano de voo não localizado.');
    });        
}); 