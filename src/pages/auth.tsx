import Login from '@/components/auth/login'
import Register from '@/components/auth/register'
import Social from '@/components/auth/social'
import { useAuthState } from '@/components/stores/auth.store'
import { Card } from '@/components/ui/card'

const Auth = () => {
	const { authState } = useAuthState()
	return (
		<div className='w-full h-screen bg-gradient-to-t from-foreground to-background flex items-center justify-center max-md:px-10 rounded'>
			<Card className='p-8 lg:w-1/3 md:w-1/2 w-full relative'>
				{authState === 'login' && <Login />}
				{authState === 'register' && <Register />}
				<Social />
			</Card>
		</div>
	)
}

export default Auth
