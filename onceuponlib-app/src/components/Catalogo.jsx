import React from 'react';
import { Link } from 'react-router-dom';

const Catalogo = ({livros}) => {
  return (
    <main className="principal">
      <div className="livros">
      <h2>Categoria Frontend</h2>
      <ol>
        {livros
        .filter(livro => livro.categoria === 'frontend')
        .map(livro =>(
          <li key = {livro.id}>
            <Link to={`/livro/${livro.slug}`}>{livro.titulo}</Link>
          </li>
        ))}
      </ol>
      <h2>Categoria Programação</h2>
      <ol>
        {livros
        .filter(livro => livro.categoria === 'programacao')
        .map(livro =>(
          <li key = {livro.id}>
            <Link to={`/livro/${livro.slug}`}>{livro.titulo}</Link>
          </li>
        ))}
      </ol>
      <h2>Categoria Design</h2>
      <ol>
        {livros
        .filter(livro => livro.categoria === 'design')
        .map(livro =>(
          <li key = {livro.id}>
            <Link to={`/livro/${livro.slug}`}>{livro.titulo}</Link>
          </li>
        ))}
      </ol>
      </div>
    </main>
  );
};

export default Catalogo;
