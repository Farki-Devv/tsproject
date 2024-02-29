import  { ReactNode, useEffect, useState } from 'react'
import { useUserState } from '../stores/user.store'
import { auth } from '@/firebase'
import FillLoading from '../fill-loading/fill-loading'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setUser } = useUserState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			user && setUser(user)
			setIsLoading(false)
		})
	}, [])
	return isLoading ? <FillLoading /> : <>{children}</>
}

export default AuthProvider
