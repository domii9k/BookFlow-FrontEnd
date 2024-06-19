import Header from "componentes/Header"
import MenuBar from "componentes/MenuBar"
import PageContent from "componentes/PageContent"
import Table from "componentes/Table"
import iconListaDevido from "../../assets/icon-lista-devidos.png"

const PageDevidos = () => {
    return (
        <main>
            <MenuBar></MenuBar>
            <section>
                <Header></Header>
                
                <PageContent
                    pageName="Lista de Devidos"
                    buttonName="Novo"
                    iconPage={iconListaDevido}>
                </PageContent>
            </section>
        </main>
    )
}

export default PageDevidos