import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Carrinho = ({ carrinho, removerDoCarrinho, limparCarrinho, diminuirQuantidade, aumentarQuantidade }) => {
  const [etapa, setEtapa] = useState('carrinho');
  const [forma, setForma] = useState('');
  const [dadosCartao, setDadosCartao] = useState({
    nome: '',
    numero: '',
    validade: '',
    cvv: ''
  });

  const total = carrinho.reduce((acc, livro) => acc + (Number(livro.preco) * livro.quantidade), 0);

  const handleSelecionarForma = (e) => setForma(e.target.value);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDadosCartao(prev => ({ ...prev, [id]: value }));
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();

    if ((forma === 'credito' || forma === 'debito') &&
        (!dadosCartao.nome || !dadosCartao.numero || !dadosCartao.validade || !dadosCartao.cvv)) {
      toast.error("Preencha todos os campos do cartão.");
      return;
    }
    toast.success(`Pagamento de R$ ${total},00 via ${forma} realizado com sucesso!`);
    setTimeout(() => {
      limparCarrinho();
      setEtapa('carrinho');
      setForma('');
      setDadosCartao({ nome: '', numero: '', validade: '', cvv: '' });
    }, 4000); 
  };

  if (etapa === 'pagamento') {
    return (
      <main className="principal">
        <ToastContainer />
        <h2>Finalizar Compra</h2>
        <div className="pag-livro">
          <div className="carrinho-container">
            <h3>Forma de Pagamento</h3>
            <select className="compra-select" value={forma} onChange={handleSelecionarForma}>
              <option value="" disabled>Selecione uma opção</option>
              <option value="credito">Cartão de Crédito</option>
              <option value="debito">Cartão de Débito</option>
              <option value="pix">PIX</option>
            </select>

            {forma && (
              <form onSubmit={handleFinalizarCompra}>
                <hr />
                <p><strong>Total:</strong> R$ {total},00</p>

                {forma === 'pix' && (
                  <>
                    <h4>Pagamento com PIX</h4>
                    <p>Chave PIX: 123.456.789-00</p>
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?data=123.456.789-00&size=150x150"
                      alt="QR Code PIX"
                      style={{ margin: '1em auto', display: 'block' }}
                    />
                  </>
                )}

                {(forma === 'credito' || forma === 'debito') && (
                  <>
                    <h4>Dados do Cartão</h4>
                    <label htmlFor="nome">Nome no Cartão</label>
                    <input type="text" id="nome" value={dadosCartao.nome} onChange={handleInputChange} required />

                    <label htmlFor="numero">Número do Cartão</label>
                    <input type="text" id="numero" value={dadosCartao.numero} onChange={handleInputChange} maxLength="16" required />
                    <div className="cartao-grid">
                      <div>
                        <label htmlFor="validade">Validade (MM/AA)</label>
                        <input type="text" id="validade" value={dadosCartao.validade} onChange={handleInputChange} placeholder="12/29" required />
                      </div>
                      <div>
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" value={dadosCartao.cvv} onChange={handleInputChange} maxLength="3" required />
                      </div>
                    </div>
                  </>
                )}

                <button type="submit" className="btn-finalizar">Pagar Agora</button>
              </form>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (etapa === 'selecao') {
    return (
      <main className="principal">
        <h2>Forma de pagamento</h2>
        <div className="pag-livro">
          <div className="carrinho-container">
            <h3>Selecione a Forma de Pagamento</h3>
            <p>Total da compra: R$ {total},00</p>
            <select className="compra-select" defaultValue="" onChange={(e) => {
              setForma(e.target.value);
              setEtapa('pagamento');
            }}>
              <option value="" disabled>Selecione uma opção</option>
              <option value="credito">Cartão de Crédito</option>
              <option value="debito">Cartão de Débito</option>
              <option value="pix">PIX</option>
            </select>
            <button className='btn-finalizar' onClick={() => setEtapa('carrinho')} style={{ marginTop: '1rem' }}>Voltar ao Carrinho</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='principal'>
      <h2>Resumo da Compra</h2>
      <div className="pag-livro">
        <div className="carrinho-container">
          {carrinho.length === 0 ? (
            <p className="carrinho-vazio">O carrinho está vazio.</p>
          ) : (
            <>
              {carrinho.map((livro) => (
                <div className="carrinho-item" key={livro.slug}>
                  <img src={`/imagens/capas/${livro.id}.jpg`} alt={livro.titulo} />
                  <div className="detalhes">
                    <p className="titulo">{livro.titulo}</p>
                    <div className="quantidade">
                      <button onClick={() => diminuirQuantidade(livro.slug)}>-</button>
                      <span>{livro.quantidade}</span>
                      <button onClick={() => aumentarQuantidade(livro.slug)}>+</button>
                      <button className="remover" onClick={() => removerDoCarrinho(livro.slug)}>Excluir</button>
                    </div>
                    <p className="preco">R$ {(livro.preco * livro.quantidade).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <div className="carrinho-total">
                <hr />
                <div className="total">
                  <strong>TOTAL</strong>
                  <span>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(total)}
                  </span>
                </div>
                <button className="btn-finalizar" onClick={() => setEtapa('selecao')}>
                  Ir para pagamento
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Carrinho;
