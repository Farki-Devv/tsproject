import { User } from 'firebase/auth'
import { create } from 'zustand'

type userType = User | null

interface IUserStateStore {
	isLoading: boolean
	user: userType
	setUser: (user: userType) => void
}

export const useUserState = create<IUserStateStore>(set => ({
	isLoading: true,
	user: null,
	setUser: user => set({ user }),
}))
