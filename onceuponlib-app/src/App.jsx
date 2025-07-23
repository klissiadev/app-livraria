import "./App.css"
import Topo from "./components/Topo";
import Rodape from "./components/Rodape";
import Livro from "./components/Livro"
import Frontend from "./components/Frontend";
import Programação from "./components/Programacao";
import Design from "./components/Design";
import Catalogo from "./components/Catalogo";
import NotFound from "./components/NotFound";
import Home from "./components/Home"
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useParams } from "react-router-dom";
import Carrinho from "./components/Carrinho";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



//componente para manipular a rota do livro
const LivroRouteHandler = ({livros, onAddToCart}) => {
  const {livroSlug} = useParams();
  const livro = livros.find(l => l.slug === livroSlug);

  if(!livro) return <NotFound/>;
  return <Livro livro={livro} onAddToCart={onAddToCart} />
}


const App = () => {
  const [livros, setLivros] = useState([]);
  const[erro, setErros] = useState(null);
  const [carrinho, setCarrinho] = useState([])

  const adicionarAoCarrinho = (livro) => {
    const livroNoEstoque = livros.find(item => item.slug === livro.slug);

    if (!livroNoEstoque || livroNoEstoque.quantidade <= 0) {
      toast.error(`Livro "${livro.titulo}" está esgotado!`);
      return;
    }

    const livroNoCarrinho = carrinho.find(item => item.slug === livro.slug);
    let novoCarrinho;

    if (livroNoCarrinho) {
      novoCarrinho = carrinho.map(item =>
        item.slug === livro.slug
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    } else {
      novoCarrinho = [...carrinho, { ...livro, quantidade: 1 }];
    }

    const livrosAtualizados = livros.map(item =>
      item.slug === livro.slug
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );

    setCarrinho(novoCarrinho);
    setLivros(livrosAtualizados);
    toast.success(`Livro "${livro.titulo}" adicionado ao carrinho!`);
  };

  const removerDoCarrinho = (slug) => {
    const itemNoCarrinho = carrinho.find(livro => livro.slug === slug);
    if (!itemNoCarrinho) return;

    // Devolve a quantidade ao estoque
    const livrosAtualizados = livros.map(item =>
      item.slug === slug
        ? { ...item, quantidade: item.quantidade + itemNoCarrinho.quantidade }
        : item
    );
    const novoCarrinho = carrinho.filter(livro => livro.slug !== slug);
    setCarrinho(novoCarrinho);
    setLivros(livrosAtualizados);
    toast.success(`Livro removido do carrinho!`);
  };

  const aumentarQuantidade = (slug) => {
    const livroNoEstoque = livros.find(livro => livro.slug === slug);

    if (livroNoEstoque && livroNoEstoque.quantidade > 0) {
      const novoCarrinho = carrinho.map(livro =>
        livro.slug === slug
          ? { ...livro, quantidade: livro.quantidade + 1 }
          : livro
      );

      const livrosAtualizados = livros.map(livro =>
        livro.slug === slug
          ? { ...livro, quantidade: livro.quantidade - 1 }
          : livro
      );

      setCarrinho(novoCarrinho);
      setLivros(livrosAtualizados);
    } else {
      toast.error("Estoque esgotado para este livro.");
    }
  };

  const diminuirQuantidade = (slug) => {
    const itemNoCarrinho = carrinho.find(livro => livro.slug === slug);
    if (!itemNoCarrinho) return;

    if (itemNoCarrinho.quantidade === 1) {
      removerDoCarrinho(slug);
    } else {
      const novoCarrinho = carrinho.map(livro =>
        livro.slug === slug
          ? { ...livro, quantidade: livro.quantidade - 1 }
          : livro
      );

      const livrosAtualizados = livros.map(livro =>
        livro.slug === slug
          ? { ...livro, quantidade: livro.quantidade + 1 }
          : livro
      );

      setCarrinho(novoCarrinho);
      setLivros(livrosAtualizados);
    }
  };

  const limparCarrinho = () => {
    setCarrinho([])
  };

  useEffect(() => {
    const carregarLivros = async () => {
      try{
        const response = await axios.get("/api/todosOsLivros.json");
        setLivros(response.data);
      }catch(error){
        console.error("Erro ao carregar livros:", error);
        setErros("Falha ao carregar os livros. Tente novamente mas tarde!");
      }
    };
    carregarLivros();
    },[]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Topo />
        {erro && <p className="erro">{erro}</p>}
        <Routes>
          <Route path="/" element={<Home livros={livros}/>}/>
          <Route path="/frontend" element={<Frontend livros={livros}/>}/>
          <Route path="/programacao" element={<Programação livros={livros}/>}/>
          <Route path="/design" element={<Design livros={livros}/>}/>
          <Route path="/catalogo" element={<Catalogo livros={livros}/>}/>
          <Route path="/livro/:livroSlug"
  element={<LivroRouteHandler livros={livros} onAddToCart={adicionarAoCarrinho} />}
          />
          <Route path="/carrinho" element={<Carrinho carrinho={carrinho} removerDoCarrinho={removerDoCarrinho} limparCarrinho={limparCarrinho} aumentarQuantidade={aumentarQuantidade} diminuirQuantidade={diminuirQuantidade}/>}/>
          
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      <Rodape />
    </>
  );
}

export default App;
