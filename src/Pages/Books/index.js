import Header from "componentes/Header"
import MenuBar from "componentes/MenuBar"
import PageContent from "componentes/PageContent"
import Table from "componentes/Table"
import iconListaLivro from "../../assets/icon-lista-livro.png"

const PageBooks = () => {
    return (
        <main>
            <MenuBar></MenuBar>
            <section>
                <Header></Header>

                <PageContent
                    pageName="Lista de Livro"
                    buttonName="Novo Livro"
                    iconPage={iconListaLivro}>
                </PageContent>
            </section>
        </main>
    )
}

export default PageBooks