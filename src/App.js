import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
import Maps from 'pages/Maps';
import Footer from 'components/Footer';
import Login from 'components/auth/Login';


// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const showShell = location.pathname !== '/login';

    return (
        <>
            {showShell && <Sidebar />}
            <div className={showShell ? 'md:ml-64' : ''}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/Dashboard" component={Dashboard} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/tables" component={Tables} />
                    <Route exact path="/maps" component={Maps} />
                    <Redirect exact from="/" to={token ? '/Dashboard' : '/login'} />
                    <Redirect to={token ? '/Dashboard' : '/login'} />
                </Switch>
              {showShell && <Footer />}
            </div>
        </>
    );
}

export default App;
