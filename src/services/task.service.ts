import { auth, db } from '@/firebase'
import { ITaskData, iTask } from '@/types'
import { collection, getDocs, query, where } from 'firebase/firestore'
import {
	endOfMonth,
	endOfWeek,
	isWithinInterval,
	startOfMonth,
	startOfWeek,
} from 'date-fns'

export const TaskServie = {
	getTask: async () => {
		let weekTotal = 0
		let monthTotal = 0
		let total = 0

		const now = Date.now()
		const weekStart = startOfWeek(now)
		const weekEnd = endOfWeek(now)
		const monthStart = startOfMonth(now)
		const monthEnd = endOfMonth(now)

		const q = query(
			collection(db, 'task'),
			where('userID', '==', auth.currentUser?.uid)
		)
		const querySnapshot = await getDocs(q)

		querySnapshot.docs.forEach(doc => {
			const data = doc.data()
			const taskDate = new Date(data.starTime)
			const taskTime = data.totalTime || 0
			if (isWithinInterval(taskDate, { start: weekStart, end: weekEnd })) {
				weekTotal += taskTime
			}
			if (isWithinInterval(taskDate, { start: monthStart, end: monthEnd })) {
				monthTotal += taskTime
			}
			weekTotal += taskTime
			monthTotal += taskTime
			total += taskTime
		})
		const task = querySnapshot.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		})) as iTask[]
		const taskData: ITaskData = {
			task,
			weekTotal,
			monthTotal,
			total,
		}

		return taskData
	},
}
