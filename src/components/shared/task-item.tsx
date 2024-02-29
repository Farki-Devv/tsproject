import { db } from '@/firebase'
import { ITaskData, iTask } from '@/types'
import { ReloadIcon } from '@radix-ui/react-icons'
import { QueryObserverResult } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { CheckCircle2, Edit2, Pause, Trash } from 'lucide-react'
import { useMemo, useState } from 'react'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlinePlayCircleOutline } from 'react-icons/md'
import { toast } from 'sonner'
import FillLoading from '../fill-loading/fill-loading'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'

interface Props {
	task: iTask
	onStartEdting: () => void
	refetch: () => Promise<QueryObserverResult<ITaskData, Error>>
	onDelete: () => void
}
const TaskItem = ({ task, onStartEdting, onDelete, refetch }: Props) => {
	const [isloading, setIsLoading] = useState(false)

	const activeColor = useMemo(() => {
		switch (task.status) {
			case 'unstarted':
				return 'text-blue-400'
			case 'in_progress':
				return 'text-green-400'
			case 'paused':
				return 'text-red-400'
		}
	}, [task.status])
	const onStart = async () => {
		setIsLoading(true)
		const ref = doc(db, 'task', task.id)
		try {
			await updateDoc(ref, {
				status: 'in_progress',
				startTime: Date.now(),
			})
			refetch()
		} catch (error) {
			toast.error('Something went wrong!')
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const onPause = async () => {
		setIsLoading(true)
		const ref = doc(db, 'task', task.id)
		try {
			const elepsed = task.startTime ? Date.now() - task.startTime : 0
			const newTotalTime = (task.totalTime || 0) + elepsed

			await updateDoc(ref, {
				status: 'paused',
				endTime: Date.now(),
				totalTime: newTotalTime,
			})
			refetch()
		} catch (error) {
			toast.error('Somethin went wrong!')
		} finally {
			setIsLoading(false)
		}
	}
	const renderBtns = () => {
		switch (task.status) {
			case 'unstarted':
				return (
					<Button
						variant={'ghost'}
						size={'icon'}
						className='rounded text-blue-400'
						onClick={onStart}
					>
						<MdOutlinePlayCircleOutline className='w-5 h-5 text-indigo-400' />
					</Button>
				)
			case 'in_progress':
				return (
					<Button
						variant={'ghost'}
						size={'icon'}
						className='rounded '
						onClick={onPause}
					>
						<Pause className='w-5 h-5 text-green-400' />
					</Button>
				)
			case 'paused':
				return (
					<Button variant={'ghost'} size={'icon'} onClick={onStart}>
						<ReloadIcon className='w-5 h-5 text-red-400' />
					</Button>
				)
		}
	}
	return (
		<Card className='w-full p-4 shadow-md grid grid-cols-4 items-center reletive rounded'>
			{isloading && <FillLoading />}
			<div className='flex gap-1 items-center col-span-2'>
				<CheckCircle2 />
				<span className='capitalize'>{task.title.slice(0, 20)} </span>
			</div>
			<div className='flex gap-1 items-center'>
				<HiStatusOnline className={activeColor} />
				<span className={cn('capitalize text-sm hidden md:block')}>
					{task.status}
				</span>
			</div>
			<div className='flex gap-1 items-center justify-self-end'>
				{renderBtns()}
				<Button
					variant={'secondary'}
					size={'icon'}
					className='rounded'
					onClick={onStartEdting}
				>
					<Edit2 className='w-5 h-5 text-indigo-400' />
				</Button>
				<Button
					variant={'destructive'}
					size={'icon'}
					className='rounded'
					onClick={onDelete}
				>
					<Trash className='w-5 h-5 text-indigo-400' />
				</Button>
			</div>
		</Card>
	)
}

export default TaskItem
