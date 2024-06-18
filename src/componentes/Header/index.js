import "./Header.css"
import iconRelogio from "../../assets/icon-relogio.png"
import iconNotificao from "../../assets/icon-notificacoes.png"
import iconPerfil from "../../assets/icon-perfil.png"

const Header = () => {
    return (
        <header>
                <ul className="header-data">
                    <li className="header-data_icon-relogio">
                        <img src={iconRelogio} alt="icon"></img>
                    </li>
                    <li>
                        <p>04 / 04 / 2024 - 15 : 56</p>
                    </li>
                </ul>
          

                <ul className="header-notificacoes-perfil">
                    <li className="header-notificacoes-perfil_icon-notificacao">
                        <img src={iconNotificao} alt="icon"></img>
                    </li>
                    <li className="header-notificacoes-perfil_icon-perfil">
                        <img src={iconPerfil} alt="icon"></img>
                    </li>
                    <li>
                        <p>Demo User</p>
                    </li>
                </ul>
        </header>
    )
}

export default Header