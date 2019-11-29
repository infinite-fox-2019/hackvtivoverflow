## API DOCUMENTASI HACKTIV OVERFLOW

Server :

```java
1. express
2. mongoose
3. socket.io
4. bcryptjs
5. jsonwebtoken
6. morgan
7. cors
8. nodemailer
9. dotenv
```

Client :

```java
1. Vue CLI
2. Vuex
3. vue-awesome-notification
4. axios
5. bootstrap-vue
6. socket.io-client
7. vue-unicon
8. vue-progressbar
9. vue2-editor
10. sass
11. sass-loader
```



##  Errors Response:

```java
[
  {
    "status": 400,
    "msg": [
      "email/password wrong",
      "username is required",
      "password is required",
      "email is required",
      "title is required",
      "description is required",
			"response is required",
      "Sorry, your request not Found!",
      "cannot Update with empty value",
      "Exp Verify please try again"
    ]
  },
  {
    "status": 401,
    "msg": [
      "Authorization Error"
    ]
  },
  {
    "status": 403,
    "msg": [
      "Authentication Error",
      "Invalid Token / problem with Token",
      "Spam detected!",
      "Object Id",
      "the Email allready used!"
    ]
  },
  {
    "status": 404,
    "msg": [
      "The searched id was not found",
      "Question Not Found!",
      "Answer not Found!",
			"email doesn't exists"
    ]
  },
  {
    "status": 500,
    "msg": [
      "Internal Server Error"
    ]
  }
]
```





## User Route :

```java
1. List of User Route :
```

| Routes             | HTTP  | Headers | Body                                                         | Description         |
| ------------------ | ----- | ------- | ------------------------------------------------------------ | ------------------- |
| /users             | GET   | token   | none                                                         | Get User Signin     |
| /users/{:id}       | GET   | token   | none                                                         | See Profile User    |
| /users/add/watch   | PATCH | token   | tag: String                                                  | Add Tag to WatchTag |
| /users/medal/{:id} | PATCH | token   | none                                                         | Update User medal   |
| /users/login       | POST  | none    | request: String<br />password: String                        | Login User          |
| /users/register    | POST  | none    | username: String<br />email: String<br />password: String<br />city: String | Create New Account  |



## <span style='color:green'>POST</span> /users/login

### Body:

```javascript
{
  "username": required,
  "password": required
}
```

### Response :

```javascript
status: 200,
response: {
  "token": String,
  "user": {
    "_id": ObjectId,
    "username": String,
    "password": String (hashed),
    "email": String,
		"views": Number,
    "bronze": Array,
    "silver": Array,
    "gold": Array,
    "profile_image": String,
    "city": String,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```



## <span style='color: green'>POST</span> /users/register

### Body :


```javascript
{
  "username": String => required,
  "password": String => required,
  "email" : String => required,
  "city": String => required
}
```

### Response :****

```javascript
status: 201,
response: {
  "token": String,
  "msg": String,
  "user": {
    "_id": ObjectId,
    "username": String,
    "password": String (hashed),
    "email": String,
		"views": Number,
    "bronze": Array,
    "silver": Array,
    "gold": Array,
    "profile_image": String,
    "city": String,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```



## <span style='color: green'>GET</span> /users

### Authentication

```java
{
  "token": String
}
```

### Response: 

```java
{
  "user": {
    "_id": ObjectId,
    "username": String,
    "password": String (hashed),
    "email": String,
		"views": Number,
    "bronze": Array,
    "silver": Array,
    "gold": Array,
    "profile_image": String,
    "city": String,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```



## <span style='color: green'>GET</span> /users/{:id}

### Params: 

```java
{
  "id": User => ObjectId
}
```



### Authentication :

```java
{
  "token": String
}
```

### Response :

