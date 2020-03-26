[< VOLTAR](../README.md)

FORMAT: 1A

# SEMANA OMNISTACK 11

API Criada para a Semana OmniStack 11 da RocketSeat, com alguns aprimoramentos pessoais.


HOST: localhost:3000

::: note
#### <i class="fa fa-info"></i> Info
Para melhor visualização siga os passos abaixo:

- Instaler as extensões do VSCode

    - API Blueprint Language

    - API Blueprint Viewer

- Salve uma cópia deste arquivo com a extensão '.apib' 
- Siga o Tutórial de visualização da API Viewer
- Divirta-se
:::




# Group Session

## LOGAR [/session/login]

### LOGAR [POST]
Endpoint responsável pelo loguin das ONGs
+ Request (application/json)

    + Attributes
    
        + email:teste@teste.com(string,required) - Email da ONG
        + password:12345678(string,required) - Senha da ONG
        
+ Response 200


### LOGOUT [DELETE]
Endpoint para logout
+ Response 204
+ Response 400 (application/json)

        {
            "error" : "Não está logado."
        }


# Group ONGS

## ONGS [/ongs]

### BUSCAR [GET]
Endpoint para busca de todas as ONGs cadastradas
::: note
#### <i class="fa fa-info"></i> Info
Não é preciso autenticação.
:::
+ Response 200 (application/json)

        [
            {
                "id": "b5aeffe4",
                "name": "AFIS",
                "email": "teste@teste.com",
                "whatsapp": "12345678",
                "city": "Serrinha",
                "uf": "BA"
            },
            ...
        ]

### CRIAR [POST]
Endpoint para cadastro de uma nova ONG.
::: note
#### <i class="fa fa-info"></i> Info
Não é preciso autenticação.
:::
+ Request (application/json)

    + Attributes
    
        + name:teste@teste.com(string,required) - Nome da ONG
        + password:12345678(string,required) - Senha da ONG
        + email:teste@teste.com(string,required) - Email da ONG
        + whatsapp:12345678(number,required) - Whatsapp da ONG
        + city:Serrinha(string,required) - Cidade da ONG
        + uf:BA(string,required) - Estado da ONG

+ Response 204
+ Response 400 (application/json)

        {
            "errors": [
                {
                    "value": "12345678a",
                    "msg": "Invalid value",
                    "param": "whatsapp",
                    "location": "body"
                },
                ...
            ]
        }
        
+ Response 401 (application/json)

        {
           "error" : "Ong ou email já cadastrado!" 
        }

### DELETAR [DELETE]
Endpoint para remoção de uma ONG
::: warning
#### <i class="fa fa-warning"></i> Importante
É necessário estar logado, pois apenas a própria ONG pode se remover.
:::

+ Response 204
+ Response 401 (application/json)

        { 
            "error" : "Faça Login para excluir a conta!" 
        }

# Group CASOS

## CASOS [/casos]

### BUSCAR [GET]
Endpoint para busca de todos os casos.
::: note
#### <i class="fa fa-info"></i> Info
Não é preciso autenticação.
:::
+ Response 200 (application/json)

    + Headers

            X-Total-Count: "Numero de Casos"

    + body

            [
                {
                    "id": 1,
                    "title": "Caso1",
                    "description": "TESTE1",
                    "value": 15.25,
                    "ong_id": "b5aeffe4",
                    "name": "AFIS",
                    "email": "teste@teste.com",
                    "whatsapp": "12345678",
                    "city": "Serrinha",
                    "uf": "BA"
                },
                ...
            ]

### CRIAR [POST]
Endpoint para cadastro de um novo caso
::: warning
#### <i class="fa fa-warning"></i> Importante
É necessário estar logado, pois caso são ligados a ONGs.
:::
+ Request (application/json)

    + Attributes
    
        + title:Titulo 1(string,required) - Título do caso
        + description:Caso muito importante!(string,required) - Descrição do caso
        + value:15.0(number,required) - Valor do caso
        


+ Response 204
+ Response 400 (application/json)

        {
            "errors": [
                {
                    "value": -15.0,
                    "msg": "Invalid value",
                    "param": "value",
                    "location": "body"
                },
                ...
            ]
        }
+ Response 401 (application/json)

        { 
            "error" : "Faça Login para Criar um caso!" 
        }

## caso específico [/casos/{id}]
   
+ Parameters

    + id:1 (string,required) - Id do caso

### DELETAR [DELETE]
Endpoint para remoção de um caso.
::: warning
#### <i class="fa fa-warning"></i> Importante
É necessário estar logado, pois apenas a ONG que cadastrou o caso pode removê-lo
:::
+ Response 204

+ Response 401 (application/json)

        { 
            "error" : 'Operação não Autorizada!'
        }

        

# Group ONG PROFILE

## ONG PROFILE [/profile]

### BUSCAR CASOS [GET]
Endpoint para busca de casos da ONG.
::: warning
#### <i class="fa fa-warning"></i> Importante
É necessário estar logado, para poder buscar todos os casos ligados a ONG.
:::
+ Response 200 (application/json)

        [
            {
                "id": 1,
                "title": "Caso1",
                "description": "TESTE1",
                "value": 15.25,
                "ong_id": "b5aeffe4",
                "name": "AFIS",
                "email": "teste@teste.com",
                "whatsapp": "12345678",
                "city": "Serrinha",
                "uf": "BA"
            },
            ...
        ]

+ Response 401 (application/json)

        { 
            "error" : 'Logue para buscas casos específicos da ONG!'
        }