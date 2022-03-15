import './App.css';
import Router from './router/Router';
import { CartProvider } from './context/CartContext';

function App() {
	return (
		<div className="App">
			<CartProvider>
				<Router />
			</CartProvider>
		</div>
	);
}

export default App;
