// beforeEach - antes de cada teste
// vi - virtualizar mock (no nosso caso, componentes)
import {  beforeEach, describe, expect, it, vi } from 'vitest'
// importar as ações e conteúdo em tela
import { render, screen, waitFor } from '@testing-library/react'
// realizar ações co, um usuário (simular interações)
import userEvent from '@testing-library/user-event'

// importar o componente a ser testado
import App from './App'
// importar serviço
import * as productService from './services/productService'
// importar o mock de produtos
import { productsMock } from './tests/mocks/products'

// virtualizamos uma requisição real
vi.mock('./services/productService', () => ({
    // com mocks da função real
    getProducts: vi.fn()
}))

describe('App', () => {
    // antes de cada teste...
    beforeEach(() => {
        //...limpamos os mock, recomeçando do zero
        vi.clearAllMocks()
    })
    describe('Layout', ()=> {
        it('Deve renderizar o cabeçalho e o form de pesquisa', async () => {
            // chamamos o serviço (productService)
            // chamamos a função (getProducts)
            // mockamos os resultados do que seria a requisição
            // neste caso, consideramos que os produtos estão carregados
            productService.getProducts.mockResolvedValue(productsMock)

            // renderizamos o componente
            render(<App/>)

            // esperamos que o cabeçalho seja renderizado
            expect(screen.getByRole('heading',
                // dentro dele, o texto
                { name:'Catálogo de Produtos'}))
                // e se este texto aparece na tela
                .toBeInTheDocument()

                // verificar o parágrafo do form
                expect(screen.getByRole('textbox',{
                    // expressão regular para textos que contenham
                    // "pesquisar produtos"
                    name: /pesquisar produto/i
                })) .toBeInTheDocument()
        
            })
            it('Carregamento', () => {
                // mock para forçar o carregamento
                //(aguardando o retorno da Promise)
                productService.getProducts.mockResolvedValue(
                    new Promise(() => {})
                )
                // renderizamos o componente
                render(<App/>)
                // verificamos se o loading foi renderizado
                expect(screen.getByRole('status',
                    // e se ele tem o texto correto
                )).toHaveTextContent('Carregando produtos...')
        })
    })
})