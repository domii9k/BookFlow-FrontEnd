import "./Emprestimos.css"
import Header from "componentes/Header"
import MenuBar from "componentes/MenuBar"
import iconListaEmprestimo from "../../assets/icon-lista-emprestimos.png"
import PageContent from "componentes/PageContent"
import Table from "componentes/Table"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadAnimation from "componentes/LoadAnimation"

const PageEmprestimos = () => {

  //Hook 
  const [emprestimos, setEmprestimos] = useState([]);
  const [carregandoEmprestimos, setCarregandoEmprestimos] = useState(true);

  //useeffect carregando a api backend
  useEffect(() => {
    const fetchEmprestimos = async () => {
      try {
        const response = await axios.get('https://bookflow-3gbn.onrender.com/emprestimos');
        if (Array.isArray(response.data)) {
          setEmprestimos(response.data);
        } else {
          console.error('A resposta da API não contém a estrutura esperada:', response.data);
        }
      } catch (error) {
        if (error.response) {
          // A requisição foi feita e o servidor respondeu com um status code fora do alcance 2xx
          console.error('Erro na resposta da API:', error.response);
        } else if (error.request) {
          // A requisição foi feita mas nenhuma resposta foi recebida
          console.error('Erro na requisição:', error.request);
        } else {
          // Algo aconteceu ao configurar a requisição que disparou um erro
          console.error('Erro ao configurar a requisição:', error.message);
        }
      }
    };
    fetchEmprestimos();
  }, []);

  useEffect(() => {
    if (emprestimos.length === 0) {
      setCarregandoEmprestimos(true);
    } else {
      setCarregandoEmprestimos(false);
    }
  }, [emprestimos]);

  return (
    <main>
      <MenuBar></MenuBar>
      <section className="emprestimos">
        <Header></Header>

        <PageContent
          pageName="Lista de Empréstimos"
          buttonName="Novo Empréstimo"
          routerButton="/emprestimos/formulario"
          iconPage={iconListaEmprestimo}
        >

          {carregandoEmprestimos ? (
            <LoadAnimation />
          ) : (
            <Table
              vetor={emprestimos}
            />
          )
          }

        </PageContent>
      </section>
    </main>
  )
}

export default PageEmprestimos