import './App.css';
import Index from './containers/Index';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserRoute from './components/UserRoute';
import ProductDetails from './components/ProductDetails';
import ProductListing from './components/ProductListing';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Index} />
          <Route exact path="/" component={ProductListing} />
          <Route path="/product/:productId" component={ProductDetails} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
