import router from '../router'
function errorHandler(err){
    let errorMessage = null
    if(err.response){
        errorMessage = err.response.data.message
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${errorMessage}`
        })
        if(errorMessage == 'You need to login first' || errorMessage == "You've been idle for too long. Please log in again"){
            alert('')
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            router.push('/auth')
        }
    }else if(err.request){
        errorMessage = `500 Internal Server Error`
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${errorMessage}`
        })
    }else {
        console.log(err.message)
    }
}

export default errorHandler