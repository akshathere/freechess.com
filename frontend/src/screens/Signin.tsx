
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle the sign-in process
  async function handleSignup() {
      try {
          // Send email and password to the backend for authentication
          
          const data = JSON.stringify({
              email: email,
              password: password
            });
            console.log(data)
            const response = await axios.post('http://localhost:3000/signin', data, {
              headers: {
                'Content-Type': 'application/json', // Ensure the server knows the payload is JSON
              }
            });
          console.log(response.data)

          const token = response.data.token;
            console.log("token=",token)
          // Store the token in local storage
          localStorage.setItem('token', token);

          // Redirect to "/choose" page after successful login
          navigate("/");
          
      } catch (error) {
          console.error('Error signing in:', error);
          // Optionally handle error (e.g., display error message to the user)
      }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md bg-gray-900 text-white border-red-600">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-500">Sign In</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  type="email"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleSignup}>
            Sign In
          </Button>
          <div className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-red-500 hover:text-red-400">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}