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
    if(req.path !== '/log-in' && req.path !== '/sign-up'){
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

server.post('/sign-up', (req, res) =>{
    try{
        const  { name, email, phone, sentPassword} = req.body

        const db = router.db
        const user = db.get("users").find({email}).value()

        if(user)
             res.status(403).json({error: "Email already exists"})
        else{
            const id = generateId()

            const password = hashPassword(sentPassword)

            const account = generateAccount({
                email: email,
                password: password,
                name: name,
                phone: phone
            })

            const transactions = []
            const balance = "500"

            db.get("users")
            .push({
                id: id, 
                email: email,  
                password: password, 
                name: name, 
                account: account, 
                balance: balance, 
                phone: phone,
                transactions: transactions
            })
            .write()

            return res.status(201).json({message: 'User created successfully'})

        }
    }catch(error){
        console.error('Error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

server.post('/log-in', (req, res) => {
    try{
        const {email, sentPassword} = req.body

        const password =  hashPassword(sentPassword)
        
        const db = router.db
        const user = db.get("users").find({email, password}).value()

        
        if(user){
            const token = jwt.sign({
                id: user.id,
                account: user.account,
                email: user.email,
                role: 'user'
            },secrete)
            const {id, password, ...userInfo} = user
            res.status(200).json({
                token: token,
                account: user.account,
                user: userInfo,
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


// server.get('/get-balance', (req, res) => {
//     try{
//         const {account} = req.query
//         const db = router.db
//         const user = db.get("users").find({account}).value()

//         if(user)
//             res.status(200).json({balance: user.balance})
//         else
//             res.status(404).json({error: 'User not found!'})
//     }catch(error){
//         console.error('Error:', error)
//         res.status(500).json({error: 'Internal server error'})
//     }
// })

server.post('/transfer-funds', (req, res) => {
    try{
        const {from , to, amount} = req.body

        if(from === to)
            return res.status(400).json({error: "Can not send funds to own account"})
        const db = router.db

        const fromUser = db.get("users").find({account: from}).value()
        const toUser = db.get("users").find({account: to}).value()

        if(!fromUser || !toUser)
            return res.status(404).json({error: "User not found"})
        if(Number(fromUser.balance) < Number(amount))
            return res.status(403).json({error: "Insufficient balance"})

        const timeStamp = new Date().toISOString()

        const transactionFrom = {
            id: generateId(),
            amount: String(amount),
            from: fromUser.account,
            to: toUser.account,
            timestamp: timeStamp
        }

        const transactionTo = {
            id: generateId(),
            amount: String(amount),
            from: fromUser.account,
            to: toUser.account,
            timestamp: timeStamp
        }

        db.get('users')
        .find({account: from})
        .assign({balance: String(Number(fromUser.balance).toFixed(2) - Number(amount).toFixed(2))})
        .get("transactions")
        .unshift(transactionFrom)
        .write()

        db.get('users')
        .find({account: to})
        .assign({balance: String(Number(toUser.balance).toFixed(2) + Number(amount).toFixed(2))})
        .get("transactions")
        .unshift(transactionTo)
        .write()
        

        res.status(200).json({message: "Fund transfer complete"})


    }catch(error){
        console.log("Failed to transfer funds", error)
        res.status(500).json({error: 'Internal server error'})
    }
})


// server.get('/get-transactions', (req, res) =>{
//     try{
//         const {account} = req.query

//         const db = router.db

//         const user = db.get("users").find({account}).value()

//         if(user){
//             res.status(200).json({
//                 transactions: user.transactions
//             })
//         }else{
//             res.status(404).json({error: 'User not found!'})
//         }
//     }catch(error){
//         console.error('Error:', error)
//         res.status(500).json({error: 'Internal server error'})
//     }
// })

server.get('/get-profile', (req, res) => {
    try{
        const {account} = req.query

        const db = router.db

        const user = db.get('users').find({account: account}).value()

        if(user){
            const {id, password, ...userInfo} = user
            res.status(200).json({
                user: userInfo
            })
        }else
            res.status(404).json({
                error: 'User not found!'
            })

    }catch(error){
        console.error('Error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

server.use(router)
server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})