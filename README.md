# hackvtivoverflow
http://codered.ayusudi.com.s3-website-ap-southeast-1.amazonaws.com

# LIST ROUTES
## User
| HTTP  | Routes             | Headers | Body                             | Description                   |
| --    | ---------          | ----    | -------                          | -----                         |
| POST  | /users/            | none    | name, email, password, watchTag  | Create user                   |
| POST  | /users/login       | none    | email, password                  | Login user                    |
| PATCH | /users/tag         | token   | watchTag                         | Update watchTag               |
| GET   | /users/            | token   |                                  | Get user information          |

## Question
| HTTP   | Routes                 | Headers | Body                             | Description                   | 
| ---    | ---------              | ----    | -------                          | -----                         |
| POST   | /questions/            | token   | title, description, tags         | Create question               |
| GET    | /questions/            | none    |                                  | Get all question              |
| GET    | /questions/:id         | none    |                                  | Get one Question              |
| GET    | /questions/owned       | token   |                                  | Get owned question            |
| GET    | /questions/tag/:tag    | none    |                                  | Get questions by tag          |
| PATCH  | /questions/up/:id      | token   |                                  | Like a question               |
| PATCH  | /questions/down/:id    | token   |                                  | Dislike a question            |
| PUT    | /questions/:id         | token   | title, description, tags         | Update question               |
| DELETE | /questions/:id         | token   |                                  | Delete question               |

## Answer
| HTTP   | Routes                 | Headers | Body                             | Description                   | 
| ---    | ---------              | ----    | -------                          | -----                         |
| POST   | /answer/:id            | token   | answer                           | Create answer                 |
| GET    | /answer/:id            | none    |                                  | Get one answer                |
| PATCH  | /answer/up/:id         | token   |                                  | Like answer                   |
| PATCH  | /answer/down/:id       | token   |                                  | Disike answer                 |
| PATCH  | /answer/:id            | token   | answer                           | Update answer                 |
 
## Tag
| HTTP   | Routes                 | Headers | Body                             | Description                   | 
| ---    | ---------              | ----    | -------                          | -----                         |
| GET    | /tags/                 | none    |                                  | Get all tags                  |
| GET    | /tags/:tag             | none    |                                  | Get question by tag           |

---

# DETAIL

# User

## Register
- HTTP: post
- Url: '/users/'
- Status: **201**
```
Data : 
{
    "name": "admin1",
    "email": "admin1@mail.com",
    "password": "12345678",
    "watchTag": [
        "Java",
        "Javascript"
    ]
}
```
```
Response :
{
    "message": "Welcome new user!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFmYTVmMjk5Y2FjNmY5MDZjMWFjMzYiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTcxNzkyMzcwfQ.q0T29LAUxayjqx0Z_C7QFkcH1b-23ECt3sIEaISS_jM",
    "_id": "5dafa5f299cac6f906c1ac36",
    "email": "admin@mail.com",
    "name": "admin",
    "password": "$2a$10$KpiPudbj/k3vE2wDqpdNjeDxBiOP0da.dmDXAqbJX638WTaVAX39a",
    "watchTag": [
        "Java",
        "Javascript"
    ]
}
```
- Status: **400**
- Description : Error validation user model
```
Validation : 
    [
        "Name is required",
        "Email is required",
        "Email already exist"
        "Password is required",
    ]
```

## Login
- HTTP: post
- Url: '/users/login'
- Status: **200**
```
Data : 
{
    "name": "admin1",
    "email": "admin1@mail.com",
    "password": "12345678",
    "watchTag": [
        "Java",
        "Javascript"
    ]
}
```
```
Response :
{
    "message": "Welcome new user!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFmODU1ZDllYjlhMmYyZWZhYTdiMTYiLCJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbjFAbWFpbC5jb20iLCJpYXQiOjE1NzE3ODQwMzB9.FBsCOVk_hi8SjQ8sxRzprMve5bzZv-lWHhd8q-J7xv4",
    "_id": "5daf855d9eb9a2f2efaa7b16",
    "email": "admin1@mail.com",
    "name": "admin1",
    "password": "$2a$10$0IEDFJAT3HemQb6Z18NXd.73TuEhvDztEryD90mZuQVX8Cm9ZzHLa"
}
```
- Status: **400**
```
 Description : 
 1. "Email/Password is invalid"
 2. "Email/Pasword required"
```

