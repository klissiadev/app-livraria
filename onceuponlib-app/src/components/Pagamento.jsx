import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Pagamento = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { livro, formaPagamento } = location.state || {};

  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
  });
  const [erro, setErro] = useState('');

  const handleInputChange = (e) => {
    setDadosCartao({ ...dadosCartao, [e.target.name]: e.target.value });
  };

  const validarCartao = () => {
    const { numero, nome, validade, cvv } = dadosCartao;
    if (!numero || !nome || !validade || !cvv) {
      setErro('Todos os campos devem ser preenchidos');
      return false;
    }
    if (numero.length < 16 || cvv.length < 3) {
      setErro('Número do cartão ou CVV inválidos');
      return false;
    }
    setErro('');
    return true;
  };

  if (!livro || !formaPagamento) {
    return <p>Informações de pagamento não encontradas.</p>;
  }

  return (
    <main className="principal">
        <h2>Forma de pagamento</h2>
        <div style={{display:'flex',alignItems:'center', flexDirection:"column"}}>
          <button className='botao' onClick={() => navigate(-1)}>← Voltar</button>

          {['credito', 'debito'].includes(formaPagamento) && (
            <>
              <h3 style={{ textAlign: 'center', padding:'5px' }}>
                Pagamento via Cartão de {formaPagamento === 'credito' ? 'Crédito' : 'Débito'}
              </h3>
              <div className="form-cartao">
                <input
                  type="text"
                  name="numero"
                  placeholder="Número do Cartão"
                  value={dadosCartao.numero}
                  onChange={handleInputChange}
                  maxLength="16"
                />
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome do Titular"
                  value={dadosCartao.nome}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="validade"
                  placeholder="Validade (MM/AA)"
                  value={dadosCartao.validade}
                  onChange={handleInputChange}
                  maxLength="5"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={dadosCartao.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                />
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button onClick={() => validarCartao() && alert('Compra aprovada!')}>
                  Finalizar Compra
                </button>
              </div>
            </>
          )}

          {formaPagamento === 'pix' && (
            <>
              <h3  style={{ textAlign: 'center', marginLeft:'70px', marginTop:'30px' }}>Pagamento via PIX</h3>
              <div className="pix">
                <img
                  src="/imagens/qrcodemodelo.png"
                  alt="QR Code"
                  style={{ width: '200px', margin: '20px 0' }}
                />
              </div>
              <p>Pagamento realizado com sucesso!</p>
            </>
          )}
        </div>
    </main>
  );
};

export default Pagamento;
