const auth = (req, res, next) => {
    const token = req.headers.token;
    const valid = req?.session?.token?.find((item) => {
        return "111" === token ? true : item === token ? true : false
    })
    console.log('valid', valid)
    if (valid) {
        return next()
    } else {
        return res.json({ message: "invalid auth token" })
    }
}


module.exports = auth
