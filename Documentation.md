**H8-OVERFLOW**
----
**Usage**

# Register and Login

**POST /register**
* **URL**

  `/register`

* **Method:**

  `POST` 
  
* **Data Body**

    `'key' username 'value' = your username`
 
   `'key' email 'value' = your email`

   `'key' password 'value' = your password`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "_id": "your id",
        "username" : "your username"
        "email": "your email,
        "password : your hashed password
    }
    ```
 
* **Error Response:**

    
If Email already in database

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Email is already Token' }`

If Password less than 6 character

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Password less than 6 character }`

If input is empty

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'email/password is required }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

**POST /login**
* **URL**

  `/login`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' email 'value' = your email`

   `'key' password 'value' = your password`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "token": your token,
        "payload" : {
            your data
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ invalid email/password" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# questions

**GET /questions**
* **URL**

  `/questions`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [    
        {
            "upvotes": [
                "userIdUpvote"
            ],
            "downvote": [
                "userIdDowvote"
            ],
            "questionAnswers": [
                "allAnswers in the Question
            ],
            "_id": "question Id",
            "title": "question title",
            "description": "question description",
            "UserId": {
                "Data of the User that Ask"
            }
        }
    ]

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**POST /questions**
* **URL**

  `/questions`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' title 'value' = your question title`

   `'key' description 'value' = your question description`


* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "upvotes": [],
        "downvote": [],
        "questionAnswers": [],
        "_id": "your id,
        "title": "your title",
        "description": "your description",
        "UserId": "Users that ask",
        "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : title is required" }`

  * **Code:** 400 <br />
    **Content:** `{ message : description is required" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`



**PATCH /questions/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' = question ID`

* **Data Body**
 
    **body:** 

   `'key' title 'value' = your updated title`

   `'key' description 'value' = your updated descripton`


* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "upvotes": [],
        "downvote": [],
        "questionAnswers": [],
        "_id": "your id,
        "title": "your updated title",
        "description": "your  updated description",
        "UserId": "Users that ask",
        "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ title is required" }`

  * **Code:** 400 <br />
    **Content:** `{ description is required" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**DELETE /questions/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' = question ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "upvotes": [],
        "downvote": [],
        "questionAnswers": [],
        "_id": "your id,
        "title": "your deleted title",
        "description": "your  deleted description",
        "UserId": "Users that ask",
        "__v": 0
    }
    ```
 
* **Error Response:**


  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# answers

**GET /questions**
* **URL**

  `/answers`


**POST /answers**
* **URL**

  `/answers:id`

* **Method:**

  `POST` 

* **Data Params**

**params:** 

`'params' = question ID`
  
* **Data Body**
 
   `'key' title 'value' = your answer title`

   `'key' description 'value' = your answer description`


* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "upvotes": [],
        "downvote": [],
        "_id": "answer id",
        "title": "answer title",
        "description": "answer description",
        "UserId": "user that make answer",
        "QuestionId": "question id where the answer is",
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : title is required" }`

  * **Code:** 400 <br />
    **Content:** `{ message : description is required" }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`



**PATCH /answers/:id**
* **URL**

  `/answers/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' = answer ID`

* **Data Body**
 
    **body:** 

   `'key' title 'value' = your updated title`

   `'key' description 'value' = your updated descripton`


* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "upvotes": [],
        "downvote": [],
        "_id": "answer id",
        "title": "updated answer title",
        "description": "updated answer description",
        "UserId": "user that make answer",
        "QuestionId": "question id where the answer is",
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ title is required" }`

  * **Code:** 400 <br />
    **Content:** `{ description is required" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**DELETE /answers/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' = answer ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "upvotes": [],
        "downvote": [],
        "_id": "answer id",
        "title": "deleted answer title",
        "description": "deleted answer description",
        "UserId": "user that make answer",
        "QuestionId": "question id where the answer is",
    }
    ```
 
* **Error Response:**


  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: "not authorized" }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`

# users


**PATCH /users/upvote**
* **URL**

  `/users/upvote/:id`

* **Method:**

  `PATCH` 

* **Data Params**

    **params:** 

    `'params' = question/answer ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
      your upvote to question/answer
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "already vote" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not authorized" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`


**PATCH /users/downvote**
* **URL**

  `/users/downvote/:id`

* **Method:**

  `PATCH` 

* **Data Params**

    **params:** 

    `'params' = question/answer ID`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
      your downvote to question/answer
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "already vote" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not authorized" }`

  * **Code:** 403 <br />
    **Content:** `{ message : "not login" }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Internal Server Error" }`






    