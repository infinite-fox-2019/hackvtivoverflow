# Hacktivoverflow

**User API**

|      ROUTE      | HTTP | HEADERS |                             BODY                             | DESCRIPTION | ADDITIONAL INFO |
| :-------------: | :--: | :-----: | :----------------------------------------------------------: | :---------: | :-------------: |
| /users/register | POST |    -    | email:String(required)<br />username:String(required)<br />password:String(required) |  register   |        -        |

Response:
200

```
{
    "username": "iniusername",
    "email": "user@name.com"
}
```

400

```
{
    "message": "Password needs to be at least 5 characters"
}
```



|    ROUTE     | HTTP | HEADERS |                         BODY                          | DESCRIPTION | ADDITIONAL INFO |
| :----------: | :--: | :-----: | :---------------------------------------------------: | :---------: | :-------------: |
| /users/login | POST |    -    | email:String(required)<br />password:String(required) |    login    |        -        |

Response:
200

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVkOGM1YTgzNmE5MmJmM2Y0YTQ2NmRhMiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQiOjE1Njk0OTE5MDAsImV4cCI6MTU2OTQ5NTUwMH0.OwVcoQNxficWhXrdKi3hpYDaqMtNQyKO2kHc0gKCl7U",
    "username": "admin",
    "id": "5d8c5a836a92bf3f4a466da2"
}
```

400

```
{
    "message": "Invalid password"
}
```



### Question API

|     ROUTE      | HTTP | HEADERS | BODY |    DESCRIPTION     | ADDITIONAL INFO |
| :------------: | :--: | :-----: | :--: | :----------------: | :-------------: |
| /questions/all | GET  |    -    |  -   | Find All Questions |        -        |

Response:
200

```
[
    {
        "upvotes": [],
        "downvotes": [],
        "answers": [],
        "_id": "5d8c893dabba132be67d98cd",
        "title": "hadehhh",
        "description": "hadehh",
        "user": "5d8c8908abba132be67d98cb",
        "createdAt": "2019-09-26T09:47:41.386Z",
        "updatedAt": "2019-09-26T09:47:41.386Z",
        "__v": 0
    }
]
```

500

```

```



|        ROUTE        | HTTP  | HEADERS |                          BODY                           |   DESCRIPTION   | ADDITIONAL INFO |
| :-----------------: | :---: | :-----: | :-----------------------------------------------------: | :-------------: | :-------------: |
| /questions/edit/:id | PATCH |  token  | text:String(required)<br />description:String(required) | Edit a question |  Authenticated  |

Response:
201

```
{
    "message": "successfully updated"
}
```

401

```
{
    "message": "You need to login first"
}
```



|        ROUTE        | HTTP | HEADERS | BODY |  DESCRIPTION   | ADDITIONAL INFO |
| :-----------------: | :--: | :-----: | :--: | :------------: | :-------------: |
| /questions/find/:id | GET  |    -    |  -   | Get a question |        -        |

Response:
201

```
{
    "upvotes": 0,
    "downvotes": 0,
    "answers": [],
    "_id": "5d8ae0f16527df0918be7131",
    "title": "how to how",
    "description": "gini cara nya",
    "user": "5d8ae0086527df0918be7130",
    "__v": 0
}
```



```

```



|   ROUTE    | HTTP | HEADERS |                           BODY                           |     DESCRIPTION     | ADDITIONAL INFO |
| :--------: | :--: | :-----: | :------------------------------------------------------: | :-----------------: | :-------------: |
| /questions | POST |  token  | title:String(required)<br />description:String(required) | Register a question |  authenticated  |

Response:
201

```
{
    "upvotes": 0,
    "downvotes": 0,
    "answers": [],
    "_id": "5d8ae0f16527df0918be7131",
    "title": "how to how",
    "description": "gini cara nya",
    "user": "5d8ae0086527df0918be7130",
    "__v": 0
}
```

400

```
{
    "message": "Title must be filled"
}
```



|   ROUTE    | HTTP | HEADERS | BODY |     DESCRIPTION     | ADDITIONAL INFO |
| :--------: | :--: | :-----: | :--: | :-----------------: | :-------------: |
| /questions | GET  |  token  |  -   | Get user's question |  authenticated  |

Response:
200

```
[
    {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5d8ae0f16527df0918be7131",
        "title": "how to how",
        "description": "gini cara nya",
        "user": "5d8ae0086527df0918be7130",
        "__v": 0
    }
]
```

401

```
{
    "message": "You need to login first"
}
```



|         ROUTE         | HTTP  | HEADERS | BODY |    DESCRIPTION    | ADDITIONAL INFO |
| :-------------------: | :---: | :-----: | :--: | :---------------: | :-------------: |
| /questions/upvote/:id | PATCH |  token  |  -   | upvote a question |  authenticate   |

Response:
200

```

