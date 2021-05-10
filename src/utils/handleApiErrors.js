export function handleApiErrors(error) {
    console.error(error.response)
    if(typeof error.response.data){
        if(error.response.data.details && error.response.data.details.body ){
            if(error.response.data.details.body.length > 0 && error.response.data.details.body[0].message){
                return error.response.data.details.body[0].message;
            }
        }
    }
    if(error.response && error.response.data){
        if(error.response.data && error.response.data.message){
            return (error.response.data.message);
        }
    }
    return "somethings was wrong"
}