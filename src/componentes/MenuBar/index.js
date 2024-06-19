import "./MenuBar.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import iconUser from "../../assets/icon-user.png"
import iconAlunos from "../../assets/icon-aluno.png"
import iconLivros from "../../assets/icon-book.png"
import iconEmprestimos from "../../assets/icon-emprestimos.png"
import iconDevidos from "../../assets/icon-devidos.png"
import iconRelatorios from "../../assets/icon-relatorios.png"
import iconConfiguracoes from "../../assets/icon-config.png"

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={isOpen ? "menu-lateral-close" : "menu-lateral-open"}>
            <ul>
                <li className={isOpen ? "logo-secundaria" : "logo-principal"}></li>

                <Link to="/usuarios">
                    <li className="item-menu">
                        <span className="item-menu_span-icon">
                            <img src={iconUser} alt="icon"></img>
                        </span>
                        <span className="item-menu_text" hidden={isOpen}>
                            <p>Usuários</p>
                        </span>
                    </li>
                </Link>

                <Link to="/alunos">
                    <li className="item-menu">
                        <span className="item-menu_span-icon">
                            <img src={iconAlunos} alt="icon"></img>
                        </span>
                        <span className="item-menu_text" hidden={isOpen}>
                            <p>Alunos</p>
                        </span>
                    </li>
                </Link>

                <Link to="/livros">
                    <li className="item-menu">
                        <span className="item-menu_span-icon">
                            <img src={iconLivros} alt="icon"></img>
                        </span>
                        <span className="item-menu_text" hidden={isOpen}>
                            <p>Livros</p>
                        </span>
                    </li>
                </Link>

                <Link to="/emprestimos">
                    <li className="item-menu">
                        <span className="item-menu_span-icon">
                            <img src={iconEmprestimos} alt="icon"></img>
                        </span>
                        <span className="item-menu_text" hidden={isOpen}>
                            <p>Emprestimos</p>
                        </span>
                    </li>
                </Link>

                <Link to="/devidos">
                    <li className="item-menu">
                        <span className="item-menu_span-icon">
                            <img src={iconDevidos} alt="icon"></img>
                        </span>
                        <span className="item-menu_text" hidden={isOpen}>
                            <p>Devidos</p>
                        </span>
                    </li>
                </Link>

                <Link to="/relatorios">
                    <li className="item-menu">
                        <span className="item-menu_span-icon">
                            <img src={iconRelatorios} alt="icon"></img>
                        </span>
                        <span className="item-menu_text" hidden={isOpen}>
                            <p>Relatorios</p>
                        </span>
                    </li>
                </Link>

                <Link to="/configuracoes">
                    <li className="item-menu">
                        <span className="item-menu_span-icon">
                            <img src={iconConfiguracoes} alt="icon"></img>
                        </span>
                        <span className="item-menu_text" hidden={isOpen}>
                            <p>Configuracoes</p>
                        </span>
                    </li>
                </Link>
            </ul>

            <div className={isOpen ? "btn-expandir-open" : "btn-expandir-close"} onClick={toggleMenu}>
                <span className={isOpen ? "item-menu_icon-open" : "item-menu_icon-close"}>
                </span>
                <span className="item-menu_text" hidden={isOpen}>
                    <p>Fechar</p>
                </span>
            </div>
        </nav>
    )
}

export default MenuBar