```java
{
  "user": {
    "_id": ObjectId,
    "username": String,
    "password": String (hashed),
    "email": String,
		"views": Number,
    "bronze": Array,
    "silver": Array,
    "gold": Array,
    "profile_image": String,
    "city": String,
    "createdAt": Date,
    "updatedAt": Date
  }
	"question": {
    "title": String,
    "description": String,
    "upvotes": Array,
    "downvotes": Array,
    "tags": Array,
    "UserId": ObjectId,
    "views": Number,
    "createdAt": Date,
    "updatedAt": Date
  }
	"answer": {
    "response": String,
    "upvotes": Array,
    "downvotes": Array,
    "QuestionId": ObjectId,
    "UserId": ObjectId
  }
}
```



## <span style='color: green'>PATCH</span> /users/add/watch

### Authentication

```java
{
  "token": String
}
```

### Body :

```java
{
  "tag": String
}
```

### Response:

```java
{
  "msg": String,
  "user": {
    "_id": ObjectId,
    "username": String,
    "password": String (hashed),
    "email": String,
		"views": Number,
    "bronze": Array,
    "silver": Array,
    "gold": Array,
    "profile_image": String,
    "city": String,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```



## <span style='color: green'>PATCH</span> /medal/{:id}

### Authentication :

```java
{
  "token": String
}
```

### Params :

```java
{
  "id": User => ObjectId
}
```

### Body: 

```java
{
  "medal": String
}
```



### Response :

```java
{
  "user": {
    "_id": ObjectId,
    "username": String,
    "password": String (hashed),
    "email": String,
		"views": Number,
    "bronze": Array,
    "silver": Array,
    "gold": Array,
    "profile_image": String,
    "city": String,
    "createdAt": Date,
    "updatedAt": Date
  }
}
```



## Question Route

```java
2. List of Question Routes:
```

| Routes                       | HTTP | Headers | Body | Description              |
| ---------------------------- | ---- | ------- | ---- | ------------------------ |
| /questions                   | GET  | none    | none | Get All Questions        |
| /questions/search/{:id}      | GET  | none    | none | Get One question         |
| /questions/find/tags         | GET  | none    | none | Get All Tags             |
| /questions/search/tags/{:id} | GET  | none    | none | Get Question by Tag Name |
| /questions/find/{:name}      | GET  | none    | none | Get Question by Title    |

| Routes                | HTTP   | Headers | Body                                                    | Description              |
| --------------------- | ------ | ------- | ------------------------------------------------------- | ------------------------ |
| /questions/profile    | GET    | token   | none                                                    | Get Question User        |
| /questions/watchTag   | GET    | token   | none                                                    | Get Question by WatchTag |
| /questions/{:id}      | PUT    | token   | none                                                    | Update Question          |
| /questions/ask        | POST   | token   | title: String<br />description: String<br />tags: Array | Create New Question      |
| /questions/up/{:id}   | PATCH  | token   | none                                                    | Upvote the Question      |
| /questions/down/{:id} | PATCH  | token   | none                                                    | Downvote the Question    |
| /questions/{:id}      | DELETE | token   | none                                                    | Delete the Question      |



## <span style='color:green'>GET</span> /questions

### Response :

```javascript
status: 200,
response: [
    {
      "upvotes": Array,
      "downvotes": Array,
      "tags": Array,
      "_id": ObjectId,
      "title": String,
      "description": String,
      "UserId": {
        "_id": ObjectId,
        "username": String,
        "password": String (hashed),
        "email": String,
        "views": Number,
        "bronze": Array,
        "silver": Array,
        "gold": Array,
        "profile_image": String,
        "city": String,
        "createdAt": Date,
        "updatedAt": Date
      },
      "views": Number
      "createdAt": Date,
      "updatedAt": Date
    },
  	{....}
  	{....}
]
```

## <span style='color: green'>GET</span> /questions/search/{:id}

### Response: 

```java
{
  "question1":{
    "upvotes": Array,
    "downvotes": Array,
    "tags": Array,
    "_id": ObjectId,
    "title": String,
    "description": String,
    "UserId": {
      "_id": ObjectId,
      "username": String,
      "password": String (hashed),
      "email": String,
      "views": Number,
      "bronze": Array,
      "silver": Array,
      "gold": Array,
      "profile_image": String,
      "city": String,
      "createdAt": Date,
      "updatedAt": Date
    },
    "views": Number
      "createdAt": Date,
    "updatedAt": Date
  },
}
```



