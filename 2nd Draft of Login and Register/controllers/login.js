const jwt  = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "Please Enter your Email and password" });
    else {
        db.query('SELECT email FROM users WHERE email = ?', async (Err, result) => {
            if (Err) throw Err;
            if (!result[0] || !await bcrypt.compare(password, result[0].password)) return res.json({ status: "error",
        error: "Incorrect Email or password" })
        else {
            const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES,
                httpOnly: true
            })
            const cookieOptions = {
                expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("userRegistered", token, cookieOptions);
            return res.json({ status: "success", success: "User has been logged In" });
        }
        })
    }
}

module.exports = login;