{
    "upvotes": [
        "5d8c5a836a92bf3f4a466da2"
    ],
    "downvotes": [],
    "answers": [],
    "_id": "5d8c893dabba132be67d98cd",
    "title": "baruuu",
    "description": "baruuu",
    "user": {
        "_id": "5d8c8908abba132be67d98cb",
        "username": "google",
        "email": "google@google.com",
        "password": "$2a$10$6bI0z5fVlpd66u.CW.S77.V9FKm5eLvpv7MObNWs4AUy1qL2Lj0na",
        "__v": 0
    },
    "createdAt": "2019-09-26T09:47:41.386Z",
    "updatedAt": "2019-09-26T10:14:54.635Z",
    "__v": 0
}
```

401

```
{
    "message": "You need to login first"
}
```



|          ROUTE          | HTTP  | HEADERS | BODY |     DESCRIPTION     | ADDITIONAL INFO |
| :---------------------: | :---: | :-----: | :--: | :-----------------: | :-------------: |
| /questions/downvote/:id | PATCH |  token  |  -   | downvote a question |  authenticate   |

Response:
200

```
{
    "upvotes": [],
    "downvotes": [
        "5d8c5a836a92bf3f4a466da2"
    ],
    "answers": [],
    "_id": "5d8c893dabba132be67d98cd",
    "title": "baruuu",
    "description": "baruuu",
    "user": {
        "_id": "5d8c8908abba132be67d98cb",
        "username": "google",
        "email": "google@google.com",
        "password": "$2a$10$6bI0z5fVlpd66u.CW.S77.V9FKm5eLvpv7MObNWs4AUy1qL2Lj0na",
        "__v": 0
    },
    "createdAt": "2019-09-26T09:47:41.386Z",
    "updatedAt": "2019-09-26T10:15:20.739Z",
    "__v": 0
}
```

401

```
{
    "message": "You need to login first"
}
```



|     ROUTE      |  HTTP  | HEADERS | BODY |    DESCRIPTION    | ADDITIONAL INFO |
| :------------: | :----: | :-----: | :--: | :---------------: | :-------------: |
| /questions/:id | DELETE |  token  |  -   | delete a question |  authenticate   |

Response:
200

```
{
    "message": "Deleted!"
}
```

401

```
{
    "message": "You need to login first"
}
```





**Answer API**



|        ROUTE        |  HTTP  | HEADERS | BODY |   DESCRIPTION    | ADDITIONAL INFO |
| :-----------------: | :----: | :-----: | :--: | :--------------: | :-------------: |
| /answers/delete/:id | DELETE |  token  |  -   | Delete an answer |  authenticated  |

Response:
201

```
{
    "message": "success"
}
```

401

```
{
    "message": "You need to login first"
}
```



|        ROUTE         | HTTP | HEADERS |             BODY             |    DESCRIPTION     | ADDITIONAL INFO |
| :------------------: | :--: | :-----: | :--------------------------: | :----------------: | :-------------: |
| /answers/:questionId | POST |  token  | description:String(required) | Register an answer |  authenticated  |

Response:
201

```
[
    {
        "upvotes": [
            "5d8c5b476a92bf3f4a466da4"
        ],
        "downvotes": [],
        "_id": "5d8c6841bccdf0241f894397",
        "description": "testtt",
        "user": "5d8c5a836a92bf3f4a466da2",
        "question": "5d8c682fbccdf0241f894396",
        "__v": 0
    }
 ]
