import pkg from 'json-server'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

const server = pkg.create()
const middlewares = pkg.defaults()
const router = pkg.router('data-base.json')

const secrete = process.env.SECRETE_KEY

const port = process.env.VUE_APP_SERVER_PORT || 5000

server.use(middlewares)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))


server.use((req,res, next) => {
    if(req.path !== '/log-in' && req.path !== '/sign-up'){
        try{
            const token = req.headers['authorization']
            if(token){
                jwt.verify(token, secrete, (err, decoded) => {
                    if(err){
                        return res.status(401).json({error: "Invalid Token"})
                    }else{
                        req.user = decoded
                        next()
                    }
                })
            }else{
                res.status(403).json({error: "No Token Provided"})
            }

        }catch(error){
            console.error('Error:', error)
            res.status(500).json({error: 'Internal Server Error'})
        }
    }else{
        next()
    }
})


server.use(router)
server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})