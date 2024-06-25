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
        console.error('Erro ao buscar empréstimos:', error);
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
            <LoadAnimation/>
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