import { Link } from "react-router-dom"
import iconSave from "../../assets/icon-save.png"
import "./PageForm.css"
import Header from "componentes/Header"

const PageForm = () => {
    return (
        <section className="content-form">
            <Header></Header>
            <p className="texto-paginas"><Link to="/emprestimos">Emprestimos</Link>/<Link to="/emprestimos/formulario">Formulario</Link></p>
            <section className="content-form_container">
                <div className="form-container_header">
                    <h1>Realizar Emprestimo</h1>
                </div>

                <div className="form-container_content">

                    <form>
                        <section className="form-principal">
                            <section className="label-input">
                                <div className="label-form_principal">
                                    <label>Aluno:</label>
                                    <label>RA/CPF:</label>
                                    <label>Curso:</label>
                                </div>

                                <div className="input-form_principal">
                                    <input type="text" placeholder="Aluno" />
                                    <input type="text" placeholder="RA ou CPF" />
                                    <input type="text" placeholder="Selecione o Curso" />
                                </div>
                            </section>

                            <section className="label-input">
                                <div className="label-form_principal">
                                    <label>Livro:</label>
                                    <label>Patrimonio:</label>
                                    <label>Data:</label>
                                    <label>Devolução:</label>
                                </div>

                                <div className="input-form_principal">
                                    <input type="text" placeholder="Nome do Livro" />
                                    <input type="text" placeholder="Patrimonio do livro" />
                                    <input type="date" />
                                    <input type="date" />
                                </div>
                            </section>
                        </section>

                        <div className="input-secundario">
                            <label>Observação:</label>
                            <textarea rows="6" placeholder="Observação sobre o empréstimo"></textarea>
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
                <Link to="/" className="button-save">
                    <ul>
                        <li>
                            <img src={iconSave} alt="icon"></img>
                        </li>
                        <li>
                            Salvar
                        </li>
                    </ul>
                </Link>
            </div>

        </section>
    )
}

export default PageForm