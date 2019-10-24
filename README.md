## \API DOCUMENTASI HACKTIV OVERFLOW

##  Errors

| 200- OK                     | Everything worked as expected                                |
| --------------------------- | ------------------------------------------------------------ |
| 400 - Bad Request           | The request was unacceptable                                 |
| 403 - Forbidden             | The API key / Token doesn't have permissions to perform the request |
| 404 - Not Found             | The requested resouce doesn't exist.                         |
| 500 0 Internal Server Error | Something went wrong on Stripe's end. (These are rare.)      |



## User Route

End Point 

```javascript
method: 'post',
path: '/users/login',
body: {
  "username": required,
  "password": required
}
```

Response 

```javascript
status: 200,
response: {
  "token": String,
  "user": {
    "_id": ObjectId,
    "username": String,
    "password": String (hashed),
    "email": String,
    "createdAt": Date
  }
}
```


End Point


```javascript
method: 'post',
path: '/users/register',
body: {
  "username": String => required,
  "password": String => required,
  "email" : String => reuqired
}
```

Response

```javascript
status: 201,
response: {
  "token": String,
  "msg": String,
  "data": {
    "_id": ObjectId,
    "username": String,
    "password": String (hashed),
    "email": String,
    "createdAt": Date
  }
}
```



## Question Route


End Point

```javascript
method: 'get',
path: '/questions',
```

Response

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
            "createdAt": Date
        },
        "createdAt": Date
    },
  	{....}
  	{....}
]
```

End Point

```javascript
method: 'get',
path: '/questions/profile',
headers: {
  token : String => required
}
```

Response .. Find All question by UserId

```java
status: 200,
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
      "createdAt": Date
    },
    "createdAt": Date
  }
]
```

End Point

```javascript
method: 'get',
path: '/questions/search/:id',
```

Response

```javascript
status: 200
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
      "createdAt": Date
    },
    "createdAt": Date
  }
]
```

End Point 

```javascript
method: 'get',
path: '/questions/search/tags/:name',
```

Response .... Find by tags name

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
            "password": String,
            "email": String,
            "createdAt": Date
        },
        "createdAt": Date
    },
   {...},
   {...}
]
```

End Point

```javascript
method: 'get',
path: 'questions/find/:name'
```

Response ..... Find by title name

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
            "password": String,
            "email": String,
            "createdAt": Date
        },
        "createdAt": Date
    },
   {...},
   {...}
]
```

End Point

```javascript
method: 'put',
path: '/questions/:id',
headers: {
  "token": String
}
```

Response .... Update Question === Authentication & Authorization only

```javascript
{
  "msg": String
}
```

End Point

```javascript
method: 'post',
path: '/questions/ask',
headers: {
  "token": String
}
```

Response

```javascript
status: 201,
response: {
  "msg": String,
  "question": Data
}
```

End Point

```javascript
method: 'patch',
path: '/questions/up' || '/questions/down',
headers: {
  "token": String
}
```

Response ... to UpVote / DownVote

```javascript
status: 201,
response: {
  "msg": String
}
```

End Point

```javascript
method: 'delete',
path: '/questions/:id',
headers: {
  "token": String
}
```

Response ... Authentication & Authorization

```javascript
status:200,
response: {
	"msg": String
}
```



## Answer Route

End Point

```javascript
method: 'post',
path: '/answers/:id',
headers: {
	"token": String
}
```

Response

```java
status: 201,
response: {
  "data": Object,
  "msg": String
}
```

End Point

```javascript
method: 'get',
path: '/answers/:id'
```

Reponse

```java
status: 200,
response: Array of Users
```

End Point

```javascript
method: 'patch',
path: '/answers/up' || '/answers/down',
headers: {
  "token": String
}
```

Response ... to UpVote / DownVote

```javascript
status: 201,
response: {
  "msg": String
}
```

