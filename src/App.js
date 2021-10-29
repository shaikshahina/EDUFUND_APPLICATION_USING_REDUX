import './App.css';
import Index from './containers/Index';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import UserRoute from './components/UserRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Index} />
          <UserRoute exact path="/" component={Home} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
