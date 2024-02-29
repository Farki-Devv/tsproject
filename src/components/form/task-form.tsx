import { taskSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useUserState } from '../stores/user.store'
import { toast } from 'sonner'

interface Props {
	title?: string
	isEdit?: boolean
	onClose?: () => void
	handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>
}

const TaskForm = ({ title, handler, isEdit, onClose }: Props) => {
	const [loading, setLoading] = useState(false)
	const { user } = useUserState()
	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: { title },
	})

	const onSubmit = async (values: z.infer<typeof taskSchema>) => {
		if (!user) return null
		setLoading(true)
		const promise = handler(values).finally(() => setLoading(false))
		toast.promise(promise, {
			loading: 'Loading',
			success: 'Succesfully',
			error: 'Something went wrong',
		})
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Enter a task'
									disabled={loading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-end gap-x-2'>
					{isEdit && (
						<Button
							type='button'
							disabled={loading}
							onClick={onClose}
							variant={'destructive'}
						>
							close
						</Button>
					)}
					<Button type='submit' disabled={loading}>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default TaskForm
