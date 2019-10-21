module.exports = function(err, req, res, next) {
  console.log(err)
  if(err.message === "Post validation failed: title: Title is required"){
    err.msg = "Title is required"
  }
  else if(err.message === "Post validation failed: content: Content is required to save"){
    err.msg = "Content cannot be empty"
  }
  else if(err.message === "User validation failed: email: Please enter a valid e-mail address"){
    err.msg = "Your email is invalid"
  }
  res.status(err.status || 500).json({message: err.msg || 'Internal Server Error'})
}
