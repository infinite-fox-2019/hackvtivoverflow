## SansOverflow

API DOCUMENTATION | Aldinofrizal



### USER ENDPOINT

1. POST USER/REGISTER

   register a new user,

   require body : valid email address, username, and password

   **response success** 201

   ```JSON
   {
     "_id": "5db10205a5743e0e18ce651f",
     "username": "documentation",
     "email": "api@documentation.com",
     "password": "$2b$10$i9PfpVSEex3HCV4AaSyENe09Pd8ccCx4BzIybaBZwFXVcoosMDRLe",
     "__v": 0
   }
   ```

   **response error**  422

   if body email is invalid, and username was not filled

   ```JSON
   {
     "message": [
       "username is required",
       "Please fill a valid email address"
     ]
   }
   ```

   

2. POST USER/LOGIN

   login existing user

   require body: valid email and passowrd

   **response success** 200

   ```JSON
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiX2lkIjoiNWRhZDY0ZjJmNjBlNjEyYWEzNmIyNTZhIiwiaWF0IjoxNTcxODgxNjE5fQ.0O2wqOxGB9Hi0aXTDUrt405U2SYkVLOAvAEK9bV72RQ",
     "user": {
       "username": "test",
       "email": "test@gmail.com",
       "_id": "5dad64f2f60e612aa36b256a"
     }
   }
   ```

   **response error** 422

   if email and password didnot match any data in database

   ```JSON
   {
     "message": "wrong email/password"
   }
   ```



### QUESTION ENDPOINT

```javascript
router.patch('/upvote/:id', authentication, Controller.upvote)
router.patch('/downvote/:id', authentication , Controller.downvote)
router.post('/' , authentication , Controller.create)
router.patch('/:id', authentication , Controller.update)
router.delete('/:id', authentication, Controller.delete)
router.get('/' , Controller.find)
router.get('/user' , authentication , Controller.findUser)
router.get('/tag' , Controller.tag)
```



1. ### GET /question/

   find all question data, did not require anything

   **response success** 200

   array of object containing question data populated with user and answer, and votes data

   ```JSON
   [
     {
       "tags": [
         "angular ",
         "javascript "
       ],
       "answer": [
         {
           "_id": "5db0080d7dc5164e638c4932",
           "answer": "<p style=\"margin-bottom: 1em; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch ..... ; background-color: rgb(239, 240, 241); white-space: pre-wrap;\">&lt;Test three=\"anyValue\" /&gt;</code>&nbsp;then you can easily get this value in child component.</p>",
           "user": "5dad8d852ccce63cdad9f159",
           "question": "5dafc78a7d164c1bea6e2368",
           "votes": [
             {
               "_id": "5db00bf17dc5164e638c4948",
               "user": "5dad8d852ccce63cdad9f159",
               "value": 1
             }
           ],
           "createdAt": "2019-10-23T07:58:05.859Z",
           "updatedAt": "2019-10-23T08:14:41.089Z",
           "__v": 
         },
         {
           "_id": "5db00aa67dc5164e638c4937",
           "answer": "<p style=\"background-color: rgb(250, 250, 250);\">By default, QEditor offers most if not all the commands you’d need in a WYSIWYG editor: bold, italic, strike, underline, unordered (list), ordered (list), subscript, superscript, link,</p><p style=\"background-color: rgb(250, 250, 250);\">fullscreen, quote, left (align), center (align), right (align), justify (align), print, outdent, indent, removeFormat, hr, undo, redo, h1 to h6, p (paragraph), code (code paragraph), size-1&nbsp;</p><p style=\"background-color: rgb(250, 250, 250);\">to size-7.</p><p style=\"background-color: rgb(250, 250, 250);\">Each of these commands is pre-configured with icons and their own internationalized tooltips. However, if you want to override some of their settings you can do so with the&nbsp;</p><p style=\"background-color: rgb(250, 250, 250);\">help of definitions Object property.</p>",
           "user": "5dad8d852ccce63cdad9f159",
           "question": "5dafc78a7d164c1bea6e2368",
           "votes": [
             {
               "_id": "5db00be47dc5164e638c4946",
               "user": "5dad8d852ccce63cdad9f159",
               "value": -1
             }
           ],
           "createdAt": "2019-10-23T08:09:10.189Z",
           "updatedAt": "2019-10-23T08:14:37.382Z",
           "__v": 0
         }
       ],
   	...
   ```

   

   

   

