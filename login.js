exports.login = async (req, res) => {

    const { username, password } = req.body;    
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required."});
    }
    let connection;
    try {
        console.log("Attempting to connect to Oracle DB...");
        connection = await getConnection();
        console.log("✅ Connected to Oracle!");
        const result = await connection.execute(
            "SELECT id, password_hash FROM users WHERE username = :1",
            [username]
        );

        if (!result || !result.rows || result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password."});
        }

        const user = result.rows[0];
        // Oracle may return columns in upper-case keys depending on driver settings
        const storedHash = user.PASSWORD_HASH || user.password_hash || user.passwordHash;
        const valid = await bcrypt.compare(password, storedHash);
        if (!valid) {
            return res.status(401).json({ message: "Invalid username or password."});
        }   
        const userId = user.ID || user.id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        
    } catch (err){
        console.error(err);
        res.status(500).json({ message: "Error logging in."});
    } finally {
        if (connection) await connection.close();
    }
};