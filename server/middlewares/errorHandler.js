module.exports = (err,req,res,next) => {
  console.log(err.kind)
  if(err.errors && err.errors.password) {
    res.status(400).json({msg: err.errors.password.message})
  } else if(err.errors && err.errors.username) {
    res.status(400).json({msg: err.errors.username.message})
  } else if(err.errors && err.errors.email) {
    res.status(400).json({msg: err.errors.email.message})
  } else if(err.errors && err.errors.title) {
    res.status(400).json({msg: err.errors.title.message})
  } else if(err.errors && err.errors.description) {
    res.status(400).json({msg: err.errors.description.message})
  } else if(err.errors && err.errors.response) {
    res.status(400).json({msg: err.errors.response.message})
  } else if(err.code == 11000){
    res.status(403).json({ msg: 'Email allready used!' })
  }else if(err.msg == 'wrong'){
    res.status(403).json({ msg: 'username/password wrong!' })
  }else if(err.msg == 'annon'){
    res.status(404).json({ msg: 'email doesn\'t exists' })
  }else if(err.msg == 'authen') {
    res.status(403).json({ msg: 'Authentication Error!' })
  }else if(err.msg == 'author') {
    res.status(403).json({ msg: 'Authorization Error' })
  }else if(err.msg == 'upspam' || err.msg == 'downspam') {
    res.status(403).json({ msg: 'Spam detected!'})
  }else if(err.msg == '0Q') {
    res.status(404).json({ msg: 'Question not Found!'})
  }else if(err.msg == '0A') {
    res.status(404).json({ msg: 'Answer not Found!'})
  }else if(err.kind == 'ObjectId'){
    res.status(403).json({ msg: 'objectId'})
  }else if(err.msg == 'not found') {
    res.status(400).json({ msg: 'Sorry, your request not Found!'})
  }
  else {
    res.status(500).json(err)
  }
}