// ...existing code...
const oracledb = require('oracledb');
const oracledb = require('oracledb');
const bcrypt = require('bcrypt');
const oracledb = require('oracledb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection } = require('./db'); // adjust if your connection helper is elsewhere

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15; // minutes

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required."});
    }

    let connection;
    try {
        connection = await getConnection();
        console.log("✅ Connected to Oracle!");

        const result = await connection.execute(
            `SELECT id, password_hash, failed_attempts, locked_until
             FROM users WHERE username = :1`,
            [username],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (!result || !result.rows || result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password."});
        }

        const user = result.rows[0];
        const storedHash = user.PASSWORD_HASH || user.password_hash || user.passwordHash;
        const lockedUntil = user.LOCKED_UNTIL || user.locked_until || null;

        // if account locked
        if (lockedUntil) {
            const lockedDate = new Date(lockedUntil);
            if (lockedDate > new Date()) {
                const minutesLeft = Math.ceil((lockedDate - new Date()) / 60000);
                return res.status(403).json({ message: `Account locked. Try again in ${minutesLeft} minute(s).`});
            }
        }

        if (!storedHash) {
            return res.status(401).json({ message: "Invalid username or password."});
        }

        const valid = await bcrypt.compare(password, storedHash);
        if (!valid) {
            // increment failed_attempts and set lock if threshold reached
            await connection.execute(
                `UPDATE users
                 SET failed_attempts = NVL(failed_attempts,0) + 1,
                     locked_until = CASE WHEN NVL(failed_attempts,0) + 1 >= :max
                                         THEN SYSTIMESTAMP + NUMTODSINTERVAL(:minutes,'MINUTE')
                                         ELSE locked_until END
                 WHERE id = :id`,
                { max: MAX_ATTEMPTS, minutes: LOCK_MINUTES, id: user.ID || user.id },
                { autoCommit: true }
            );

            return res.status(401).json({ message: "Invalid username or password."});
        }

        // successful login: reset counters and update last_login
        await connection.execute(
            `UPDATE users
             SET failed_attempts = 0,
                 locked_until = NULL,
                 last_login = SYSTIMESTAMP
             WHERE id = :id`,
            { id: user.ID || user.id },
            { autoCommit: true }
        );

        const userId = user.ID || user.id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error logging in."});
    } finally {
        if (connection) await connection.close();
    }
};