module.exports = (err, req, res, next) => {
  console.log(err.name)
  let messages = []
  console.log(err)
  if(err.code === 11000) {
    err.status = 400
    let field = Object.keys(err.keyPattern)[0]
    messages.push(`${field.charAt(0).toUpperCase()}${field.substring(1)} already registered.`)
  } else if(err.name === 'ValidationError') {
    err.status = 400
    for(let field in err.errors) {
      messages.push(err.errors[field].message)
    }
  } else if(err.name === 'CastError') {
    err.status = 400
    messages.push('Data not found')
  } else if(err.msg) {
    err.status = 400
    messages.push(err.msg)
  }
  res.status(err.status || 500).json({ messages: messages.length > 0 ? messages : 'Something went wrong in the server'})
}