import React from 'react'
import { Link } from 'react-router-dom';

const Livro = ({livro}) => (
  <main className="principal">
    <div className="pag-livro">
      <h2>{livro.titulo}</h2>
      <div className='livro'>
      <img 
        src={"/imagens/capas/" + livro.id + ".jpg"} 
        alt="thumbnail da capa do livo..." 
      />
      <ul>
        <li>ISBN: {livro.isnb}</li>
        <li>Ano: {livro.ano}</li>
        <li>Páginas: {livro.paginas}</li>
        <li>Preço: R$ {livro.preco},00</li>
      </ul>
      <hr />
      <h3>Descrição do livro</h3>
      <p>{livro.descricao}</p>
      <Link to={`/compra/${livro.slug}`}><button className='botao'>Comprar</button></Link>
      </div>
    </div>
  </main>
);

export default Livro;