## <span style='color: green'>GET</span> /questions/find/tags

### Response : 

```java
{
  "tags": Array
}
```



## <span style='color: green'>GET</span> /questions/search/tags/{:name}

### Response :

```java
[
  {
    "upvotes": Array,
    "downvotes": Array,
    "tags": Array,
    "_id": ObjectId,
    "title": String,
    "description": String,
    "UserId": {
      "_id": ObjectId,
      "username": String,
      "password": String (hashed),
      "email": String,
      "views": Number,
      "bronze": Array,
      "silver": Array,
      "gold": Array,
      "profile_image": String,
      "city": String,
      "createdAt": Date,
      "updatedAt": Date
    },
    "views": Number
      "createdAt": Date,
    "updatedAt": Date
  },
  {...},
  {...}
]
```

## <span style='color: green'>GET</span> /questions/find/{:name}

### Response: 

```java
[
  {
    "upvotes": Array,
    "downvotes": Array,
    "tags": Array,
    "_id": ObjectId,
    "title": String,
    "description": String,
    "UserId": {
      "_id": ObjectId,
      "username": String,
      "password": String (hashed),
      "email": String,
      "views": Number,
      "bronze": Array,
      "silver": Array,
      "gold": Array,
      "profile_image": String,
      "city": String,
      "createdAt": Date,
      "updatedAt": Date
    },
    "views": Number
      "createdAt": Date,
    "updatedAt": Date
  },
  {...},
  {...}
]
```



## <span style='color: green'>GET</span> /questions/profile

### Authentication :

```java
{
  "token": String
}
```

### Response :

```java
status: 200,
response: [
  {
    "upvotes": Array,
    "downvotes": Array,
    "tags": Array,
    "_id": ObjectId,
    "title": String,
    "description": String,
    "UserId": {
      "_id": ObjectId,
      "username": String,
      "password": String (hashed),
      "email": String,
      "views": Number,
      "bronze": Array,
      "silver": Array,
      "gold": Array,
      "profile_image": String,
      "city": String,
      "createdAt": Date,
      "updatedAt": Date
     },
    "views": Number
    "createdAt": Date,
    "updatedAt": Date
  },
  {...},
  {...}
]
```

## <span style='color: green'>GET</span> /questions/watchTag

### Authentication

```java
{
  "token": String
}
```

### Response: 

```java
{
  "question": [
  	{
      "upvotes": Array,
      "downvotes": Array,
      "tags": Array,
      "_id": ObjectId,
      "title": String,
      "description": String,
      "UserId": {
        "_id": ObjectId,
        "username": String,
        "password": String (hashed),
        "email": String,
        "views": Number,
        "bronze": Array,
        "silver": Array,
        "gold": Array,
        "profile_image": String,
        "city": String,
        "createdAt": Date,
        "updatedAt": Date
       },
      "views": Number
      "createdAt": Date,
      "updatedAt": Date
    },
    {...},
    {...}
  ]
}
```





## <span style='color: green'>PUT</span> /questions/{:id}

### Authentication

```java
{
  "token": String
}
```



### Response .... Update Question === Authentication & Authorization only

```javascript
{
  "msg": String
}
```

## <span style='color: green'>POST</span> /questions/ask

### Authentication

```java
{
  "token": String
}
```

### Body: 

```java
{
  "title": String,
  "description": String,
  "tags": Array
}
```

### Response

```javascript
status: 201,
response: {
  "msg": String,
  "question": 
  	{
      "upvotes": Array,
      "downvotes": Array,
      "tags": Array,
      "_id": ObjectId,
      "title": String,
      "description": String,
      "UserId": {
        "_id": ObjectId,
        "username": String,
        "password": String (hashed),
        "email": String,
        "views": Number,
        "bronze": Array,
        "silver": Array,
        "gold": Array,
        "profile_image": String,
        "city": String,
        "createdAt": Date,
        "updatedAt": Date
       },
      "views": Number
      "createdAt": Date,
      "updatedAt": Date
    },
}
```