2. ### GET /question/user/

   require an user token as a headers.

   **response success** 200

   response all question post by user(token)

   ```JSON
   [
     {
       "tags": [
         "angular ",
         "javascript "
       ],
       "answer": [
         {
           "_id": "5db0080d7dc5164e638c4932",
           "answer": "<p style=\"margin-bottom: 1em; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inher .... his value in child component.</p>",
           "user": "5dad8d852ccce63cdad9f159",
           "question": "5dafc78a7d164c1bea6e2368",
           "votes": [
             {
               "_id": "5db00bf17dc5164e638c4948",
               "user": "5dad8d852ccce63cdad9f159",
               "value": 1
             }
           ],
           "createdAt": "2019-10-23T07:58:05.859Z",
           "updatedAt": "2019-10-23T08:14:41.089Z",
           "__v": 0
         },
         {
           "_id": "5db009227dc5164e638c4934",
           "answer": "<p style=\"marg ... ity&nbsp;<em>might still be visible</em>&nbsp;to:</p>",
           "user": "5dad8d852ccce63cdad9f159",
           "question": "5dafc78a7d164c1bea6e2368",
           "votes": [
             {
               "_id": "5db00c127dc5164e638c494a",
               "user": "5dad8d852ccce63cdad9f159",
               "value": -1
             },
             {
               "_id": "5db05ae9c2e30a6759a13cd4",
               "user": "5dad64f2f60e612aa36b256a",
               "value": -1
             }
           ],
           "createdAt": "2019-10-23T08:02:42.245Z",
           "updatedAt": "2019-10-23T13:51:38.690Z",
           "__v": 0
         },
         {
           "_id": "5db00aa67dc5164e638c4937",
           "answer": "<p style=\"back .... t property.</p>",
           "user": "5dad8d852ccce63cdad9f159",
           "question": "5dafc78a7d164c1bea6e2368",
           "votes": [
             {
               "_id": "5db00be47dc5164e638c4946",
               "user": "5dad8d852ccce63cdad9f159",
               "value": -1
             }
           ],
           "createdAt": "2019-10-23T08:09:10.189Z",
           "updatedAt": "2019-10-23T08:14:37.382Z",
           "__v": 0
         }
       ],
       "_id": "5dafc78a7d164c1bea6e2368",
       "title": "angular something",
       "question": "<div clas....
       ...
     }
    ]
   ```

   **response error** 403

   ```JSON
   {
     "message": "authentication error"
   }
   ```

   

3. POST /question/

   create question

   require body : title, question, and tags(optional)

   require headers : token

   

   response success 201

   ```JSON
   {
     "tags": [],
     "answer": [],
     "_id": "5db10b9da5743e0e18ce6522",
     "title": "test4",
     "question": "test4",
     "user": "5dad64f2f60e612aa36b256a",
     "votes": [],
     "createdAt": "2019-10-24T02:25:33.065Z",
     "updatedAt": "2019-10-24T02:25:33.065Z",
     "__v": 0
   }
   ```

   response fail 422 or 403

   ```JSON
   {
     "message": [
       "question required"
     ]
   }
   or
   {
     "message": "authentication error"
   }
   ```

4. ### PATCH /question/:id

   require params : question id

   require body : updated data ( title , question, and tags)

   **response success** 200

   ```JSON
   {
     "message": "update question success",
     "updated": {
       "n": 1,
       "nModified": 1,
       "ok": 1
     }
   }
   ```

   **response fail** 404 or 403

   ```JSON
   {
     "message": "data not found"
   },
   {
     "message": "authentication error"
   }
   ```

5. ### PATCH /question/upvote/:id

   require params : question id,

   require headers : user token

   

   **response success** 200

   ```json
   {
     "message": "upvotes success",
     "updated": {
       "n": 1,
       "nModified": 1,
       "ok": 1
     }
   }
   ```

   **response fail** 404 or 403

   ```JSON
   {
     "message": "data not found"
   },
   {
     "message": "authentication error"
   }
   ```

   

6. ### PATCH /question/downvote/:id

   require params : question id,

   require headers : user token

   

   **response success** 200

   ```JSON
   {
     "message": "downvote success",
     "updated": {
       "n": 1,
       "nModified": 1,
       "ok": 1
     }
   }
   ```

   **response fail** 404 or 403

   ```JSON
   {
     "message": "data not found"
   },
   {
     "message": "authentication error"
   }
   ```

7. ### DELETE /question/:id

   require params : question id

   require headers : user token

   **response success** 200

   ```JSON
   {
     "message": "delete question success",
     "deleted": {
       "n": 1,
       "ok": 1,
       "deletedCount": 1
     }
   }
   ```

   **response fail** 404 or 403

   ```JSON
   {
     "message": "data not found"
   },
   {
     "message": "authentication error"
   }
   ```

   

8. ### GET /question/tag

   did not require any params, body, or headers

   return trending 4 tags

   **response success** 200

   ```JSON
   [
     {
       "_id": "javascript ",
       "count": 6
     },
     {
       "_id": "html ",
       "count": 2
     },
     {
       "_id": "angular ",
       "count": 1
     },
     {
       "_id": "js ",
       "count": 1
     }
   ]
   ```

   **response fail** 500

   ```JSON
   {
   	"message" : "internal server error"
   }
   ```

   