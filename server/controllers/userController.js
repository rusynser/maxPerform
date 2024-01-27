// controllers/userController.js
import User from '../dao/userDao.js';
import bcrypt from 'bcrypt';
import session from 'express-session';

export const registerUser = async (req, res) => {
    try {
        const { username, password, userRole = 'user' ,email} = req.body; // Default role is 'user'
        // Check if the user already exists
        const existingUser = await User.findUserByUsername(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' }); // 409 Conflict
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.createUser({email, username, password: hashedPassword, role: userRole });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findUserByUsername(email);

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            req.session.role = user.role;
            // In a real app, you should issue a token (e.g., JWT)
            console.log(user.role);
            res.json({ message: 'Login successful',userId: user._id,userRole:user.role });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Error occurred during logout');
        } else {
            res.send('Logout successful');
        }
    });
};