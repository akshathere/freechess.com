const jwt=require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use your JWT secret here

export function extractAuthUser(token: string | undefined): { id: string, email: string } | null {
    if (!token) {
        console.error('Token not provided');
        return null;
    }

    try {
        // Verify the token and return the decoded user data
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
        return decoded; // Return the decoded user data (id and email)
    } catch (error :any) {
        console.error('Invalid token:', error.message);
        return null; // Return null if the token is invalid or expired
    }
}
