// Home.js
import React from "react";
import {Link} from 'react-router-dom'

const Home = ({livros}) => (
  <main className='principal'>
      <h2>Últimos lançamentos</h2>
      {livros
        .filter((n, index) => index < 6)
        .map((livro) =>(
          <div className='card' key={livro.id}>
            <div className='thumb'>
              <img
                src={"/imagens/capas/" + livro.isbn.replace(/-/g,"") +".jpg"}
                alt='"Thumbnail da capa do livro...'
              />            
            </div>
            {livros
              .filter((c) => c.slug === livro.slug)
              .map((livro) =>(
                <span key={livro.slug}  >
                  <Link to={`/livro/${livro.slug}`}key={livro.id}>
                    {
                      <div className='detalhes'>
                        <h3>{livro.titulo}</h3>
                        <p>{livro.descricao.slice(0,130)+"..."}</p>
                        <p>Leia mais</p>
                      </div>
                    }
                  </Link>
                </span> 
              ))}
          </div>
        ))}
    </main>
);
export default Home;