## Edit Watch Tag
- HTTP: patch
- Url: '/users/tag'
- Status: **200**
```
Headers : 
{
    token: **token**
}
```
```
Data : 
{
    "watchTag": [
        "CSS",
        "HTML",
        "Javascript"
    ]
}
```
```
Response : 
{
    "watchTag": [
        "HTML",
        "Javascript",
        "CSS"
    ],
    "_id": "5dafa5f299cac6f906c1ac36",
    "name": "admin",
    "email": "admin@mail.com"
}
```
---

# Question
## Create Question
- HTTP: post
- url: '/questions/'
- Authentication required
- Status: **201**
```
Headers : 
{
    token: **token**
}
```
```
Data : 
{
    "title": "How to make h1 center?",
    "description": "should i use <center> or else..",
    "tags": [
    "css",
    "html"
    ]
}
```
```
Response : 
{
    "title": "How to make h1 center?",
    "description": "should i use <center> or else..",
    "tags": [
        "css",
        "html"
    ]
}
```

## Read One
- HTTP: get
- Url: '/questions/:id'
- Status: **200**
```
Response :
{
    "message": "Successfully get a question with id 5dafa91ab40d57f960aa22c9",
    "question": {
        "likes": [],
        "dislikes": [],
        "tags": [
            "css",
            "html"
        ],
        "_id": "5dafa91ab40d57f960aa22c9",
        "title": "How to make h1 center?",
        "description": "should i use <center> or else..",
        "user": {
            "_id": "5dafa5f299cac6f906c1ac36",
            "name": "admin",
            "email": "admin@mail.com"
        },
        "createdAt": "2019-10-23T01:12:58.594Z",
        "updatedAt": "2019-10-23T01:12:58.594Z"
    },
    "answer": []
}
```

## Get My Questions
- HTTP: get
- Url: '/questions/owned'
- Authentication required
- Status: **200**
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    "message": "List of my questions",
    "questions": [
        {
            "likes": [],
            "dislikes": [],
            "tags": [
                "css",
                "html"
            ],
            "_id": "5dafa91ab40d57f960aa22c9",
            "title": "How to make h1 center?",
            "description": "should i use <center> or else..",
            "user": "5dafa5f299cac6f906c1ac36",
            "createdAt": "2019-10-23T01:12:58.594Z",
            "updatedAt": "2019-10-23T01:12:58.594Z"
        }, ...
    ]
}
```

## Get All Questions
- HTTP: get
- Url: '/questions/'
- Status: **200**
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    "message": "Success get all questions list",
    "questions": [
        {
            "likes": [],
            "dislikes": [],
            "tags": [
                "css",
                "html"
            ],
            "_id": "5dafa91ab40d57f960aa22c9",
            "title": "How to make h1 center?",
            "description": "should i use <center> or else..",
            "user": {
                "_id": "5dafa5f299cac6f906c1ac36",
                "name": "admin",
                "email": "admin@mail.com"
            },
            "createdAt": "2019-10-23T01:12:58.594Z",
            "updatedAt": "2019-10-23T01:12:58.594Z"
        }
    ]
}
```

## Get Question By Tag
- HTTP : get
- Url : /articles/tag/:tag
- status: **200**
```
Response :
{
    "questions": [
        {
            "likes": [],
            "dislikes": [],
            "tags": [
                "css",
                "html"
            ],
            "_id": "5dafb960d95924fa8f6c449a",
            "title": "How to make h1 center?",
            "description": "should i use <center> or else..",
            "user": "5dafa5f299cac6f906c1ac36",
            "createdAt": "2019-10-23T02:22:24.512Z",
            "updatedAt": "2019-10-23T02:22:24.512Z"
        }
    ]
}
```

