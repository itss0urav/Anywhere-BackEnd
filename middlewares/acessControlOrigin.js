
const alloAcessControl = async(req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173/login')
}

module.exports = alloAcessControl