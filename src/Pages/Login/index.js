import "./Login.css"
import iconLogin from '../../assets/icon-input-login.png'
import iconSenha from '../../assets/icon-input-senha.png'
import { Link } from "react-router-dom"

const PageLogin = () => {
    return (
        <main className="login">
            <section className="login-container">                
                    <h1 className="login-container_title">BookFlow - Login</h1>            

                <div className="container-content">
                    <div className="login-container_content">

                        <div className="input">
                            <span>
                                <img src={iconLogin} alt="Icone de Login"></img>
                            </span>
                            <div className="form__group field">
                                <input type="input" className="form__field" placeholder="Name" name="name" id='name' required />
                                <label htmlFor="name" className="form__label">Usuário / E-mail</label>
                            </div>
                        </div>

                        <div className="input">
                            <span>
                                <img src={iconSenha} alt="icone de senha"></img>
                            </span>
                            <div className="form__group field">
                                <input type="input" className="form__field" placeholder="Name" name="senha" id='senha' required />
                                <label htmlFor="senha" className="form__label">Senha</label>
                            </div>
                        </div>

                        <p className="text-1">Esqueceu a senha?</p>

                        <Link to="/emprestimos" className="button">Entrar</Link>

                        <p className="text-2">Não possui conta?<br></br>Cadastre-se</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default PageLogin;