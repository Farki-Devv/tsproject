import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Home from './pages/home'
import Auth from './pages/auth'
import NotFoundPage from './components/not-found/error'
import Dashboard from './pages/dashboard'
import { Toaster } from './components/ui/sonner'

const App = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Toaster />
		</div>
	)
}

export default App
