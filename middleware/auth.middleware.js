import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import dotenv from 'dotenv';
dotenv.config();
    
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized', success: false });
        }
        
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized', success: false });
        }
        
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        if (!verifiedToken) {
            return res.status(401).json({ message: 'Unauthorized', success: false });
        }
        
        const verifiedUser = await User.findById(verifiedToken.userId).select('-password');
        if (!verifiedUser) {
            return res.status(401).json({ message: 'Unauthorized', success: false });
        }
        
        req.user = verifiedUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', success: false, error: error.message });
    }
}
export default verifyToken;