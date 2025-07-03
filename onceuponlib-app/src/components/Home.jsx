import React from 'react';

const Home = () => {
  return (
    <>
      <h2>últimos Lançamentos</h2>
      <div className="card">
        <div className="thumb">
            <img src="imagens/capas/9788575228142.jpg" alt="" />
        </div>
        <div className="detalhes">
            <h3>Padrões para Kubernetes</h3>
            <p>O modo como os...</p>
            <a href="#">Leia mais</a>
        </div>
      </div>
      <div className="card">
        <div className="thumb">
            <img src="imagens/capas/9788575228074.jpg" alt="" />
        </div>
        <div className="detalhes">
            <h3>Introdução ao Pentest - 2° edição</h3>
            <p>Introdução ao Pentest..</p>
            <a href="#">Leia mais</a>
        </div>
      </div>
    </>
  );
};

export default Home;
