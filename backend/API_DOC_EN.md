[< RETURN](../README.md)

FORMAT: 1A

# SEMANA OMNISTACK 11

API was created fot RocketSeat`s OmniStack 11 program, with some personal improviments. 

HOST: localhost:3000

::: note
#### <i class="fa fa-info"></i> Info

For better visualization follow steps below:

- Install the following VSCode extensions:

    - API Blueprint Language

    - API Blueprint Viewer

- Save a copy of this file with the '.apib'extension. 
- Follow the Viewer API`s visualization tutorial
- Have fun
:::




# Group Session

## LOGIN [/session/login]

### LOGIN [POST]
Endpoint responsable for ONGs login
+ Request (application/json)

    + Attributes
    
        + email:teste@teste.com(string,required) - ONG`s Email
        + password:12345678(string,required) - ONG`s password
        
+ Response 200

### LOGOUT [DELETE]
Endpoint responsable for Logout
+ Response 204
+ Response 400 (application/json)

        {
            "error" : "Not Logged."
        }


# Group ONGS

## ONGS [/ongs]

### GET [GET]
Endpoint that gets all registered ONGs
::: note
#### <i class="fa fa-info"></i> Info
Authentication not required.
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

### CREATE [POST]
Endpoint for registration of a new ONG on database.
::: note
#### <i class="fa fa-info"></i> Info
Authentication not required.
:::
+ Request (application/json)

    + Attributes
    
        + name:teste@teste.com(string,required) - ONG`s name
        + password:12345678(string,required) - ONG`s password
        + email:teste@teste.com(string,required) - ONG`s Email
        + whatsapp:12345678(number,required) - ONG`s Whatsapp
        + city:Serrinha(string,required) - ONG`s city
        + uf:BA(string,required) - ONG`s state

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
           "error" : "Ong or email already registered!" 
        }

### REMOVE [DELETE]
Endpoint that removes an ONG from database
::: warning
#### <i class="fa fa-warning"></i> Important
Authentication is required, only the ONG can remove itself.
:::

+ Response 204
+ Response 401 (application/json)

        { 
            "error" : "Login to remove account!" 
        }

# Group CASES

## CASES [/casos]

### GET [GET]
Endpoint that gets all cases (incidents).
::: note
#### <i class="fa fa-info"></i> Info
Authentication not required.
:::
+ Response 200 (application/json)

    + Headers

            X-Total-Count: "Cases Count"

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

### CREATE [POST]
Endpoint for creation of a new case (incident).
::: warning
#### <i class="fa fa-warning"></i> Important
Authentication is required, cases (incidentes) are linked to ONGs.
:::
+ Request (application/json)

    + Attributes
    
        + title:Titulo 1(string,required) - Case title
        + description:Caso muito importante!(string,required) - Case description
        + value:15.0(number,required) - Case Value
        


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
            "error" : "Login to create a case!" 
        }

## SPECIFIC CASE [/casos/{id}]
   
+ Parameters

    + id:1 (string,required) - Case`s Id

### REMOVE [DELETE]
Endpoint that removes a case.
::: warning
#### <i class="fa fa-warning"></i> Important
Authentication is required, only the ONG that created the case can remove it.
:::

+ Response 204

+ Response 401 (application/json)

        { 
            "error" : 'Unauthorized Operation!'
        }

        

# Group ONG PROFILE

## ONG PROFILE [/profile]

### GET CASES [GET]
Endpoint that gets all ONG`s related cases.
::: warning
#### <i class="fa fa-warning"></i> Important
Authentication is required, to be able to get only the loged ONG`s related case.
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
            "error" : 'Authenticate to get related Cases!'
        }