const errorhandler = (err,req,res,next) => {
  
  if (err.name === 'ValidationError'){
    
    let errArr = []
    if (err.errors) {
      for (const key in err.errors){
        errArr.push(err.errors[key].message)
      }
    }
    console.log(errArr);
    res.status(400).json(errArr)
  } else if (err.name === 'Email already in use'){
      let msg = 'Email already in use'
    res.status(400).json({msg})
  } else if (err.name === 'Email/password wrong'){
    let msg = 'Email/password wrong'
  res.status(403).json({msg})
  } else if (err.name === 'JsonWebTokenError') {
    let msg = 'You are not authorize'
    res.status(401).json(msg)
  } else {
    console.log(err);
    res.status(400).json(err)
  }

  

}


module.exports = errorhandler
