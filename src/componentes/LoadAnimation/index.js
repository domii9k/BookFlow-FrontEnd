import "./LoadAnimation.css"
import { ThreeDot } from "react-loading-indicators"

const LoadAnimation = () => {
    return (
        <ul className="load">

            <li>
                <ThreeDot variant="bob" color="#081552" size="large" text="" textColor="" />
            </li>
            <li>
                <p>Carregando Emprestimos</p>
            </li>
        </ul>
    )
}

export default LoadAnimation