

**Fake Overflow**
----
access to deployed app: [fakeoverflow.satyowicaksana.online](http://fakeoverflow.satyowicaksana.online)

**POST /users/register**
* **URL**

  `/users/register`

* **Method:**

  `POST` 
  
* **Data Params**
 
   **body:**
   
	| property | type | description |
	|--|--|--|
	|`'username'`| string | the username/Display Name of the user |
	|`'email'`| string | the email of the user |
	|`'password'`| string | the password of the user |


* **Success Response:**

**Code:** 201 <br />
    **Content Example:** 
  
```
{
	"username":  "Fake User",
	"email":  "fake@email.com",
	"access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZha2UgVXNlciIsImVtYWlsIjoiZmFrZUBlbWFpbC5jb20iLCJpYXQiOjE1NzE4NjgwMjR9.NImWYxLInh7UaNmWwOEvRyV9Mi2r7R5kmimEjcyBd0w"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Display name cannot be empty.",
		"fakeemail.com is not a valid email address.",
		"Password must include at least 1 letter and 1 number."
	]
}
```

**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
----

**POST /users/login**
* **URL**

  `/users/login`

* **Method:**

  `POST` 
  
* **Data Params**
 
   **body:**
   
	| property | type | description |
	|--|--|--|
	|`'username'`| string | the username of the user |
	|`'password'`| string | the password of the user |


* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"username":  "Fake User",
	"email":  "fake@email.com",
	"access_token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZha2UgVXNlciIsImVtYWlsIjoiZmFrZUBlbWFpbC5jb20iLCJpYXQiOjE1NzE4NjgxOTZ9.VBycs4EqOhsbViMcf4hkcUlmENx8VQxuE1-M039mfiQ"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"The email or password is incorrect."
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
----

**GET /questions**
* **URL**

  `/questions`

* **Method:**

  `GET` 
  
* **Data Params**
 
   **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |


* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
[
	{
		"upvotes":  [
			"5daf73f77803f7ba651b5441"
		],
		"downvotes":  [],
		"created_at":  "2019-10-23T17:28:35.173Z",
		"answers":  [
			{
				"upvotes":  [],
				"downvotes":  [],
				"created_at":  "2019-10-23T20:38:33.271Z",
				"_id":  "5db0ba4c005a8053e59dadab",
				"title":  "What Is?",
				"description":  "<p>This is a description</p>",
				"question":  "5db08ed83544c23eaf490eb5",
				"user":  "5daf73f77803f7ba651b5441"
			},
			{
				"upvotes":  [],
				"downvotes":  [],
				"created_at":  "2019-10-23T20:38:57.683Z",
				"_id":  "5db0ba63d90b6a53f88418d5",
				"title":  "What Is?",
				"description":  "<p>This is a description</p>",
				"question":  "5db08ed83544c23eaf490eb5",
				"user":  "5daf73f77803f7ba651b5441"
			}
		],
			"_id":  "5db08ed83544c23eaf490eb5",
			"title":  "aaa",
			"description":  "aa",
			"user":  {
			"_id":  "5db0556d1bd368281e9870fa",
			"username":  "douglas",
			"email":  "douglas@b.com",
			"password":  "$2a$10$8B01WC/HgZezBC07uokxIOryBC2dH/W1cppP/ebUXKO6jmGgf7nWW"
		}
	}
]
```
 
* **Error Response:**


**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
----
**POST /questions**
* **URL**

  `/questions`

* **Method:**

  `POST` 
  
* **Data Params**

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |

   **body:**

	| property | type | description |
	|--|--|--|
	|`'title'`| string | the name of the question |
	|`'description'`| string | the description about the detail of the question |


* **Success Response:**

**Code:** 201 <br />
    **Content Example:** 
  
```
{
	"upvotes":  [],
	"downvotes":  [],
	"created_at":  "2019-10-23T21:56:33.517Z",
	"answers":  [],
	"_id":  "5db0d0cd666c7a5afeb89385",
	"title":  "How to validate email using Javascript?",
	"description":  "I'm wondering what is the best way to...",
	"user":  "5db0cd78666c7a5afeb89381"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Title is missing",
		"Body is missing"
	]
}
```
**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
----
**GET /questions/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `GET` 
  
* **Data Params**
 **params:**

	| property | type | description |
	|--|--|--|
	|`'id'`| string | value of question id |

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |



* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"upvotes":  [],
	"downvotes":  [],
	"created_at":  "2019-10-23T21:56:33.517Z",
	"answers":  [],
	"_id":  "5db0d0cd666c7a5afeb89385",
	"title":  "How to validate email using Javascript?",
	"description":  "I'm wondering what is the best way to...",
	"user":  {
		"_id":  "5db0cd78666c7a5afeb89381",
		"username":  "Fake User",
		"email":  "fake@email.com",
		"password":  "$2a$10$YcNdNR.lF4T81.26Ji3idOWaQPFWCae59meykacw9U0Gy6Uqc20R2"
	}
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Data not found"
	]
}
```
**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
----
**PATCH questions/upvote/:id**
* **URL**

  `/questions/upvote/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**
**params:**

	| property | type | description |
	|--|--|--|
	|`'id'`| string | value of question id |
  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |



* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"upvotes":  [
		"5db0cd78666c7a5afeb89381"
	],
	"downvotes":  [],
	"created_at":  "2019-10-23T21:56:33.517Z",
	"answers":  [],
	"_id":  "5db0d0cd666c7a5afeb89385",
	"title":  "How to validate email using Javascript?",
	"description":  "I'm wondering what is the best way to...",
	"user":  {
		"_id":  "5db0cd78666c7a5afeb89381",
		"username":  "Fake User",
		"email":  "fake@email.com",
		"password":  "$2a$10$YcNdNR.lF4T81.26Ji3idOWaQPFWCae59meykacw9U0Gy6Uqc20R2"
	}
}
```
 
