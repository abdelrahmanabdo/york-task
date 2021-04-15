import { BrowserRouter, Switch,  Route } from 'react-router-dom';
import Header from './components/header';
import Dashboard from './pages/dashboard';
import Classroom from './pages/classroom';
import Student from './pages/student';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <div className="page-content-wrapper">
          <Switch>
            <Route exact path={['/', '']}>
              <Dashboard />
            </Route>
            <Route path="/classrooms/:id">
              <Classroom />
            </Route>
            <Route path="/students/:id">
              <Student />
            </Route>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
