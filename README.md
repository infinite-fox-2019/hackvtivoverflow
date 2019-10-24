# Hoverflow API Documentation

### List of question routes:

| **Route** | **HTTP** | **Header(s)** | **Body**  | **Description** |
| --------- | -------- | ------------- | --------- | --------------- |
| `/question/all` | GET    | `none` | `none`   | Get all questions |
| `/question` | GET | `token`      | `none`                           | Get all questions from user |
| `/question/:id` | GET | `token`     | `none`   | Get certain question from user |
| `/question/upvote/:id` | POST | `token`| `none`   | Upvote question |
| `/question/downvote/:id` | POST   | `token`| `none` | Downvote question |
| `/question` | POST | `token`       | title:string, description:string | Post new question              |
| `/question/:id` | PATCH | `token` | title:string, description:string | Update question |
| `/question/:id` | DELETE | `token` | `none` | Delete question |

### Get all questions

| URL              | http://hoverflow-server.ricky-works.online/question/all      |
| ---------------- | ------------------------------------------------------------ |
| Method           | `GET`                                                        |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `none`                                                       |
| Success Response | `status: 200` , questions :<br />[<br />  {<br/>    "_id": 1,<br/>    "title": "Make bed",<br/>    "description": "Before 6:30",<br/>    "user": 1,<br/>    "createdAt": "2019-09-30T09:58:57.689Z",<br/>  }<br />] |
| Error Response   | `status:404` , Message : "Questions Not Found"               |

### Get all questions from user

| URL              | http://hoverflow-server.ricky-works.online/question          |
| ---------------- | ------------------------------------------------------------ |
| Method           | `GET`                                                        |
| Params           | `none`                                                       |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , questions :<br />[<br/>  {<br/>    "_id": 1,<br/>    "title": "Make bed",<br/>    "description": "Before 6:30",<br/>    "user": 1,<br/>    "createdAt": "2019-09-30T09:58:57.689Z",<br/>  }<br/>] |
| Error Response   | `status:401` , Message :  "You Are Unauthorized!"            |
| Error Response 2 | `status 404`, Message : "Questions Not Found"                |

### Get certain question from user

| URL              | http://hoverflow-server.ricky-works.online/question/:id      |
| ---------------- | ------------------------------------------------------------ |
| Method           | `GET`                                                        |
| Params           | `id: string`                                                 |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , question:<br />  {<br />     "_id": 1,<br />     "title": "Make bed",<br />     "description": "Before 6:30",<br />     "user": 1,<br />     "createdAt": "2019-09-30T09:58:57.689Z",<br />   }<br /> |
| Error Response   | `status:401` , Message :  "You Are Unauthorized!"            |
| Error Response 2 | `status 404`, Message : "Question Not Found"                 |

### Upvote question

| URL              | http://hoverflow-server.ricky-works.online/question/upvote/:id |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `id: string`                                                 |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , response :<br />{<br/>  "response": "Upvoted Question Successfully!"<br/>} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |
| Error Response 2 | `status:404` , Message : "Question Not Found"                |

### Downvote question

| URL              | http://hoverflow-server.ricky-works.online/question/downvote/:id |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `id: string`                                                 |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , response :<br />{<br />    "response": "Downvoted Question Successfully!"<br />} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |
| Error Response 2 | `status:404` , Message : "Question Not Found"                |

### Post new question

| URL              | http://hoverflow-server.ricky-works.online/question          |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `none`                                                       |
| Headers          | `token: string`                                              |
| Data             | `title: string, description: string`                         |
| Success Response | `status: 201` , response :<br />{<br />   "response": "Question Created Successfully!"<br />} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |
| Error Response 2 | `status:400` , Message : "Title Must Not Be Blank"           |
| Error Response 3 | `status: 400`, Message: "Description Must Not Be Blank"      |

### Update question

| URL              | http://hoverflow-server.ricky-works.online/question/:id      |
| ---------------- | ------------------------------------------------------------ |
| Method           | `PATCH`                                                      |
| Params           | `id: string`                                                 |
| Headers          | `token: string`                                              |
| Data             | `title: string, description: string`                         |
| Success Response | `status: 200` , response :<br />{<br />    "response": "Question Updated Successfully!"<br />} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |

