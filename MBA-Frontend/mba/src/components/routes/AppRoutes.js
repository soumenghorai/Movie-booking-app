import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Auth/Auth';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;