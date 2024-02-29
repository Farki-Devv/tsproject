import FillLoading from '@/components/fill-loading/fill-loading'
import TaskForm from '@/components/form/task-form'
import TaskItem from '@/components/shared/task-item'
import { useUserState } from '@/components/stores/user.store'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/validation'
import { TaskServie } from '@/services/task.service'
import { iTask } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { addMilliseconds, addMinutes, format } from 'date-fns'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { BadgePlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const Dashboard = () => {
	const [isDeleting, setIsDeleting] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [currentTask, setCurrentTask] = useState<iTask | null>(null)
	const { user } = useUserState()
	const { isPending, data, refetch } = useQuery({
		queryKey: ['task-data'],
		queryFn: TaskServie.getTask,
	})
	const [open, setOpen] = useState(false)
	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		return addDoc(collection(db, 'task'), {
			title,
			status: 'unstarted',
			starTime: null,
			endTime: null,
			userID: user?.uid,
		})
			.then(() => refetch())
			.finally(() => setOpen(false))
	}
	const onStartEdting = (task: iTask) => {
		setIsEditing(true)
		setCurrentTask(task)
	}

	const OnUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		if (!currentTask) return null
		const ref = doc(db, 'task', currentTask.id)
		return updateDoc(ref, { title })
			.then(() => refetch())
			.finally(() => setIsEditing(false))
	}

	const onDelete = async (id: string) => {
		setIsDeleting(true)
		const promise = deleteDoc(doc(db, 'task', id))
			.then(() => refetch())
			.finally(() => setIsDeleting(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully deleted!',
			error: 'Something went wrong!',
		})
	}

	const getFormDate = (time: number) => {
		const date = addMilliseconds(new Date(0), time)
		const formattedDate = format(
			addMinutes(date, date.getTimezoneOffset()),
			'HH.mm.ss'
		)

		return formattedDate
	}
	return (
		<div className='h-screen max-w-6xl mx-auto flex items-center justify-center max-md:pt-[16vh] rounded '>
			<div className='grid lg:grid-cols-2 grid-cols-1 px-4 w-full gap-8'>
				<div className='flex flex-col space-y-4'>
					<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
						<div className='text-2xl font-bold '>Trainings</div>
						<Button onClick={() => setOpen(true)}>
							<BadgePlus />
						</Button>

						<Dialog open={open} onOpenChange={setOpen}>
							<DialogContent className=''>
								<AlertDialogHeader>
									<DialogTitle>Create a new task</DialogTitle>
								</AlertDialogHeader>
								<hr />
								<TaskForm
									handler={
										onAdd as (
											values: z.infer<typeof taskSchema>
										) => Promise<void | null>
									}
								/>
							</DialogContent>
						</Dialog>
					</div>
					<hr />
					<div className='w-full  p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative h-[400px]  overflow-y-scroll '>
						{(isPending || isDeleting) && <FillLoading />}
						<div className='flex flex-col space-y-2 w-full '>
							{!isEditing &&
								data &&
								data.task.map(task => (
									<TaskItem
										key={task.id}
										task={task}
										onStartEdting={() => onStartEdting(task)}
										onDelete={() => onDelete(task.id)}
										refetch={refetch}
									/>
								))}
							{isEditing && (
								<TaskForm
									title={currentTask?.title}
									isEdit
									onClose={() => setIsEditing(false)}
									handler={
										OnUpdate as (
											values: z.infer<typeof taskSchema>
										) => Promise<void | null>
									}
								/>
							)}
						</div>
					</div>
				</div>

				<div className='flex flex-col space-y-4  w-full'>
					<div className='p-4 rounded-md bg-gradient-to-tr from-blue-600 to-yellow-400 reletive h-24'>
						{isPending ? (
							<FillLoading />
						) : (
							data && (
								<>
									<div className='text-2xl font-bold'>Total week</div>
									<div className='text-3xl font-bold'>
										{getFormDate(data.weekTotal)}
									</div>
								</>
							)
						)}
					</div>
					<div className='p-4 rounded-md bg-gradient-to-tr from-green-400 to-orange-400 reletive h-24'>
						{isPending ? (
							<FillLoading />
						) : (
							data && (
								<>
									<div className='text-2xl font-bold'>Total month</div>
									<div className='text-3xl font-bold'>
										{getFormDate(data?.weekTotal)}
									</div>
								</>
							)
						)}
					</div>
					<div className='p-4 rounded-md bg-gradient-to-tr from-blue-400 to-pink-400 reletive h-24'>
						{isPending ? (
							<FillLoading />
						) : (
							data && (
								<>
									<div className='text-2xl font-bold'>Total time</div>
									<div className='text-3xl font-bold'>
										{getFormDate(data.weekTotal)}
									</div>
								</>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
