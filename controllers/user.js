const zod = require('zod')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const createUSerBody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
})

const user = async (req, res) => {
    console.log('req.session', req.session)

    const users = await userModel.find()
    res.json({ data: users })
}


const userModel = require('../model/user.js')


const createUSer = async (req, res) => {
    const { success } = createUSerBody.safeParse(req.body)
    const { name, email, password } = req.body;

    if (!success) {
        return res.json({ data: [], message: "invalid data", success: false })
    }
    const emailExists = await userModel.find({ email: email })

    if (emailExists.length > 0) {

        return res.json({ data: [], message: "User already exist", success: true })
    }
    const salt = crypto.randomBytes(64).toString('hex')
    const encryptedPassword = crypto.createHmac('sha256', salt).update(password).digest("hex")

    const created = await userModel.create({
        name, email, password: encryptedPassword, salt

    })
    const token = jwt.sign({ id: created._id }, "billa")
    return res.json({ toekn: token, data: [], message: "User Created", success: true })

}

const loginUSer = async (req, res) => {

    const { email, password } = req.body;

    const emailExists = await userModel.findOne({ email: email })
    console.log('emailExists', emailExists)


    if (!emailExists) {
        return res.json({ data: [], message: "User not found. Register first", success: false })
    }
    const hashedPassword = crypto.createHmac('sha256', emailExists.salt).update(password).digest("hex")

    if (hashedPassword != emailExists.password) {
        return res.json({ data: [], message: "ivalid Password", success: false })
    }

    const token = jwt.sign({ id: emailExists._id }, "billa")
    req.session.token = req.session.token ? [token, ...req.session.token] : [token]

    return res.json({ token: token, data: [], message: "loggedin", success: true })

}
const logout = async (req, res) => {
    const token = req.headers.token
    req.session.token = req.session.token.filter((tk) => tk != token)
    res.json({ message: "logged out successfully" })
}



module.exports = { user, createUSer, loginUSer, logout } 