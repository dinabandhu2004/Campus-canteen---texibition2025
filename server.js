const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Replace with your Google Client ID
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
const JWT_SECRET = 'your_jwt_secret_key'; // Use environment variable in production

// Mock database
const users = [
    {
        id: 1,
        email: 'user@example.com',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRqQDP9y3lH6ZgZssaNSJYJ3J9ZQTW', // "password"
        name: 'Demo User',
        verified: true,
        provider: 'email'
    }
];

app.use(express.json());

// Google authentication endpoint
app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;
    
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const email = payload['email'];
        const emailVerified = payload['email_verified'];
        const name = payload['name'];
        const picture = payload['picture'];
        
        if (!emailVerified) {
            return res.status(401).json({ error: 'Email not verified' });
        }
        
        // Check if user exists in database
        let user = users.find(u => u.email === email);
        
        if (!user) {
            // Create new user (in a real app, you'd save to database)
            user = {
                id: users.length + 1,
                email,
                name,
                picture,
                verified: true,
                provider: 'google'
            };
            users.push(user);
        }
        
        // Create JWT token
        const authToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({
            success: true,
            token: authToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });
        
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Email/password authentication endpoint
app.post('/api/auth/email', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        const user = users.find(u => u.email === email && u.provider === 'email');
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Create JWT token
        const authToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({
            success: true,
            token: authToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});