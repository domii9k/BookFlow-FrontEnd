import Header from "componentes/Header"
import MenuBar from "componentes/MenuBar"

const PageAluno = () => {
    return (
        <main>
            <MenuBar></MenuBar>
            <section  style={{height: "100vh"}}>  
                <Header></Header>
                
                <section className="configuracoes-content">

                    <h1>
                        Desculpe ainda estamos trabalhando nessa página!
                    </h1>

                </section>
            </section>
        </main>
    )
}

export default PageAluno