* **Error Response:**

**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
----
**PATCH questions/downvote/:id**
* **URL**

  `/questions/downvote/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**
**params:**

	| property | type | description |
	|--|--|--|
	|`'id'`| string | value of question id |
  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |



* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"upvotes":  [],
	"downvotes":  [
		"5db0cd78666c7a5afeb89381"
	],
	"created_at":  "2019-10-23T21:56:33.517Z",
	"answers":  [],
	"_id":  "5db0d0cd666c7a5afeb89385",
	"title":  "How to validate email using Javascript?",
	"description":  "I'm wondering what is the best way to...",
	"user":  {
		"_id":  "5db0cd78666c7a5afeb89381",
		"username":  "Fake User",
		"email":  "fake@email.com",
		"password":  "$2a$10$YcNdNR.lF4T81.26Ji3idOWaQPFWCae59meykacw9U0Gy6Uqc20R2"
	}
}
```
 
* **Error Response:**

**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
---
**PATCH /questions/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**
**params:**

	| property | type | description |
	|--|--|--|
	|`'id'`| string | value of question id |
  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |
	**body:**

	| property | type | description |
	|--|--|--|
	|`'title'`| string | the name of the question |
	|`'description'`| string | the description about the detail of the question |



* **Success Response:**

**Code:** 200 <br />
    **Content Example:** 
  
```
{
	"upvotes":  [],
		"downvotes":  [
		"5db0cd78666c7a5afeb89381"
	],
	"created_at":  "2019-10-23T21:56:33.517Z",
	"answers":  [],
	"_id":  "5db0d0cd666c7a5afeb89385",
	"title":  "How to validate email using Javascript?",
	"description":  "I'm wondering what is the best way to...",
	"user":  "5db0cd78666c7a5afeb89381"
}
```
 
* **Error Response:**

**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
---
**DELETE /questions/:id**
* **URL**

  `/questions/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**
**params:**

	| property | type | description |
	|--|--|--|
	|`'id'`| string | value of question id |
  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |



* **Success Response:**

**Code:** 201 <br />
    **Content Example:** 
  
```
{
	"upvotes":  [],
	"downvotes":  [],
	"created_at":  "2019-10-23T21:10:44.203Z",
	"answers":  [],
	"_id":  "5db0c20e3b1a2f5781abd32a",
	"title":  "aaa",
	"description":  "aa",
	"user":  "5dafd356e0f3baf9a29c0408"
}
```
 
* **Error Response:**

**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You are not authorized to access this data"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
---
**POST /answers**
* **URL**

  `/answers`

* **Method:**

  `POST` 
  
* **Data Params**

  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |

   **body:**

	| property | type | description |
	|--|--|--|
	|`'title'`| string | the name of the question |
	|`'description'`| string | the description about the detail of the question |
	|`'questionId'`| string | id of a question answered |


* **Success Response:**

**Code:** 201 <br />
    **Content Example:** 
  
```
{
	"upvotes":  [],
	"downvotes":  [],
	"created_at":  "2019-10-23T20:38:57.683Z",
	"_id":  "5db0ba63d90b6a53f88418d5",
	"title":  "What Is?",
	"description":  "<p>This is a description</p>",
	"question":  "5db08ed83544c23eaf490eb5",
	"user":  "5daf73f77803f7ba651b5441"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Title is missing",
		"Body is missing"
	]
}
```
**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```
----
**POST /answers/:id**
* **URL**

  `/answers/:id`

* **Method:**

  `POST` 
  
* **Data Params**
**params:**

	| property | type | description |
	|--|--|--|
	|`'id'`| string | value of question id |
  **headers:**

	| property | type | description |
	|--|--|--|
	|`'access_token'`| string | a token that is sent to logged user |

   **body:**

	| property | type | description |
	|--|--|--|
	|`'title'`| string | the name of the question |
	|`'description'`| string | the description about the detail of the question |


* **Success Response:**

**Code:** 201 <br />
    **Content Example:** 
  
```
{
	"upvotes":  [],
	"downvotes":  [],
	"created_at":  "2019-10-23T20:38:57.683Z",
	"_id":  "5db0ba63d90b6a53f88418d5",
	"title":  "What Is?",
	"description":  "<p>This is a description</p>",
	"question":  "5db08ed83544c23eaf490eb5",
	"user":  "5daf73f77803f7ba651b5441"
}
```
 
* **Error Response:**

**Code:** 400 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Title is missing",
		"Body is missing"
	]
}
```
**Code:** 401 <br />
    **Content Example:** 
```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 500 <br />
    **Content Example:** 
```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```