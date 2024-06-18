import "./PageContent.css"
import { Link } from "react-router-dom"
import iconAdd from "../../assets/icon-add.png"

const PageContent = (props) => {

    return (
        <section className="content">
            <section className="content_container">
                <div className="container_header">
                    <ul>
                        <li className="container-header-icon">
                            <img src={props.iconPage} alt="icon"></img>
                        </li>
                        <li className="container-header-text">
                            {props.pageName}
                        </li>
                    </ul>

                    <div className="header-button">
                        <Link to={props.routerButton} className="">
                            <ul className="header-button_lista">
                                <li className="lista-icon">
                                    <img src={iconAdd} alt="icon"></img>
                                </li>
                                <li className="lista-text">
                                    {props.buttonName}
                                </li>
                            </ul>
                        </Link>
                    </div>
                </div>

                <div className="container_subheader">

                    <div className="container-input-search">
                        <input type="input" className="input-search" placeholder="Pesquise aqui" name="name" id='name' />
                    </div>

                    <div className="container-filter">
                        <select className="select-filter" defaultValue="">
                            <option value="" disabled>Filtrar</option>
                        </select>

                        <select className="select-ordenar" defaultValue="">
                            <option value="" disabled>Ordenar</option>
                        </select>
                    </div>

                </div>
                {props.children}
            </section>
        </section>
    )
}

export default PageContent