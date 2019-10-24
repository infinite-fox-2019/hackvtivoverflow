module.exports = (err,req,res,next) => {
    console.log(err)
    if(err.name == 'ValidationError'){
        res.status(403).json({ msg: 'Validation Error Please check your input' })
    }else if(err.code == 11000){
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
    }
    else {
        res.status(500).json(err)
    }
}