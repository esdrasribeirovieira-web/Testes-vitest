import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header' // Ajuste o caminho de importação conforme necessário

describe('Componente Header', () => {
  it('deve renderizar o título principal corretamente', () => {
    render(<Header />)

    // Busca pelo título h1 com o texto exato
    const titleElement = screen.getByRole('heading', { 
      level: 1, 
      name: /Catálogo de Produtos/i 
    })

    expect(titleElement).toBeInTheDocument()
  })

  it('deve renderizar a descrição/subtítulo corretamente', () => {
    render(<Header />)

    // Busca pelo texto do parágrafo
    const descriptionElement = screen.getByText(
      /Projeto didático para testes unitários com React e Vitest/i
    )

    expect(descriptionElement).toBeInTheDocument()
  })

  it('deve renderizar a estrutura com as classes CSS corretas', () => {
    const { container } = render(<Header />)

    // Verifica se a tag <header> possui a classe "header"
    const headerElement = container.querySelector('header')
    expect(headerElement).toHaveClass('header')

    // Verifica se a div interna possui a classe "container"
    const divElement = container.querySelector('div')
    expect(divElement).toHaveClass('container')
  })
})