import React from 'react'
import { Link } from 'react-router-dom';

const Livro = ({livro, onAddToCart}) => (
  <main className="principal">
    <h2>{livro.titulo}</h2>
    <div className="pag-livro">
      <div className='livro'>
      <img 
        src={"/imagens/capas/" + livro.id + ".jpg"} 
        alt="thumbnail da capa do livo..." 
      />
      <ul>
        <li>Título: {livro.titulo}</li>
        <li>ISBN: {livro.isbn}</li>
        <li>Ano: {livro.ano}</li>
        <li>Páginas: {livro.paginas}</li>
        <li>Exemplares disponíveis: {livro.quantidade}</li>
        <li style={{fontSize:'20px', fontWeight:'bold', marginBottom:'30px' ,marginTop:'30px', color: '#4d3d2fff'}}>Preço: R$ {livro.preco},00</li>
        <li>
          Descrição do livro
          <p>{livro.descricao}</p>
          </li>
          <button className='btn-comprar' onClick={() => onAddToCart(livro)}>
        Adicionar ao Carrinho
      </button>
      </ul>
      </div>
    </div>
  </main>
);

export default Livro;
