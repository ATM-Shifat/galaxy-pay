import pkg from 'json-server'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

import { generateId, generateAccount, hashPassword} from './utilities/utilities.js'

const server = pkg.create()
const middlewares = pkg.defaults()
const router = pkg.router('server/data-base.json')

const secrete = process.env.SECRETE_KEY

const port = process.env.VUE_APP_SERVER_PORT || 5000

server.use(middlewares)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))


server.use((req,res, next) => {
    if(req.path !== '/login' && req.path !== '/signup'){
        try{
            const token = req.headers['authorization']
            if(token){
                jwt.verify(token, secrete, (err, decoded) => {
                    if(err){
                        return res.status(401).json({error: "Invalid token"})
                    }else{
                        req.user = decoded
                        next()
                    }
                })
            }else{
                res.status(403).json({error: "No token provided"})
            }

        }catch(error){
            console.error('Error:', error)
            res.status(500).json({error: 'Internal server error'})
        }
    }else{
        next()
    }
})

server.post('/signup', (req, res) =>{
    try{
        const { name, email, phone, password} = req.body

        const db = router.db
        const user = db.get("users").find({email}).value()

        if(user)
             res.status(403).json({error: "Email already exists"})
        else{
            const id = generateId()
            const hashedPassword = hashPassword(password)
            const account = generateAccount({
                email: email,
                password: hashedPassword,
                name: name,
                phone: phone
            })

            const transactions = []
            const balance = 0

            db.get("users").push({
                id, 
                email, 
                hashedPassword, 
                name, 
                account, 
                balance, 
                phone,
                transactions
            }).write()

            return res.status(201).json({message: 'User created successfully'})

        }
    }catch(error){
        console.error('Error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

server.post('/login', (req, res) => {
    try{
        const {email, password} = req.body
        const hashedPassword = hashPassword(password)
        const db = router.db
        const user = db.get("users").find({email, hashedPassword}).value()

        if(user){
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: 'user'
            },secrete)

            res.status(200).json({
                token: token, 
                user: user.id, 
                message: "Logged in successfully"
            })
        }else{
            res.status(401).json({error: "Invalid credentials"})
        }

    }catch(error){
        console.error('Error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
})


server.use(router)
server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})