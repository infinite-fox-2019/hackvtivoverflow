# Hacktiv Overflow

#website http://noverflow.uzai.site/

## database schema

- User

  ```
  email: string
  password: string
  ```

- Question

  ```
  user: UserId,
  title: string,
  description: string,
  upvotes: [UserId],
  downvotes: [UserId],
  tags: [String]
  ```

- Answer

  ```
  user: UserId,
  questionId: QuestionId,
  title: string,
  description: string,
  upvotes: [UserId],
  downvotes: [UserId], 
  ```



## Users

- ### Register

  Method : `POST`
  Endpoint: `/users/register`

  ### *Request* :

  - body:

    ```
    {
        email: String (required, unique),
        password: String (required)
    }
    ```

  ### *Response* :

  - 201 (Created)

    ```
    {
        token: "{your token}",
    }
    ```

  - 400 (Bad Request)

    ```
    {
        errors: [
            "Name field is required", 
            "Email field is required", 
            "Password field is required",
            "Email has already used by another user"
        ]
    }
    ```

- ### Login

  Method : `POST`
  Endpoint : `/users/login`

  ### *Request* :

  - Body :

    ```
    {
        email: String (required),
        password: String (required)
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    {
        token: "{your token}",
    }
    ```

- 400 (Bad Request)

  ```
    {
        errors: [
            "Incorrect email or password"
        ]
    }
  ```



## Question

- ### Create

  Method : `POST`
  Endpoint: `/questions`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  - body:

    ```
    {
        title: String (required),
        description: String (required),
        tags: [String]
    }
    ```

  ### *Response* :

  - 201 (Created)

    ```
    {
        "upvotes": [],
        "downvotes": [],
        "tags": [],
        "_id": "5db13979186be54cdb3f15d1",
        "title": "QUESTION 10",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima enim pariatur incidunt perspiciatis! Deserunt atque eveniet placeat ut nostrum provident. Ducimus ex itaque quas rem fuga vero? Quas assumenda nobis voluptate quae eaque, dolor illum ea mollitia laborum esse non tenetur voluptatum placeat incidunt doloremque cumque. Eligendi, incidunt tenetur.",
        "userId": "5daf170b1b0f3d26da50e007",
        "createdAt": "2019-10-24T05:41:13.944Z",
        "updatedAt": "2019-10-24T05:41:13.944Z",
        "__v": 0
    }
    ```

  - 400 (Bad Request)

    ```
    {
        errors: [
            "Title field is required", 
            "Description field is required"
        ]
    }
    ```

