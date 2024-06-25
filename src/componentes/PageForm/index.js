import { Link } from "react-router-dom"
import iconSave from "../../assets/icon-save.png"
import "./PageForm.css"
import Header from "componentes/Header"
import { useEffect, useState } from "react"
import Modal from "componentes/ModalSuccess"

const PageForm = () => {

    // Obj inteiro para cadastro dos Emprestimos
    const emprestimo = {
        cancelado: 0,
        codAluno: {
            codAluno: "",
            nomeCompleto: "",
            ra: "",
            cpf: ""
        },
        codCurso: {
            codCurso: "",
            descricao: "",
        },
        codLivro: {
            codLivro: "",
            titulo: "",
            patrimonio: ""
        },
        codRespEmprestimo: {
            codUsuario: 1,
        },
        dataDevolucao: "",
        dataEmprestimo: "",
        atrasado: 0,
        observacao: ""
    };

    // Obj's para a busca dos Cursos, Alunos e Livros ja cadastrados
    const objCursos = { codCurso: "", descricao: "" };
    const objAlunos = { codAluno: "", nomeCompleto: "", ra: "", cpf: "" };
    const objlivros = { codLivro: "", titulo: "", patrimonio: "" };

    const [emprestimos, setEmprestimos] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [livros, setLivros] = useState([]);

    const [objEmprestimo, setObjEmprestimo] = useState(emprestimo);
    const [objCurso, setObjCurso] = useState(objCursos);
    const [objAluno, setObjAluno] = useState(objAlunos);
    const [objLivro, setObjLivro] = useState(objlivros);

    const [searchCurso, setSearchCurso] = useState('');
    const [searchAluno, setSearchAluno] = useState('');
    const [searchLivro, setSearchLivro] = useState('');

    // Hook para aparecer a search box
    const [searchCursoOpen, setSearchCursoOpen] = useState(false);
    const [searchAlunoOpen, setSearchAlunoOpen] = useState(false);
    const [searchLivroOpen, setSearchLivroOpen] = useState(false);

    const [error, setError] = useState(null);

    // Abrir Modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    // Fetch para Carregar as APIs
    const fetchData = async (url, setData, retries = 3) => {
        while (retries > 0) {
            try {
                const response = await fetch(url);
                // console.log(`Response status from ${url}:`, response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // console.log(`Data from ${url}:`, data);

                if (Array.isArray(data)) {
                    setData(data);
                    return; // Sucesso, sai do loop
                } else {
                    throw new Error(`Data from ${url} is not an array`);
                }
            } catch (error) {
                console.error(`Error fetching data from ${url} (retries left: ${retries}):`, error);
                retries -= 1;
                if (retries === 0) {
                    setError(`Failed to fetch data from ${url} after multiple attempts: ${error.message}`);
                } else {
                    await new Promise(res => setTimeout(res, 1000)); // Espera 1 segundo antes de tentar novamente
                }
            }
        }
    };

    console.log(emprestimos)
    console.log(emprestimo)

    // URL para a fetch
    useEffect(() => {
        fetchData('https://bookflow-3gbn.onrender.com/cursos', setCursos);
        fetchData('https://bookflow-3gbn.onrender.com/alunos', setAlunos);
        fetchData('https://bookflow-3gbn.onrender.com/livros', setLivros);
    }, []);

    const filterData = (data, searchTerm, fields) => {
        return data.filter(item =>
            fields.some(field => item[field].toLowerCase().includes(searchTerm.toLowerCase()))
        );
    };

    const handleSelection = (type, item) => {
        if (type === 'curso') {
            setObjCurso(item);
            setSearchCurso(item.descricao);
            setSearchCursoOpen(false);
            setObjEmprestimo(prevState => ({
                ...prevState,
                codCurso: item
            }));
        } else if (type === 'aluno') {
            setObjAluno(item);
            setSearchAluno(item.nomeCompleto);
            setSearchAlunoOpen(false);
            setObjEmprestimo(prevState => ({
                ...prevState,
                codAluno: item
            }));
        } else if (type === 'livro') {
            setObjLivro(item);
            setSearchLivro(item.titulo);
            setSearchLivroOpen(false);
            setObjEmprestimo(prevState => ({
                ...prevState,
                codLivro: item
            }));
        }
    };

    // Funcao para pegar o valor digitado e o nome do input
    // Assim formando um obj e guadando os dados ate serem enviados
    const aoDigitar = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        setObjEmprestimo(prevState => {
            let nestedObj = { ...prevState };
            keys.reduce((nested, key, index) => {
                if (index === keys.length - 1) {
                    nested[key] = value;
                } else {
                    nested[key] = { ...nested[key] };
                }
                return nested[key];
            }, nestedObj);
            return nestedObj;
        });
    };


    // Funcao para o cadastro de Emprestimos
    const cadastrar = () => {
        console.log('Objeto a ser enviado:', objEmprestimo); // Adicione esta linha para verificar o objeto
    
        fetch('https://bookflow-3gbn.onrender.com/emprestimos', {
            method: 'post',
            body: JSON.stringify(objEmprestimo),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => {
                if (!retorno.ok) {
                    throw new Error(`HTTP error! status: ${retorno.status}`);
                }
                return retorno.json();
            })
            .then(retorno_convertido => {
                console.log('Resposta da API:', retorno_convertido); // Adicione esta linha para verificar a resposta
    
                if (retorno_convertido.mensagem !== undefined) {
                    alert(retorno_convertido.mensagem);
                } else {
                    setEmprestimos([...emprestimos, retorno_convertido]);
                    openModal();
                    //setTimeout(() => {
                       // window.location.reload();
                  //  }, 2000);
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar empréstimo:', error);
                alert('Ocorreu um erro ao tentar cadastrar o empréstimo.');
            });
    };
    

    // const alterar = () => {
    //     fetch('http://localhost:9000/emprestimos' + objEmprestimo.codEmprestimo, {
    //         method: 'put',
    //         body: JSON.stringify(objEmprestimo),
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //         .then(retorno => retorno.json())
    //         .then(retorno_convertido => {
    //             if (retorno_convertido.mensagem !== undefined) {
    //                 alert(retorno_convertido.mensagem);
    //             } else {
    //                 alert('Empréstimo Alterado!');
    //                 const vetorTemp = [...emprestimos];
    //                 const indice = vetorTemp.findIndex((p) => p.codEmprestimo === objEmprestimo.codEmprestimo);
    //                 vetorTemp[indice] = objEmprestimo;
    //                 setEmprestimos(vetorTemp);
    //                 limparFormulario();
    //             }
    //         })
    // };

    // const remover = () => {
    //     fetch('http://localhost:9000/emprestimos' + objEmprestimo.codEmprestimo, {
    //         method: 'delete',
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //         .then(retorno => retorno.json())
    //         .then(retorno_convertido => {
    //             alert(retorno_convertido.mensagem);
    //             const vetorTemp = [...emprestimos];
    //             const indice = vetorTemp.findIndex((p) => p.codEmprestimo === objEmprestimo.codEmprestimo);
    //             vetorTemp.splice(indice, 1);
    //             setEmprestimos(vetorTemp);
    //             limparFormulario();
    //         })
    // };

    return (
        <section className="content-form">
            <Header />
            <p className="texto-paginas"><Link to="/emprestimos">Empréstimos</Link>/<Link to="/emprestimos/formulario">Formulário</Link></p>
            <section className="content-form_container">
                <div className="form-container_header">
                    <h1>Realizar Empréstimo</h1>
                </div>

                <div className="form-container_content">
                    <form>

                        {/* Inputs com os IDs dos campos Aluno, Livro e Curso
                            Assim eh passado esse valor para a API */}
                        <input
                            type="text"
                            value={objAluno.codAluno}
                            onChange={aoDigitar}
                            name="codAluno.codAluno"
                            placeholder="Id Aluno"
                            hidden
                        />
                        <input
                            type="text"
                            value={objCurso.codCurso}
                            onChange={aoDigitar}
                            name="codCurso.codCurso"
                            placeholder="Id Curso"
                            hidden
                        />
                        <input
                            type="text"
                            value={objLivro.codLivro}
                            onChange={aoDigitar}
                            name="codLivro.codLivro"
                            placeholder="Id Livro"
                            hidden
                        />

                        <section className="form-principal">
                            <section className="label-input">
                                <div className="label-form_principal">
                                    <label>Aluno:</label>
                                    <label>CPF:</label>
                                    <label>RA:</label>
                                    <label>Curso:</label>
                                </div>

                                <div className="input-form_principal">
                                    <input
                                        type="text"
                                        value={searchAluno}
                                        onClick={() => setSearchAlunoOpen(true)}
                                        onChange={(e) => setSearchAluno(e.target.value)}
                                        name="codAluno.codAluno"
                                        placeholder="Aluno"
                                    />
                                    {searchAlunoOpen && (
                                        <div className="search-bar-aluno">
                                            {filterData(alunos, searchAluno, ['nomeCompleto', 'ra', 'cpf']).map((obj, indice) => (
                                                <ul key={indice} onClick={() => handleSelection('aluno', obj)}>
                                                    <li>
                                                        <p>{obj.nomeCompleto}</p>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    )}

                                    <input
                                        type="text"
                                        value={objAluno.cpf}
                                        onChange={aoDigitar}
                                        name="codAluno.cpf"
                                        placeholder="CPF"
                                    />

                                    <input
                                        type="text"
                                        value={objAluno.ra}
                                        onChange={aoDigitar}
                                        name="codAluno.ra"
                                        placeholder="RA"
                                    />

                                    <input
                                        type="text"
                                        value={searchCurso}
                                        onClick={() => setSearchCursoOpen(true)}
                                        onChange={(e) => setSearchCurso(e.target.value)}
                                        name="codCurso.codCurso"
                                        placeholder="Selecione o Curso"
                                    />
                                    {searchCursoOpen && (
                                        <div className="search-bar-curso">
                                            {filterData(cursos, searchCurso, ['descricao']).map((obj, indice) => (
                                                <ul key={indice} onClick={() => handleSelection('curso', obj)}>
                                                    <li>
                                                        <p>{obj.descricao}</p>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>

                            <section className="label-input">
                                <div className="label-form_principal">
                                    <label>Livro:</label>
                                    <label>Patrimônio:</label>
                                    <label>Data:</label>
                                    <label>Devolução:</label>
                                </div>
                                <div className="input-form_principal">
                                    <input
                                        type="text"
                                        placeholder="Nome do Livro"
                                        value={searchLivro}
                                        onClick={() => setSearchLivroOpen(true)}
                                        onChange={(e) => setSearchLivro(e.target.value)}
                                        name="codLivro.codLivro"
                                    />
                                    {searchLivroOpen && (
                                        <div className="search-bar-livro">
                                            {filterData(livros, searchLivro, ['titulo', 'patrimonio']).map((obj, indice) => (
                                                <ul key={indice} onClick={() => handleSelection('livro', obj)}>
                                                    <li>
                                                        <p>{obj.titulo}</p>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    )}

                                    <input
                                        type="text"
                                        placeholder="Patrimônio do livro"
                                        value={objEmprestimo.codLivro.patrimonio}
                                        onChange={aoDigitar}
                                        name="codLivro.patrimonio"
                                    />
                                    <input
                                        type="date"
                                        value={objEmprestimo.dataDevolucao}
                                        onChange={aoDigitar}
                                        name="dataDevolucao"
                                    />
                                    <input
                                        type="date"
                                        value={objEmprestimo.dataEmprestimo}
                                        onChange={aoDigitar}
                                        name="dataEmprestimo"
                                    />
                                </div>
                            </section>
                        </section>

                        <div className="input-secundario">
                            <label>Observação:</label>

                            <textarea
                                value={objEmprestimo.observacao}
                                onChange={aoDigitar}
                                name="observacao"
                                rows="6"
                                placeholder="Observação sobre o empréstimo">
                            </textarea>

                            <p className="form-text">* O aluno declara que leu e concorda com os seguintes termos e condições para o empréstimo<br /> de livros da biblioteca da escola:</p>
                            <ul className="list-form-text">
                                <li>Compromete-se a devolver o livro emprestado dentro do prazo estabelecido pela biblioteca.</li>
                                <li>Está ciente de que a não devolução do livro dentro do prazo acarretará em multa conforme<br /> política da biblioteca.</li>
                                <li>Concorda em zelar pelo livro emprestado, mantendo-o em bom estado de conservação.</li>
                                <li>Compreende que deve comunicar à biblioteca imediatamente qualquer problema<br /> relacionado ao livro emprestado.</li>
                            </ul>
                            <p className="form-text">Ao clicar na caixa de seleção abaixo, o aluno confirma que leu e aceita os termos acima<br /> mencionados:</p>
                        </div>

                        <div className="form-checkbox">
                            <label><input type="checkbox" />O aluno concorda com os termos de empréstimo de livros.</label>
                            <p>(Esta confirmação será enviada diretamente ao e-mail do aluno.)</p>
                        </div>
                    </form>
                </div>
            </section>

            <div className="container-button-save">
                <Link to="#" onClick={cadastrar} className="button-save">
                    <ul>
                        <li>
                            <img src={iconSave} alt="icon" />
                        </li>
                        <li>
                            Salvar
                        </li>
                    </ul>
                </Link>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2>Emprestimo Cadastrado com Sucesso!</h2>
                </Modal>
            </div>
        </section>
    );
}

export default PageForm;