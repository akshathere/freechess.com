import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
// import Landing from './screens/Landing';
import Game from './screens/Game';
import Chooser from './screens/Chooser';
import Signin from './screens/Signin';

function App() {
  // Function to check if the user is signed in
  const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return !!localStorage.getItem('token'); // For example, check for a token in localStorage
  };

  // PrivateRoute component for protected routes
  const PrivateRoute = ({ element } :{ element:JSX.Element}) => {
    return isAuthenticated() ? element : <Navigate to="/signin" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<PrivateRoute element={<Game />} />} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<PrivateRoute element={<Chooser />} />} /> 

        {/* Protect the Game route with PrivateRoute */}
        <Route path="/game" element={<PrivateRoute element={<Game />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
