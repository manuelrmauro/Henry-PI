import './App.css';
import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Welcome from './components/Welcome/Welcome';

function App() {
	return (
		<div className="App">
			<h1>
			</h1>
      <Route exact path='/' component={Welcome}/>
      <Route path='/home' component={Nav}/>
      <Route exact path='/home' component={Home}/>
		</div>
	);
}

export default App;
