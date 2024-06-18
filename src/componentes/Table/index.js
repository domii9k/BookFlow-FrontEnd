import "./Table.css"

const Table = ({ vetor }) => {
    console.log(vetor)
    return (
        <div className="container-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Aluno</th>
                        <th>Livro</th>
                        <th>Emprestimo</th>
                        <th>Responsavel</th>
                        <th>Prazo Devolução</th>
                    </tr>
                </thead>

                <tbody>
                    {vetor.map(obj => (
                        <tr key={obj.codEmprestimo}>
                            <td>{obj.codEmprestimo}</td>
                            <td>{obj.codAluno.nomeCompleto}</td>
                            <td>{obj.codLivro.titulo}</td>            
                            <td>{obj.dataEmprestimo.join('/')}</td>
                            <td>{obj.codRespEmprestimo.nome}</td>
                            <td>{obj.dataDevolucao.join('/')}</td>
                        </tr>
                    ))}
                </tbody>


            </table>
        </div>
    )
}

export default Table