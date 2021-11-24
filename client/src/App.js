import './App.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Welcome from './components/Welcome/Welcome';
import AddForm from './components/AddForm/AddForm';
import CardDetails from './components/CardDetails/CardDetails';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
	return (
		<div className="App">
				<Route path="/app" component={Nav} />
			<Switch>
				<Route exact path="/" component={Welcome} />
				<Route exact path="/app" component={Home} />
				<Route exact path="/app/add" component={AddForm} />
				<Route
					exact
					path="/app/recipe/:id"
					render={(match) => <CardDetails match={match.match} />}
				/>
				<Route path='*' component={ErrorPage} />
			</Switch>
		</div>
	);
}

export default App;
