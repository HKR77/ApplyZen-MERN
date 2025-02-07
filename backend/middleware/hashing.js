const bcrypt = require('bcrypt')

async function hashPassword(password) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Password hashing error:", error);
        // Re-throw the error to be handled by the caller
    }

}

module.exports = hashPassword;