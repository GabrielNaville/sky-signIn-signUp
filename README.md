# sky-signIn-signUp
This repository aims to build a signIn and signUp API, with token authentication and insertion into a non-relational bank

Rota para se registrar: localhost:3000/auth/register
  json esperado: {
    "name": "Gabriel Naville",
    "email" : "gabriel@naville.com",
    "password": "q1w2e3",
    "phone": {
      "number": "958998570",
      "ddd": "11"
    }
}

Rota para autenticar (login) : localhost:3000/auth/authenticate
  json esperado: {
    "email" : "gabriel@naville.com",
    "password": "q1w2e3"
}	

Rota para retornar o usuario com base no token: localhost:3000/projects