```

400

```
{
    "message": "Description must be filled"
}
```



|        ROUTE        | HTTP  | HEADERS | BODY |   DESCRIPTION    | ADDITIONAL INFO |
| :-----------------: | :---: | :-----: | :--: | :--------------: | :-------------: |
| /answers/upvote/:id | PATCH |  token  |  -   | upvote an answer |  authenticate   |

Response:
200

```
{
    "upvotes": [
        "5d8c5a836a92bf3f4a466da2",
        "5d8c8720abba132be67d98ca"
    ],
    "downvotes": [],
    "answers": [
        {
            "upvotes": [
                "5d8c5b476a92bf3f4a466da4",
                "5d8c5a836a92bf3f4a466da2"
            ],
            "downvotes": [],
            "_id": "5d8c6841bccdf0241f894397",
            "description": "testtt",
            "user": "5d8c5a836a92bf3f4a466da2",
            "question": "5d8c682fbccdf0241f894396",
            "__v": 0
        }
    ],
    "_id": "5d8c682fbccdf0241f894396",
    "title": "minum",
    "description": "makan",
    "user": {
        "_id": "5d8c5a836a92bf3f4a466da2",
        "username": "admin",
        "email": "admin@admin.com",
        "password": "$2a$10$p.TAlcTsI4GSIwxx9YQYtO214OSbCXBwqV9m2vZrVkj/Tvb21Caum",
        "__v": 0
    },
    "createdAt": "2019-09-26T07:26:39.941Z",
    "updatedAt": "2019-09-26T10:09:38.490Z",
    "__v": 0
}
```

401

```
{
    "message": "You need to login first"
}
```





|         ROUTE         | HTTP  | HEADERS | BODY |    DESCRIPTION     | ADDITIONAL INFO |
| :-------------------: | :---: | :-----: | :--: | :----------------: | :-------------: |
| /answers/downvote/:id | PATCH |  token  |  -   | downvote an answer |  authenticate   |

Response:
200

```
{
    "upvotes": [
        "5d8c5a836a92bf3f4a466da2",
        "5d8c8720abba132be67d98ca"
    ],
    "downvotes": [],
    "answers": [
        {
            "upvotes": [
                "5d8c5b476a92bf3f4a466da4"
            ],
            "downvotes": [
                "5d8c5b476a92bf3f4a466da4",
                "5d8c5a836a92bf3f4a466da2"
            ],
            "_id": "5d8c6841bccdf0241f894397",
            "description": "testtt",
            "user": "5d8c5a836a92bf3f4a466da2",
            "question": "5d8c682fbccdf0241f894396",
            "__v": 0
        }
    ],
    "_id": "5d8c682fbccdf0241f894396",
    "title": "minum",
    "description": "makan",
    "user": {
        "_id": "5d8c5a836a92bf3f4a466da2",
        "username": "admin",
        "email": "admin@admin.com",
        "password": "$2a$10$p.TAlcTsI4GSIwxx9YQYtO214OSbCXBwqV9m2vZrVkj/Tvb21Caum",
        "__v": 0
    },
    "createdAt": "2019-09-26T07:26:39.941Z",
    "updatedAt": "2019-09-26T10:09:38.490Z",
    "__v": 0
}
```

401

```
{
    "message": "You need to login first"
}
```





|       ROUTE       | HTTP  | HEADERS |             BODY             |   DESCRIPTION    | ADDITIONAL INFO |
| :---------------: | :---: | :-----: | :--------------------------: | :--------------: | :-------------: |
| /answers/desc/:id | PATCH |  token  | description:String(required) | Update an answer |  authenticated  |

Response:
200

```
{
    "upvotes": [
        "5d8c5a836a92bf3f4a466da2",
        "5d8c8720abba132be67d98ca"
    ],
    "downvotes": [],
    "answers": [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5d8c751e8b09694272882e93",
            "description": "makan cabe",
            "user": "5d8c5a836a92bf3f4a466da2",
            "question": "5d8c682fbccdf0241f894396",
            "__v": 0
        }
    ],
    "_id": "5d8c682fbccdf0241f894396",
    "title": "minum",
    "description": "makan",
    "user": {
        "_id": "5d8c5a836a92bf3f4a466da2",
        "username": "admin",
        "email": "admin@admin.com",
        "password": "$2a$10$p.TAlcTsI4GSIwxx9YQYtO214OSbCXBwqV9m2vZrVkj/Tvb21Caum",
        "__v": 0
    },
    "createdAt": "2019-09-26T07:26:39.941Z",
    "updatedAt": "2019-09-26T10:24:11.912Z",
    "__v": 0
}
```

401

```
{
    "message": "You need to login first"
}
```





|        ROUTE         | HTTP | HEADERS | BODY |      DESCRIPTION      | ADDITIONAL INFO |
| :------------------: | :--: | :-----: | :--: | :-------------------: | :-------------: |
| /answers/:questionId | GET  |    -    |  -   | Get an Quest's answer |                 |

Response:
200

```
[
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5d8c751e8b09694272882e93",
        "description": "makan cabe",
        "user": "5d8c5a836a92bf3f4a466da2",
        "question": "5d8c682fbccdf0241f894396",
        "__v": 0
    },
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5d8c7547f7bef543f8ef70f8",
        "description": "ancurr",
        "user": "5d8c5a836a92bf3f4a466da2",
        "question": "5d8c682fbccdf0241f894396",
        "__v": 0
    }
]
```

401

```
{
    "message": "You need to login first"
}
```