## <span style='color: green'>PATCH</span> /questions/up/{:id} -or- /questions/down/{:id}

### Authentication

```java
{
  "token": String
}
```

### Response ... to UpVote / DownVote

```javascript
status: 201,
response: {
  "msg": String
}
```



## <span style='color: green'>DELETE</span> /questions/{:id}

### Authentication

```java
{
  "token": String
}
```

### Response ... Authentication & Authorization

```javascript
status:200,
response: {
	"msg": String
}
```



## Answer Route

```java
3. List of Answer Routes :
```

| Routes              | HTTP  | Headers | Body             | Description                   |
| ------------------- | ----- | ------- | ---------------- | ----------------------------- |
| /answers/{:id}      | POST  | token   | response: String | Create Ask Answer             |
| /answers/{:id}      | GET   | none    | none             | Get all Answer by Question Id |
| /answers            | GET   | token   | none             | Find Answer User              |
| /answers/up/{:id}   | PATCH | token   | none             | Upvotes the Answers           |
| /answers/down/{:id} | PATCH | token   | none             | Downvotes the Answers         |



## <span style='color: green'>POST</span> /answers/{:id}

### Authentication

```java
{
  "token": String
}
```

### Body: 

```java
{
  "response": String
}
```



### Response:

```java
status: 201,
response: {
  "data": {
    "response": String,
    "upvotes": Array,
    "downvotes": Array,
    "QuestionId": ObjectId,
    "UserId": ObjectId
  },
  "msg": String
}
```



## <span style='color: green'>GET</span> /answers/{:id}

### Reponse

```java
status: 200,
response: [
  {
    "response": String,
    "upvotes": Array,
    "downvotes": Array,
    "QuestionId": ObjectId,
    "UserId": {
      "_id": ObjectId,
      "username": String,
      "password": String (hashed),
      "email": String,
      "views": Number,
      "bronze": Array,
      "silver": Array,
      "gold": Array,
      "profile_image": String,
      "city": String,
      "createdAt": Date,
      "updatedAt": Date
    }
  }
]
```



## <span style='color: green'>PATCH</span> /answers/up/{:id} -or- /answers/down/{:id}

### Authentication

```java
{
  "token": String
}
```

### Response ... to UpVote / DownVote

```javascript
status: 201,
response: {
  "msg": String
}
```



## Msg Route :

```java
4. List of Message Routes:
```

| Routes    | HTTP | Headers | Body        | Description      |
| --------- | ---- | ------- | ----------- | ---------------- |
| /messages | GET  | token   | none        | Get All Messages |
| /messages | POST | token   | msg: String | Create a Message |



## <span style='color: green'>GET</span>  /messages

### Authentication

```java
{
  "token": String
}
```



### Response :

```java
{
  "msgs": [{
    "UserId": {
      "_id": ObjectId,
      "username": String,
      "password": String (hashed),
      "email": String,
      "views": Number,
      "bronze": Array,
      "silver": Array,
      "gold": Array,
      "profile_image": String,
      "city": String,
      "createdAt": Date,
      "updatedAt": Date
    },
    "msg": String
  },
           {...},
           {...}]
}
```



## <span style='color: green'>POST</span> /messages

### Authentication

```java
{
  "token": String
}
```



### Body:

```java
{
  "msg": String
}
```



### Response :

```java
{
  "msg": {
    "UserId": {
      "_id": ObjectId,
      "username": String,
      "password": String (hashed),
      "email": String,
      "views": Number,
      "bronze": Array,
      "silver": Array,
      "gold": Array,
      "profile_image": String,
      "city": String,
      "createdAt": Date,
      "updatedAt": Date
    }
}
```





## USAGE

```java
$ npm install
$ npm run dev
```

