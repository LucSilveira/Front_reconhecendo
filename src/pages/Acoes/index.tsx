import { useEffect, useState } from "react";
// import CardLogs from "../../components/CardLogs"
// import { useParams } from "react-router-dom";
import "./style.css"
import api from "../../utils/api";
import CardLogs from "../../components/CardLogs";

import moment from "moment";
import Header from "../../components/Header/Header";


export default function Acoes() {

  // const[id] = useParams();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    document.title = "LOGS - SecurePass"
    listarLogs()
  }, [])

  function listarLogs() {
    const idUser = localStorage.getItem("id")

    api.get(`users/login/${idUser}`).then((response: any) => {
      console.log(response.data)
      setUsers(response.data)
    })

  }
  return (

    <main className="_acoes">

      <Header/>
      <section>
       <h2>Tabela de Logs</h2>
        <table>
          {/* <caption>Tabela de Logs</caption> */}
          <thead className="tabela">
            <tr className="tabela">
              <th>Nome do Funcionario</th>
              <th>Função</th>
              <th>Sessão</th>
              <th>Horario de Acesso</th>
            </tr>
            {users.sort( (a, b) => b.data - a.data ).map((user: any) => {
              return <tr key={user.id} className="tabela">
                <CardLogs
                  nome={user.user.nome}
                  funcao={user.user.funcao}
                  sessao={user.user.sessao}
                  // id={new Date(user.login_time).toLocaleDateString}
                  id={ moment(user.login_time).format("DD/MM/YYYY HH:mm:ss")}
                />
              </tr>

            }
            )}

            {/* Testando o CardLogs para ver se está recebendo o codigo do componente corretamente... */}

            {/* {
          users.map((users: any, index: number) => {
            return <th key={index}>
                  <CardLogs
                  nome={users.nome}
                  
                   />
            </th>
        })
        } */}


            {/* Codigo para trazer caso não encontre nenhum log feito... */}
            {/* <tr className="linha-mensagem">
            <td colSpan={4}>Nenhum usuario cadastrado 😭 </td>
        </tr> */}

          </thead>
          <tbody id="corpo-tabela"></tbody>
        </table>

      </section>
    </main>



  )


}