import React from 'react';
import { useNavigate } from 'react-router-dom';

const Compra = ({ livro }) => {
  const navigate = useNavigate();

  const handleSelecionarForma = (e) => {
    const forma = e.target.value;
    if (!forma) return;

    navigate('/pagamento', {
      state: { livro, formaPagamento: forma },
    });
  };

  if (!livro) {
    return <p>Carregando informações do livro...</p>;
  }

  return (
    <div>
      <h2>Compra de: {livro.titulo}</h2>
      <p style={{ fontSize: '24px' }}>{livro.titulo}</p>
      <p style={{ fontSize: '20px' }}>Valor: R${livro.preco},00</p>
      <p>{livro.descricao}</p>

      <select className="compra-select" defaultValue="" onChange={handleSelecionarForma}>
        <option value="">Selecione a forma de pagamento</option>
        <option value="credito">Cartão de Crédito</option>
        <option value="debito">Cartão de Débito</option>
        <option value="pix">PIX</option>
      </select>
    </div>
  );
};

export default Compra;
