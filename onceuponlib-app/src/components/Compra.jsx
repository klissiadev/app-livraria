import React from 'react';

const Compra = ({ livro }) => {
  if (!livro) {
    return <p>Carregando informações do livro...</p>;
  }

  return (
    <div>
      <h2>Compra de: {livro.titulo}  </h2>
      <p style={{fontSize:'24px'}}>{livro.titulo}</p>
      <p style={{fontSize:'20px'}}>Valor: R${livro.preco},00</p>
      <p>{livro.descricao}</p>
      <select className="compra-select" >
        <option value="">Selecione forma de pagamento</option>
        <option value="credito">Cartão de Crédito</option>
        <option value="debito">Cartão de Débito</option>
        <option value="pix">PIX</option>
      </select>
    </div>
  );
};

export default Compra;
