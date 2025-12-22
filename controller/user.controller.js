import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const handleUserSignup = async (req, res) => {
    const body = req.body;

    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }

    try {
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = await User.create({ ...body, password: hashedPassword });
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );
        
        return res.status(201).json({ 
            message: 'User created successfully', 
            success: true, 
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }, 
            token: token 
        }); 
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
    }
}

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required', success: false });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: 'Login successful',
            success: true,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
    }
}