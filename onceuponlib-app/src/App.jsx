import './App.css';
import Topo from './components/Topo';
import Principal from './components/Principal';
import Rodape from './components/Rodape';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useParams } from 'react-router-dom';
import Programacao from './components/Programacao';
import Catalogo from './components/Catalogo';
import NotFound from './components/NotFound';

const LivroRouterHandler = ({livros}) => {
  const {livroSlug} = useParams();
  const livro = livros.find(l=> l.slug === livroSlug);
  if(!livro) return <NotFound/>

  return <Livro livro={livro}/>
}

const App = () =>{
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(()=>{
    const carregarLivros = async () => {
      try{
        const response = await axios.get("/api/todosOsLivros.json");
        setLivros(response.data);
      }catch(error){
        console.error("Erro ao carregar livros:", error);
        setErro("Falha ao carregar os livros.Tente novamente mais tarde!")
      }
    };
    carregarLivros();
  },[]);
  
  return (
    <>
      <Topo/>
      <main className="principal">
        {erro && <p className='erro'>{erro}</p>}
        <Routes>
          <Route path="/" element={<Home livros={livros}/>}/>
          <Route path="/frontend" element={<Frontend livros={livros}/>}/>
          <Route path="/programacao" element={<Programacao livros={livros}/>}/>
          <Route path="/design" element={<Design livros={livros}/>}/>
          <Route path="/catalogo" element={<Catalogo livros={livros}/>}/>
          <Route path="/livro/:livroSlug" 
          element={<LivroRouterHandler livros = {livros}/>}
          />
          <Route path="/notfound" element={<NotFound/>}/>
        </Routes>
      </main>
      <Rodape/>
    </>
  );
};

export default App;
