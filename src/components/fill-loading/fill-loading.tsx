import { Loader } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

const FillLoading = () => {
	return (
		<Skeleton className='absolute inset-0 flex justify-center items-center w-full h-full opacity-20 z-40'>
			<Loader className='animate-spin' />
		</Skeleton>
	)
}

export default FillLoading