## Like Question
- HTTP: patch
- Url: '/questions/up/:id'
- Status: **200**
- Authentication Required
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    message: 'Likes++'
}
```
- Status: **404**
```
Response :
{
    message: "Data not found"
}
```
- Status: **400**
```
Response :
{
    message: "You can't like your own question"
}
```

## Dislike Question
- HTTP: patch
- Url: '/questions/down/:id'
- Status: **200**
- Authentication Required
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    message: 'Disikes++'
}
```
- Status: **404**
```
Response :
{
    message: "Data nopt found"
}
```
- Status: **400**
```
Response :
{
    message: "You can't dislike your own question"
}
```
## Netralize Question
- it can use after you like or dislike question  
to netralize you need to patch again the field, up for like **or** down for dislike  
example (you already dislike so.. patch down )  

- HTTP: patch
- Url: '/questions/down/:id'
- Status: **200**
- Authentication Required
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    "message": "You already like this question, now it's update too netralize.."
}
```

## Update Your Question
- HTTP: put
- Url: '/questions/:id'
- Status: **200**
- Authorize Question
```
Headers : 
{
    token: **token**
}
```
```
Data : 
{
    "title": "How to make h1 center?",
    "description": "should i use <center> or else..",
    "tags": [
      "css"
    ]
}
```
```
Response :
{
    "message": "Success update your question"
}
```
- Status: **404**
- Description: 'Question with your request id is not found'
```
Response : 
{
    "message": "Not Found"
}
```

- Status: **401**
- Description: 'Your not authorize for this question'
```
Response : 
{
    "message" : "Unauthorize"
}
```

## Delete Your Question
- HTTP: delete
- Url: '/questions/:id'
- Status: **200**
- Authorize Question
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    "message": "Success delete question"
}
```
- Status: **404**
- Description: 'Question with your request id is not found'
```
Response : 
{
    "message": "Not Found"
}
```

- Status: **401**
- Description: 'Your not authorize for this question'
```
Response : 
{
    "message" : "Unauthorize"
}
```
---

# Answer
## Create Answer
- HTTP: post
- Url: '/answers/:id'
- Authentication required
- Status: **200**
```
Data :
{
    "answer" : "try magin 0 auto"
}
```
```
Response : 
{
    "message": "Answer Succesfully Created!",
    "data": {
        "likes": [],
        "dislikes": [],
        "_id": "5dafb9d8d95924fa8f6c449b",
        "answer": "try magin 0 auto",
        "questionId": "5dafb960d95924fa8f6c449a",
        "user": "5dafa5f299cac6f906c1ac36",
        "createdAt": "2019-10-23T02:24:24.868Z",
        "updatedAt": "2019-10-23T02:24:24.868Z"
    }
}
```
Status : **400**
Description : 'Due to validation not aceepty emopty value'
```
Response :
{
    "errMsg": [
        "answer is required"
    ]
}
```
## Get One Answer
- HTTP: patch
- Url: '/answers/:id'
- Status: **200**
```
Response :
{
    "message": "Success get answer with id 5dafb9d8d95924fa8f6c449b",
    "data": {
        "likes": [
            "5dafb3fe87ffb8f9f0fe791a"
        ],
        "dislikes": [],
        "_id": "5dafb9d8d95924fa8f6c449b",
        "answer": "try magin 0 auto",
        "questionId": {
            "likes": [],
            "dislikes": [],
            "tags": [
                "css",
                "html"
            ],
            "_id": "5dafb960d95924fa8f6c449a",
            "title": "How to make h1 center?",
            "description": "should i use <center> or else..",
            "user": "5dafa5f299cac6f906c1ac36",
            "createdAt": "2019-10-23T02:22:24.512Z",
            "updatedAt": "2019-10-23T02:22:24.512Z"
        },
        "user": {
            "_id": "5dafa5f299cac6f906c1ac36",
            "name": "admin",
            "email": "admin@mail.com"
        },
        "createdAt": "2019-10-23T02:24:24.868Z",
        "updatedAt": "2019-10-23T02:34:04.770Z"
    }
}
```
## Like Answer
- HTTP: patch
- Url: '/answer/up/:id'
- Status: **200**
- Authentication Required
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    message: 'Likes++'
}
```
- Status: **404**
```
Response :
{
    message: "Data not found"
}
```
- Status: **400**
```
Response :
{
    message: "You can't like your own answer"
}
```
## Dislike Answer
- HTTP: patch
- Url: '/answers/down/:id'
- Status: **200**
- Authentication Required
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    message: 'Disikes++'
}
```
- Status: **404**
```
Response :
{
    message: "Data not found"
}
```
- Status: **400**
```
Response :
{
    message: "You can't dislike your own answer"
}
```
## Netralize Answer
- it can use after you like or dislike answer
to netralize you need to patch again the field, up for like **or** down for dislike  
example (you already dislike so.. patch down )  

