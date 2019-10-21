module.exports = (err, req, res, next) => {
  console.log(err.name)
  let messages = []
  console.log(err)
  if(err.name === 'MongoError') {
    err.status = 400
    let key = err.errmsg.split('key: { ')[1].split(':')[0]
    if(key === 'email') {
      messages.push('Email already registered.')
    }
  } else if(err.name === 'ValidationError') {
    err.status = 400
    for(let field in err.errors) {
      messages.push(err.errors[field].message)
    }
  }
  res.status(err.status || 500).json({ messages: messages.length > 0 ? messages : 'Something went wrong in the server'})
}