### Delete question

| URL              | http://hoverflow-server.ricky-works.online/question/:id      |
| ---------------- | ------------------------------------------------------------ |
| Method           | `DELETE`                                                     |
| Params           | `id: string`                                                 |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , response :<br />{<br />     "response": "Question Deleted Successfully!"<br />} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |

### List of answer routes:

| **Route** | **HTTP** | **Header(s)** | **Body**  | **Description** |
| --------- | -------- | ------------- | --------- | --------------- |
| `/answer` | GET    | `token` | `none`   | Get all answers from user |
| `/answer/:question` | GET | `token`      | `none`                           | Get all answers from question |
| `/answer/:question/:id` | GET | `token`     | `none`   | Get certain answer from question |
| `/answer/:question/upvote/:id` | POST | `token`| `none`   | Upvote answer |
| `/answer/:question/downvote/:id` | POST   | `token`| `none` | Downvote answer |
| `/answer/:question` | POST | `token`       | title:string, description:string | Post new answer         |
| `/answer/:question/:id` | PATCH | `token` | title:string, description:string | Update answer |

### Get all answers

| URL              | http://hoverflow-server.ricky-works.online/answer            |
| ---------------- | ------------------------------------------------------------ |
| Method           | `GET`                                                        |
| Params           | `none`                                                       |
| Headers          | `token`                                                      |
| Data             | `none`                                                       |
| Success Response | `status: 200` , answers :<br />[<br />  {<br/>    "_id": 1,<br/>    "title": "Make bed",<br/>    "description": "Before 6:30",<br/>    "user": 1,<br/>    "question": "1"<br />    "createdAt": "2019-09-30T09:58:57.689Z",<br/>  }<br />] |
| Error Response   | `status:404` , Message : "Answers Not Found"                 |

### Get all answers from question

| URL              | http://hoverflow-server.ricky-works.online/answer/:question  |
| ---------------- | ------------------------------------------------------------ |
| Method           | `GET`                                                        |
| Params           | `question: string`                                           |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , answers :<br />[<br/>  {<br/>    "_id": 1,<br/>    "title": "Make bed",<br/>    "description": "Before 6:30",<br/>    "user": 1,<br/>    "question": 1<br />    "createdAt": "2019-09-30T09:58:57.689Z",<br/>  }<br/>] |
| Error Response   | `status:401` , Message :  "You Are Unauthorized!"            |
| Error Response 2 | `status 404`, Message : "Answers Not Found"                  |

### Get certain answer from question

| URL              | http://hoverflow-server.ricky-works.online/answer/:question/:id |
| ---------------- | ------------------------------------------------------------ |
| Method           | `GET`                                                        |
| Params           | `id: string, question: string`                               |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , question:<br />  {<br />     "_id": 1,<br />     "title": "Make bed",<br />     "description": "Before 6:30",<br />     "user": 1,<br />    "question": "1"<br />     "createdAt": "2019-09-30T09:58:57.689Z",<br />   }<br /> |
| Error Response   | `status:401` , Message :  "You Are Unauthorized!"            |
| Error Response 2 | `status 404`, Message : "ANswer Not Found"                   |

### Upvote answer

| URL              | http://hoverflow-server.ricky-works.online/answer/:question/upvote/:id |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `id: string, question: string`                               |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , response :<br />{<br/>  "response": "Upvoted Answer Successfully!"<br/>} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |
| Error Response 2 | `status:404` , Message : "Answer Not Found"                  |

### Downvote answer

| URL              | http://hoverflow-server.ricky-works.online/answer/:question/downvote/:id |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `id: string, question: string`                               |
| Headers          | `token: string`                                              |
| Data             | `none`                                                       |
| Success Response | `status: 200` , response :<br />{<br />    "response": "Downvoted Answer Successfully!"<br />} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |
| Error Response 2 | `status:404` , Message : "Answer Not Found"                  |

### Post new answer

