import "./Emprestimos.css"
import Header from "componentes/Header"
import MenuBar from "componentes/MenuBar"
import iconListaEmprestimo from "../../assets/icon-lista-emprestimos.png"
import PageContent from "componentes/PageContent"
import Table from "componentes/Table"
import { useEffect, useState } from "react"
import axios from "axios"

const PageEmprestimos = () => {

    const emprestimo = {
        codEmprestimo: "",
        cancelado: "",
        codAluno: "",
        codCurso: "",
        codLivro: "",
        codRespDevolucao: "",
        codRespEmprestimo: "",
        dataDevolucao: "",
        dataEmprestimo: "",
        atrasado: "",
        codUsuario: "1"
    }

    //Hook 
    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [emprestimos, setEmprestimos] = useState([]);
    const [objEmprestimo, setObjEmprestimo] = useState(emprestimo);

    //useeffect carregando a api backend
    useEffect(() => {
        const fetchEmprestimos = async () => {
          try {
            const response = await axios.get('https://bookflow-3gbn.onrender.com/emprestimos');
            if (response.data && response.data.lista && Array.isArray(response.data.lista)) {
              setEmprestimos(response.data.lista);
            } else {
              console.error('A resposta da API não contém a estrutura esperada:', response.data);
            }
          } catch (error) {
            console.error('Erro ao buscar empréstimos:', error);
          }
        };
        fetchEmprestimos();
      }, []);

    //obtendo dados do formulario
    const aoDigitar = (e) => {
        setObjEmprestimo({ ...objEmprestimo, [e.target.name]: e.target.value });
    }

    //cadastrar subequipamento
    const cadastrar = () => {
        fetch('https://bookflow-3gbn.onrender.com/emprestimos', {
            method: 'post',
            body: JSON.stringify(objEmprestimo),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {

                if (retorno_convertido.mensagem !== undefined) {
                    alert(retorno_convertido.mensagem);
                } else {
                    setEmprestimos([...emprestimos, retorno_convertido]);
                    alert('Emprestimo Cadastrado!');
                    limparFormulario();
                }
            })
    }

    //alterar equipamento
    const alterar = () => {
        fetch('https://bookflow-3gbn.onrender.com/emprestimos/' + objEmprestimo.cod_emp, {
            method: 'put',
            body: JSON.stringify(objEmprestimo),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {

                if (retorno_convertido.mensagem !== undefined) {
                    alert(retorno_convertido.mensagem);
                } else {

                    //mensagem
                    alert('Emprestimo Alterado!');

                    //copia do vetor de equipamentos
                    let vetorTemp = [...emprestimos];

                    //indice 
                    let indice = vetorTemp.findIndex((p) => {
                        return p.cod_emp === objEmprestimo.cod_emp;
                    });

                    //alterar equipamento do vetor temp
                    vetorTemp[indice] = objEmprestimo;

                    //atualizar o vetor de equipamentos
                    setEmprestimos(vetorTemp);

                    //limpar formulario
                    limparFormulario();
                }
            })
    }

    //remover subequipamento
    const remover = () => {
        fetch('https://bookflow-3gbn.onrender.com/emprestimos/' + objEmprestimo.cod_emp, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {

                //mensagem
                alert(retorno_convertido.mensagem);

                //copia do vetor de subequipamento
                let vetorTemp = [...emprestimos];

                //indice 
                let indice = vetorTemp.findIndex((p) => {
                    return p.cod_emp === objEmprestimo.cod_emp;
                });

                //remover subequipamento do vetor temp
                vetorTemp.splice(indice, 1);

                //atualizar o vetor de subequipamento
                setEmprestimos(vetorTemp);

                //limpar formulario
                limparFormulario();
            })
    }

    //limpar formulario do SubEquipamento
    const limparFormulario = () => {
        setObjEmprestimo(emprestimo);
        setBtnCadastrar(true);
    }

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
                    <Table
                        vetor={emprestimos}
                    />
                </PageContent>
            </section>
        </main>
    )
}

export default PageEmprestimos