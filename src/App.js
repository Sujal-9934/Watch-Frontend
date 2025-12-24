import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
import Maps from 'pages/Maps';
import CardShowcase from 'pages/CardShowcase';
import Footer from 'components/Footer';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';


// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!isAuthPage && <Sidebar />}
            <div className={!isAuthPage ? 'md:ml-64' : ''}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    {token && (
                        <>
                            <Route exact path="/Dashboard" component={Dashboard} />
                            <Route exact path="/settings" component={Settings} />
                            <Route exact path="/tables" component={Tables} />
                            <Route exact path="/maps" component={Maps} />
                            <Route exact path="/cards" component={CardShowcase} />
                        </>
                    )}
                    <Redirect exact from="/" to={token ? '/Dashboard' : '/login'} />
                    <Redirect to={token ? '/Dashboard' : '/login'} />
                </Switch> 
                {!isAuthPage && <Footer />}
            </div>
        </>
    );
}

export default App;
