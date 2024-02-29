import { auth } from '@/firebase'
import { registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuthState } from '../stores/auth.store'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import ErrorMessage from '../error/error'
import FillLoading from '../fill-loading/fill-loading'
import { useUserState } from '../stores/user.store'

const Register = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const { setAuth } = useAuthState()
	const navigate = useNavigate()
	const {setUser} = useUserState()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '' },
	})

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const { email, password } = values
		setLoading(true)
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password)
			setUser(res.user)
			navigate('/')
			console.log('success')
		} catch (error) {
			const result = error as Error
			setError(result.message)
			console.log('error')
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className='flex flex-col'>
				{
			loading && 	<FillLoading />
		}
			<h2 className='text-xl font-bold'>Register</h2>
			<p className='text-muted-foreground'>
				Already have an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('login')}
				>
					Sign in
				</span>
			</p>
			<Separator className='my-3' />
			{error && <ErrorMessage />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										disabled={loading}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-2 gap-2'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='****'
											type='password'
											disabled={loading}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											placeholder='****'
											type='password'
											disabled={loading}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type='submit' className='h-12 w-full'>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default Register
