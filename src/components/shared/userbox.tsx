import { Dumbbell, LoaderIcon, LogOut } from 'lucide-react'
import { useUserState } from '../stores/user.store'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { auth } from '@/firebase'
import { Link } from 'react-router-dom'

const Userbox = () => {
	const { user, setUser } = useUserState()
	if (!user) return <LoaderIcon className='animate-spin' />

	const onLoagout = () => {
		auth.signOut().then(() => {
			setUser(null)
		})
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.photoURL!} />
					<AvatarFallback>{user.email![0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-xs font-medium leading-none text-muted-foreground'>
						{user.email}
					</p>
				</div>
				<div className='flex items-center gap-x-2'>
					<div className='rounded-md bg-secondary p-1'>
						<Avatar className='w-8 h-8 '>
							<AvatarImage src={user.photoURL!} />
							<AvatarFallback>{user.email![0]}</AvatarFallback>
						</Avatar>
					</div>
					<div className='space-y-1'>
						<p className='line-clamp-1'>{user.displayName ?? user.email}</p>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link to={'/dashboard'}>
						<DropdownMenuItem className='cursor-pointer border'>
							<Dumbbell className='w-4 h-4 mr-2' />
							<span>Gym</span>
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem
						className='bg-red-800 cursor-pointer mt-2'
						onClick={onLoagout}
					>
						<LogOut className='w-4 h-4 mr-2' />
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Userbox
