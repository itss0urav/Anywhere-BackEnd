


//Controller for login user
function loginController(req, res){
    res.send({
        name:"Nikesh Kumar"
    })

}



function logoutController(req, res){
    res.send("Login out ...")
}



module.exports = {loginController, logoutController}