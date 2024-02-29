import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useNavigate } from 'react-router-dom'
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { auth } from '@/firebase'
import { useState } from 'react'
import FillLoading from '../fill-loading/fill-loading'

const Social = () => {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const onGoogle = () => {
		setLoading(true)
		const googleProvider = new GoogleAuthProvider()
		signInWithPopup(auth, googleProvider)
			.then(() => {
				navigate('/')
			})
			.finally(() => {
				setLoading(false)
			})
	}
	const onGithub = () => {
		setLoading(true)
		const githubProvider = new GithubAuthProvider()
		signInWithPopup(auth, githubProvider)
			.then(() => {
				navigate('/')
			})
			.finally(() => {
				setLoading(false)
			})
	}
	return (
		<>
			<Separator className='my-3' />
			{loading && <FillLoading />}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
				<Button
					className='h-12'
					variant={'secondary'}
					disabled={loading}
					onClick={onGithub}
				>
					<FaGithub className='mr-2' />
					<span>Sign in with Github</span>
				</Button>
				<Button
					className='h-12'
					variant={'destructive'}
					disabled={loading}
					onClick={onGoogle}
				>
					<FaGoogle className='mr-2' />
					<span>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