| URL              | http://hoverflow-server.ricky-works.online/answer/:question  |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `question: string`                                           |
| Headers          | `token: string`                                              |
| Data             | `title: string, description: string`                         |
| Success Response | `status: 201` , response :<br />{<br />   "response": "Answer Created Successfully!"<br />} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |
| Error Response 2 | `status:400` , Message : "Title Must Not Be Blank"           |
| Error Response 3 | `status:400` , Message : "Description Must Not Be Blank"     |

### Update answer

| URL              | http://hoverflow-server.ricky-works.online/answer/:question/:id |
| ---------------- | ------------------------------------------------------------ |
| Method           | `PATCH`                                                      |
| Params           | `id: string, question: string`                               |
| Headers          | `token: string`                                              |
| Data             | `title: string, description: string`                         |
| Success Response | `status: 200` , response :<br />{<br />    "response": "Answer Updated Successfully!"<br />} |
| Error Response 1 | `status:401` , Message : "You Are Unauthorized!"             |

### List of user signin and signup routes:

| **Route**              | **HTTP** | **Header(s)** | **Body**                                          | **Description**                                     |
| ---------------------- | -------- | ------------- | ------------------------------------------------- | --------------------------------------------------- |
| `/user/register`       | POST     | `none`        | username: string, email: string, password: string | Sign up with new user info                          |
| `/user/login`          | POST     | `none`        | email: string, password: string                   | Sign in to get an access token based on credentials |
| `/user/refresh/:token` | POST     | `none`        | `none`                                            | Verify validity of user's current token             |

### Register User

| URL              | http://hoverflow-server.ricky-works.online/user/register     |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `username: string, email: string, password:string`           |
| Success Response | `status: 201` , Data:<br />{<br/>  "_id": 1,<br/>  "username": "User"<br />  "email": "user@gmail.com"<br />  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbmRyZWFzc29zaWxvIiwiaWF0IjoxNTY5ODE5MTkyfQ.2DbuH10GPsGrUSHnWO6xbxlIO7w6MtULPnyzclfyPQA"<br/>} |
| Error Response   | `status:400` , Message:<br />{<br/>  "Email format is incorrect"<br />} |
| Error Response 2 | `status:400` , Message:<br />{<br/>  "Username Must Not Be Blank!"<br />} |
| Error Response 3 | `status:400` , Message:<br />{<br/>  "Email Must Not Be Blank!"<br />} |
| Error Response 4 | `status:400` , Message:<br />{<br/>  "Password Must Not Be Blank!"<br />} |

### Login User

| URL              | http://hoverflow-server.ricky-works.online/user/login        |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `email: string, password:string`                             |
| Success Response | `status: 201` , Data:<br />{<br/>  "_id": 1,<br/>  "username": "User"<br />  "email": "user@gmail.com"<br />  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbmRyZWFzc29zaWxvIiwiaWF0IjoxNTY5ODE5MTkyfQ.2DbuH10GPsGrUSHnWO6xbxlIO7w6MtULPnyzclfyPQA"<br/>} |
| Error Response   | `status:400` , Message: "Incorrect Email / Password!"        |
| Error Response 2 | `status: 404`, Message: "User Not Found"                     |

### Validate token

| URL              | http://hoverflow-server.ricky-works.online/user/refresh/:token |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `username: string, password:string`                          |
| Success Response | `status: 201` , Data:<br />{<br/>  "_id": 1,<br/>  "username": "User"<br />  "email": "user@gmail.com"<br />  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbmRyZWFzc29zaWxvIiwiaWF0IjoxNTY5ODE5MTkyfQ.2DbuH10GPsGrUSHnWO6xbxlIO7w6MtULPnyzclfyPQA"<br/>} |
| Error Response   | `status:404` , Message: "User Not Found"                     |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ git clone https://github.com/AudrickOng/hackvtivoverflow.git
$ cd hacktivoverflow
$ npm install
$ npm run dev
```

## Server Link

Access the website via http://hoverflow-server.ricky-works.online/

## Client Link

Access the website via http://hoverflow.ricky-works.online.s3-website-ap-southeast-1.amazonaws.com/