module.exports =
    (err, req, res, next) => {
        const statusCode = err.status || 500
        const errorMessage = err.msg || 'Internal Server Error'
        if (err.msg === "Incorrect Email / Password") {
            res.status(400).json(err)
        } else if (err.name === "ValidationError") {
            let errors = []
            for (let key in err.errors) {
                errors.push(err.errors[key].message)
            }
            res.status(400).json({ errors })
        } else {
            res.status(statusCode).json({msg: errorMessage})
        }
    }