- ### Read

  Method : `GET`
  Endpoint: `/questions`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    [
        {
            "upvotes": [],
            "downvotes": [],
            "tags": [
                "satu",
                "dua",
                "tiga",
                "empat",
                "lima"
            ],
            "_id": "5db0b3332aa4b46f7e7bcc07",
            "title": "bikin lagi",
            "description": "<p>asdfklasdfk asffsda</p>",
            "userId": {
                "_id": "5daf170b1b0f3d26da50e007",
                "email": "satu@satu.com"
            },
            "createdAt": "2019-10-23T20:08:19.639Z",
            "updatedAt": "2019-10-23T20:08:19.639Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "tags": [],
            "_id": "5dafeed4f297fa3bddccca8e",
            "title": "QUESTION 10",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima enim pariatur incidunt perspiciatis! Deserunt atque eveniet placeat ut nostrum provident. Ducimus ex itaque quas rem fuga vero? Quas assumenda nobis voluptate quae eaque, dolor illum ea mollitia laborum esse non tenetur voluptatum placeat incidunt doloremque cumque. Eligendi, incidunt tenetur.",
            "userId": {
                "_id": "5daf170b1b0f3d26da50e007",
                "email": "satu@satu.com"
            },
            "createdAt": "2019-10-23T06:10:28.662Z",
            "updatedAt": "2019-10-23T06:10:28.662Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "tags": [],
            "_id": "5dafeed1f297fa3bddccca8d",
            "title": "QUESTION 9",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima enim pariatur incidunt perspiciatis! Deserunt atque eveniet placeat ut nostrum provident. Ducimus ex itaque quas rem fuga vero? Quas assumenda nobis voluptate quae eaque, dolor illum ea mollitia laborum esse non tenetur voluptatum placeat incidunt doloremque cumque. Eligendi, incidunt tenetur.",
            "userId": {
                "_id": "5daf170b1b0f3d26da50e007",
                "email": "satu@satu.com"
            },
            "createdAt": "2019-10-23T06:10:25.700Z",
            "updatedAt": "2019-10-23T06:10:25.700Z",
            "__v": 0
        }
    ]
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

  

  - ### Find Question By User Id

  Method : `GET`
  Endpoint: `/questions/user`

  ### *Request* :

  - query

    ```
    {
    	keyword: "{your search term}"
    }
    ```

    

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    [
        {
            "upvotes": [],
            "downvotes": [],
            "tags": [
                "satu",
                "dua",
                "tiga",
                "empat",
                "lima"
            ],
            "_id": "5db0b3332aa4b46f7e7bcc07",
            "title": "bikin lagi",
            "description": "<p>asdfklasdfk asffsda</p>",
            "userId": {
                "_id": "5daf170b1b0f3d26da50e007",
                "email": "satu@satu.com"
            },
            "createdAt": "2019-10-23T20:08:19.639Z",
            "updatedAt": "2019-10-23T20:08:19.639Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "tags": [],
            "_id": "5dafeed4f297fa3bddccca8e",
            "title": "QUESTION 10",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima enim pariatur incidunt perspiciatis! Deserunt atque eveniet placeat ut nostrum provident. Ducimus ex itaque quas rem fuga vero? Quas assumenda nobis voluptate quae eaque, dolor illum ea mollitia laborum esse non tenetur voluptatum placeat incidunt doloremque cumque. Eligendi, incidunt tenetur.",
            "userId": {
                "_id": "5daf170b1b0f3d26da50e007",
                "email": "satu@satu.com"
            },
            "createdAt": "2019-10-23T06:10:28.662Z",
            "updatedAt": "2019-10-23T06:10:28.662Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "tags": [],
            "_id": "5dafeed1f297fa3bddccca8d",
            "title": "QUESTION 9",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima enim pariatur incidunt perspiciatis! Deserunt atque eveniet placeat ut nostrum provident. Ducimus ex itaque quas rem fuga vero? Quas assumenda nobis voluptate quae eaque, dolor illum ea mollitia laborum esse non tenetur voluptatum placeat incidunt doloremque cumque. Eligendi, incidunt tenetur.",
            "userId": {
                "_id": "5daf170b1b0f3d26da50e007",
                "email": "satu@satu.com"
            },
            "createdAt": "2019-10-23T06:10:25.700Z",
            "updatedAt": "2019-10-23T06:10:25.700Z",
            "__v": 0
        }
    ]
    
    ```



- ### Show One Question

Method : `GET`
Endpoint: `/questions/:id`

### *Request* :

- params

  ```
  {
  	id: String
  }
  ```

  

- header

  ```
  {
      token: "{your token}"
  }
  ```

### *Response* :

- 200 (OK)

  ```
      {
          "upvotes": [],
          "downvotes": [],
          "tags": [
              "satu",
              "dua",
              "tiga",
              "empat",
              "lima"
          ],
          "_id": "5db0b3332aa4b46f7e7bcc07",
          "title": "bikin lagi",
          "description": "<p>asdfklasdfk asffsda</p>",
          "userId": {
              "_id": "5daf170b1b0f3d26da50e007",
              "email": "satu@satu.com"
          },
          "createdAt": "2019-10-23T20:08:19.639Z",
          "updatedAt": "2019-10-23T20:08:19.639Z",
          "__v": 0
      }
  ```

- 401 (Not authorized)

  ```
  {
      errors: [
          "You haven't authorize with this question"
      ]
  }
  ```

  - 403 (Forbidden)

  ```
  {
      errors: [
          "You must login first!"
      ]
  }
  ```

  

- ### Update

  Method : `PUT`
  Endpoint: `/questions/:id`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  - body:

    ```
    {
        title: String (required),
        description: String (required),
        tags: [String]
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    {
        "upvotes": [],
        "downvotes": [],
        "tags": [],
        "_id": "5db13979186be54cdb3f15d1",
        "title": "QUESTION 10",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima enim pariatur incidunt perspiciatis! Deserunt atque eveniet placeat ut nostrum provident. Ducimus ex itaque quas rem fuga vero? Quas assumenda nobis voluptate quae eaque, dolor illum ea mollitia laborum esse non tenetur voluptatum placeat incidunt doloremque cumque. Eligendi, incidunt tenetur.",
        "userId": "5daf170b1b0f3d26da50e007",
        "createdAt": "2019-10-24T05:41:13.944Z",
        "updatedAt": "2019-10-24T05:41:13.944Z",
        "__v": 0
    }
    ```

  - 401 (Not authorized)

    ```
    {
        errors: [
            "You haven't authorize with this question"
        ]
    }
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Delete

  Method : `DELETE`
  Endpoint: `/questions/:id`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    {
        message: 'Success Delete'
    }
    ```

  - 401 (Not Authorize)

    ```
    {
        errors: [
            "You haven't authorize"
        ]
    }
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Up Vote

  Method : `POST`
  Endpoint: `/questions/:questionId/upvote`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    {
        "upvotes": [
                "5d8aed788c293b30d3b0e248"
            ],
        "downvotes": [],
        "tags": [],
        "_id": "5db13979186be54cdb3f15d1",
        "title": "QUESTION 10",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima enim pariatur incidunt perspiciatis! Deserunt atque eveniet placeat ut nostrum provident. Ducimus ex itaque quas rem fuga vero? Quas assumenda nobis voluptate quae eaque, dolor illum ea mollitia laborum esse non tenetur voluptatum placeat incidunt doloremque cumque. Eligendi, incidunt tenetur.",
        "userId": "5daf170b1b0f3d26da50e007",
        "createdAt": "2019-10-24T05:41:13.944Z",
        "updatedAt": "2019-10-24T05:41:13.944Z",
        "__v": 0
    }
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Down Vote

  Method : `POST`
  Endpoint: `/questions/:id/downvote`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    {
        "upvotes": [],
        "downvotes": [
                "5d8aed788c293b30d3b0e248"
            ],
        "tags": [],
        "_id": "5db13979186be54cdb3f15d1",
        "title": "QUESTION 10",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima enim pariatur incidunt perspiciatis! Deserunt atque eveniet placeat ut nostrum provident. Ducimus ex itaque quas rem fuga vero? Quas assumenda nobis voluptate quae eaque, dolor illum ea mollitia laborum esse non tenetur voluptatum placeat incidunt doloremque cumque. Eligendi, incidunt tenetur.",
        "userId": "5daf170b1b0f3d26da50e007",
        "createdAt": "2019-10-24T05:41:13.944Z",
        "updatedAt": "2019-10-24T05:41:13.944Z",
        "__v": 0
    }
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```





# Answer

- ### Create

  Method : `POST`
  Endpoint: `/answers`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  - body:

    ```
    {
    	title: String (required)
        description: String (required),
        questionId: String (required),
    }
    ```

  ### *Response* :

  - 201 (Created)

    ```
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5db13f0436fa7e509fdc34af",
        "title": "ANSWER 2",
        "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
        "questionId": "5daf2b84f7f0e25a52af13a5",
        "userId": "5daf170b1b0f3d26da50e007",
        "createdAt": "2019-10-24T06:04:52.404Z",
        "updatedAt": "2019-10-24T06:04:52.404Z",
        "__v": 0
    }
    ```

  - 400 (Bad Request)

    ```
    {
        errors: [
        	"Title is required"
            "Description is required", 
        ]
    }
    ```

- ### Show All Answer By User Id

  Method : `GET`
  Endpoint: `/answers/user`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5daf33b2d4d06762d4b5dbc7",
            "title": "ANSWER 1",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "questionId": null,
            "userId": "5daf170b1b0f3d26da50e007",
            "createdAt": "2019-10-22T16:52:02.715Z",
            "updatedAt": "2019-10-22T16:52:02.715Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5daf33c9d4d06762d4b5dbc8",
            "title": "ANSWER 2",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "questionId": null,
            "userId": "5daf170b1b0f3d26da50e007",
            "createdAt": "2019-10-22T16:52:25.670Z",
            "updatedAt": "2019-10-22T16:52:25.670Z",
            "__v": 0
        },
    ]
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

  

- ## Show Answer By Question Id

  Method : `GET`
  Endpoint: `/answers/question/:questionId`

  ### *Request* :

  - params

    ```
    {
        questionId : String
    }
    ```

    

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5daf33b2d4d06762d4b5dbc7",
            "title": "ANSWER 1",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "questionId": null,
            "userId": "5daf170b1b0f3d26da50e007",
            "createdAt": "2019-10-22T16:52:02.715Z",
            "updatedAt": "2019-10-22T16:52:02.715Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5daf33c9d4d06762d4b5dbc8",
            "title": "ANSWER 2",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "questionId": null,
            "userId": "5daf170b1b0f3d26da50e007",
            "createdAt": "2019-10-22T16:52:25.670Z",
            "updatedAt": "2019-10-22T16:52:25.670Z",
            "__v": 0
        },
    ]
    ```

  