- HTTP: patch
- Url: '/answers/down/:id'
- Status: **200**
- Authentication Required
```
Headers : 
{
    token: **token**
}
```
```
Response :
{
    "message": "You already like this answer, now it's update too netralize.."
}
```

## Update Answer 
- HTTP: patch
- Url: '/answers/:id'
- Status: **200**
- Authorize Answer
```
Headers : 
{
    token: **token**
}
```
```
Data :
{
    answer: "Try text-align: center"
}
```
```
Response :
{
    "message": "answer successfully updated"
}
```
---

# Tag

## Get All Tag
- HTTP: patch
- Url: '/tags/'
- Status: **200**
```
Response : 
{
    "tags": [
        {
            "users": [
                "5db007dce7b42c1f608a19ca"
            ],
            "questions": [
                "5db01062db8de228e0351da1"
            ],
            "_id": "5db002d4c3578c16d216bae1",
            "display": "Javascript",
            "name": "javascript",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
            "createdAt": "2019-10-23T07:35:48.209Z",
            "updatedAt": "2019-10-23T08:41:35.609Z"
        },
        {
            "users": [],
            "questions": [
                "5db0176990e7d52b362c9c63"
            ],
            "_id": "5db002d4c3578c16d216bae2",
            "display": "HTML",
            "name": "HTML",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
            "createdAt": "2019-10-23T07:35:48.210Z",
            "updatedAt": "2019-10-23T09:03:37.906Z"
        }, ...
    ]
}
```

## Get All Question By Tag
- HTTP: patch
- Url: '/tags/:tag'
- Status: **200**
```
Response :
{
    "users": [],
    "questions": [
        {
            "likes": [],
            "dislikes": [],
            "tags": [
                "CSS",
                "HTML"
            ],
            "_id": "5db0176990e7d52b362c9c63",
            "title": "apa bedanya background aja sama background-color",
            "description": "sama-sama bisa buat background color....",
            "user": "5db007dce7b42c1f608a19ca"
        }
    ],
    "_id": "5db002d4c3578c16d216bae2",
    "display": "HTML",
    "name": "HTML",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
    "createdAt": "2019-10-23T07:35:48.210Z",
    "updatedAt": "2019-10-23T09:03:37.906Z"
}
```

---

# ERROR
## Error List 
| Status  | Message               | Description                      |
| ---     | -----                 | ---                              |
| 400     | Bad Request           | Input invalid (**Validation**)   |
| 401     | Unauthorize           | Token invalid                    |
| 404     | Data Not Found        | Question/Answer (Id not found)   |
| 500     | Error Internal Server |                                  |

## Error Status 400
### User Validation
1. Name is required
2. Email is required
3. Email invalid format
4. Email already exist
5. Password is required 

## Question Validation
1. Title is required 
2. Description is required
3. User is required

## Answer Validation
1. Answer is required
2. Question id is required
3. User is required
