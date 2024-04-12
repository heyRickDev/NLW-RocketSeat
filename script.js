let participantes = [
  {
    name: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 6, 12, 8, 10),
    dataCheckIn: new Date(2024, 7, 15, 10, 46),
  },
  {
    name: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 11, 25, 18, 12),
    dataCheckIn: new Date(2024, 11, 27, 20, 46),
  },
  {
    name: "Fernanda Silva",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 14, 30),
    dataCheckIn: new Date(2024, 2, 10, 16, 20),
  },
  {
    name: "Lucas Souza",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 5, 17, 9, 45),
    dataCheckIn: new Date(2024, 5, 20, 11, 15),
  },
  {
    name: "Carla Santos",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 8, 30, 12, 20),
    dataCheckIn: new Date(2024, 9, 2, 14, 5),
  },
  {
    name: "Pedro Oliveira",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 17, 55),
    dataCheckIn: new Date(2024, 1, 7, 19, 30),
  },
  {
    name: "Ana Paula",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 10, 11, 11, 40),
    dataCheckIn: new Date(2024, 10, 13, 13, 25),
  },
  {
    name: "Rafael Lima",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 3, 29, 16, 25),
    dataCheckIn: new Date(2024, 4, 1, 18, 10),
  },
  {
    name: "Juliana Costa",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 7, 4, 10, 15),
    dataCheckIn: new Date(2024, 7, 7, 12, 0),
  },
  {
    name: "Gustavo Santos",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 4, 22, 13, 50),
    dataCheckIn: new Date(2024, 4, 25, 15, 30),
  },
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  //Checagem do null para o checkin
  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button 
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)"s
    >
    Fazer Check-in
    </button>
    `
  }

  return ` 
    <tr>
      <td>
        <strong>
          ${participante.name}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>`
}

const atualizarLista = (participantes) => {
  let output = ""
  //pegar informação do HTML
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  //Substituir informação do HTML
  document.querySelector("tbody").innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    name: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  })

  // Abaixo temos uma versão curta e de se declarar o mesmo:

  // const participanteExiste = participantes.find((p) => p.email == participante.email
  // )

  if (participanteExiste) {
    alert("Email já existe!")
    event.target.querySelector("[name=nome]").value = ""
    event.target.querySelector("[name=email]").value = ""
    return
  }
  participantes = [participante, ...participantes]
  atualizarLista(participantes)
  //limpar os campos do formulário
  event.target.querySelector("[name=nome]").value = ""
  event.target.querySelector("[name=email]").value = ""
}
const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"

  if (confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o checkin do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participantes
  atualizarLista(participantes)
}