- ## Show One Answer

  Method : `GET`
  Endpoint: `/answers/:id`

  ### *Request* :

  - params

    ```
    {
    	id: String
    }
    ```

    

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5daf33b2d4d06762d4b5dbc7",
            "title": "ANSWER 1",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "questionId": null,
            "userId": "5daf170b1b0f3d26da50e007",
            "createdAt": "2019-10-22T16:52:02.715Z",
            "updatedAt": "2019-10-22T16:52:02.715Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5daf33c9d4d06762d4b5dbc8",
            "title": "ANSWER 2",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "questionId": null,
            "userId": "5daf170b1b0f3d26da50e007",
            "createdAt": "2019-10-22T16:52:25.670Z",
            "updatedAt": "2019-10-22T16:52:25.670Z",
            "__v": 0
        },
    ]
    ```

  - 401 (Not authorized)

    ```
    {
        errors: [
            "You haven't authorize with this answer"
        ]
    }
    ```

    

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

    ### 

- ### Update

  Method : `PATCH`
  Endpoint: `/answers/:id`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  - body:

    ```
    {
    	title: String (required)
        description: String (required),
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
     {
            "upvotes": [],
            "downvotes": [],
            "_id": "5daf33c9d4d06762d4b5dbc8",
            "title": "UPDATE",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "questionId": null,
            "userId": "5daf170b1b0f3d26da50e007",
            "createdAt": "2019-10-22T16:52:25.670Z",
            "updatedAt": "2019-10-22T16:52:25.670Z",
            "__v": 0
        },
    ```

  - 401 (Not authorized)

    ```
    {
        errors: [
            "You haven't authorize with this answer"
        ]
    }
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Delete

  Method : `DELETE`
  Endpoint: `/questions/:id`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    {
        message: 'Succes Delete'
    }
    ```

  - 401 (Not Authorize)

    ```
    {
        errors: [
            "You haven't authorize with this answer"
        ]
    }
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Up Vote

  Method : `POST`
  Endpoint: `/answers/:id/upvote`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    {
        "message": "Update upvote success",
        "answer": {
            "upvotes": [
                "5d8aed788c293b30d3b0e248"
            ],
            "downvotes": [],
            "_id": "5d8b632ab0c0071b8a4d7a94",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "createdAt": "2019-09-25T12:52:58.142Z",
            "updatedAt": "2019-09-25T13:11:29.078Z",
            "__v": 7
        }
    }
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Down Vote

  Method : `POST`
  Endpoint: `/answers/:id/downvote`

  ### *Request* :

  - header

    ```
    {
        token: "{your token}"
    }
    ```

  ### *Response* :

  - 200 (OK)

    ```
    {
        "message": "Update downvote success",
        "answer": {
            "upvotes": [],
          "downvotes": [
                "5d8aed788c293b30d3b0e248"
          ],
            "_id": "5d8b632ab0c0071b8a4d7a94",
            "description": "ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ANSWER 1 ",
            "createdAt": "2019-09-25T12:52:58.142Z",
            "updatedAt": "2019-09-25T13:12:09.480Z",
            "__v": 8
        }
    }
    ```

  - 403 (Forbidden)

    ```
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

## Another Error

- 500 (Internal Server Error)

  ```
  {
  	errors: [
  		"Internal Server Error"
  	]
  }
  ```
