import './App.css';
import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav'
import Home from './components/Nav/Home'

function App() {
	return (
		<div className="App">
			<h1>Henry Food</h1>
      <Route path='/' component={Nav}/>
      <Route exact path='/home' component={Home}/>
		</div>
	);
}

export default App;
