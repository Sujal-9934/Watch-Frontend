import { Switch, Route, Redirect,Routes } from 'react-router-dom';
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
    return (
        <>
            
            <Sidebar />
           <Route exact path="/Login" element={<Login />} />
            <div className="md:ml-64">
                <Switch>
                    {/* <Route exact path="/" component={Dashboard} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/tables" component={Tables} />
                    <Route exact path="/maps" component={Maps} /> */}
                    <Redirect from="*" to="/Login" />
                </Switch> 
              <Footer />
            </div>
        </>
    );
}

export default App;
