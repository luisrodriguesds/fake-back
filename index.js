const express = require('express')
const cors = require('cors')

const internalTeam = require('./internalTeam')
const users = require('./users')
const app = express()
app.use(express.json())
app.use(cors())


app.post('/signin', async (request, response) => {
  const { user } = request.body
  const findUser = users.find(item => item.email === user.email && item.password === user.password)
  setTimeout(() => {

    if (!findUser) {
      return response.status(404).json( {
        statusCode: 404,
        result: {},
        errorMessage: [],
      })
    }
  
    return response.status(200).json({
      statusCode: 200,
      result: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQzMSwiaWF0IjoxNjAwNzg3Njg3fQ.aOfo_aRb1p3vuuXC2L2QQwGBGSuvmCDkm54yQpOGlas",
        user: {
          ...findUser
        }
      },
      errorMessage: [],
    })

    
  }, 1000)
  
})
app.post('/signup', (request, response) => {
  const { user, provider } = request.body
  providers.push({ user, provider })
  setTimeout(() => {
    return response.status(200).json({
      statusCode: 200,
      result: {},
      errorMessage: [],
    })
  }, 1000)
})
app.post('/service/adm/users', (request, response) => {
  
  setTimeout(() => {

    return response.status(200).json({
      statusCode: 200,
      result:{
        users: internalTeam
      },
      errorMessage: []
    })
  }, 1000)
})
app.post('/service/diretor/users', (request, response) => {
  
  const findUsers = internalTeam.filter(user => user.type != '1' && user.type != '2')

  setTimeout(() => {
    return response.status(200).json({
      statusCode: 200,
      result: {
        users: findUsers
      },
      errorMessage: [],
    })
  }, 1000)
})

app.post('/service/adm/users/find', (request, response) => {
  const { internalTeam: { search } } = request.body
  let res = [...internalTeam]
  if (search.orderByName == 'ASC') {
    
    res = res.sort((a,b) => {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    })
  }else if (search.type) {
    res = res.filter(user => user.type == search.type)
  }else if (search.status != undefined) {
    res = res.filter(user => String(user.status) == search.status)
  }else if(search.name || search.email){
    
  }else if(search.isDeleted){
    
  }

  setTimeout(() => {
    return response.status(200).json({
      statusCode: 200,
      result: {
        users: res
      },
      errorMessage: [],
    })
  }, 1000)
})

app.post('/service/diretor/users/find', (request, response) => {
  const { internalTeam: { search } } = request.body
  let res = internalTeam.filter(user => user.type != '1' && user.type != '2')
  if (search.orderByName == 'ASC') {
    
    res = res.sort((a,b) => {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    })
  }else if (search.type) {
    res = res.filter(user => user.type == search.type)
  }else if(search.status != undefined){
    res = res.filter(user => String(user.status) == search.status)
  }

  setTimeout(() => {
    return response.status(200).json({
      statusCode: 200,
      result: {
        users: res
      },
      errorMessage: [],
    })
  }, 1000)
})


app.post('/service/adm/signup/users', (request, response) => {
  setTimeout(() => {
    return response.status(200).json({})
  }, 1000)
})

const providers = [
  {
    id: '1',
    name: 'Juliana Santos',
    email: 'juliana@kroton.com.br',
    cnpj:'000.000.000/0001-00',
    companyName: 'Saraiva Educação',
    status: 'Análise',
    type: 'Instituição de Ensino',
    isOpen: false,
  },
  {
    id: '2',
    name: 'Juliana Santos',
    email: 'juliana@kroton.com.br',
    cnpj:'000.000.000/0001-00',
    companyName: 'Hospital Albert Einstein',
    status: 'Reprovado',
    type: 'Instituição de Ensino',
    isOpen: false,
  },
  {
    id: '3',
    name: 'Juliana Santos',
    email: 'juliana@kroton.com.br',
    cnpj:'000.000.000/0001-00',
    companyName: 'Kroton',
    status: 'Análise',
    type: 'Instituição de Ensino',
    isOpen: false,
  },
  {
    id: '4',
    name: 'Juliana Santos',
    email: 'juliana@kroton.com.br',
    cnpj:'000.000.000/0001-00',
    companyName: 'VG Educacional',
    status: 'Aprovado',
    type: 'Fornecedor de Conteúdo',
    isOpen: false,
  },
  {
    id: '5',
    name: 'Juliana Santos',
    email: 'juliana@kroton.com.br',
    cnpj:'000.000.000/0001-00',
    companyName: 'DP Content',
    status: 'Análise',
    type: 'Fornecedor de Conteúdo',
    isOpen: false,
  },
  {
    id: '6',
    name: 'Juliana Santos',
    email: 'juliana@kroton.com.br',
    cnpj:'000.000.000/0001-00',
    companyName: 'SOMOS Educação',
    status: 'Aprovado',
    type: 'Instituição de Ensino',
    isOpen: false,
  },
  {
    id: '7',
    name: 'Juliana Santos',
    email: 'juliana@kroton.com.br',
    cnpj:'000.000.000/0001-00',
    companyName: 'Ânima Educação',
    status: 'Análise',
    type: 'Instituição de Ensino',
    isOpen: false,
  },
];
app.post('/service/:usertype/providers', (request, response) => {

    setTimeout(() => {
      return response.status(200).json({
        statusCode: 200,
        result: {
          providers
        },
        errorMessage: [],
      })
    }, 1000)
})

app.post('/service/:usertype/providers/find', (request, response) => {
  const { provider: { search } } = request.body
  let res = [...providers]
  if (search.orderByName == 'ASC') {
    
    res = res.sort((a,b) => {
      return (a.companyName > b.companyName) ? 1 : ((b.companyName > a.companyName) ? -1 : 0);
    })
  }else if(search.status != undefined){
    const status = {
      analise: "Análise",
      reprovado: "Reprovado",
      aprovado: "Aprovado"
    }

    res = res.filter(item => item.status == status[search.status])
  }else if(search.type){
    const subtype = [
      {
        id: 'institution',
        label: 'Profissional Liberal',
      },
      {
        id: 'supplier',
        label: 'Instituição de Ensino',
      },
      {
        id: 'liberal',
        label: 'Fornecedor de Conteúdo',
      },
    ]

    res = res.filter(item => item.type == subtype.find(sub => sub.id == search.type).label)
  }
  
  setTimeout(() => {
    return response.status(200).json({
      statusCode: 200,
      result: {
        providers: res
      },
      errorMessage: [],
    })
  }, 1000)
})

app.post('/service/provider/users', (request, response) => {
  setTimeout(() => {
    return response.status(200).json({
      statusCode: 200,
      result: {
        users: []
      },
      errorMessage: [],
    })
  }, 1000)
})
app.listen(process.env.PORT || 5000, () => {
  console.log("Its running on port 5000")
})