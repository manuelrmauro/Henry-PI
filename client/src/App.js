import './App.css';
import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Welcome from './components/Welcome/Welcome';
import AddForm from './components/AddForm/AddForm';
import CardDetails from './components/CardDetails/CardDetails';

function App() {
	return (
		<div className="App">
			<h1>
			</h1>
      <Route exact path='/' component={Welcome}/>
      <Route path='/app' component={Nav}/>
      <Route exact path='/app' component={Home}/>
			<Route path='/app/add' component={AddForm}/>
			<Route path='/app/:id' render={match => <CardDetails match={match.match}/>}/>
		</div>
	);
}

export default App;
