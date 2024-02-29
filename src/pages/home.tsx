import { Button } from '@/components/ui/button'
import { featuredItem, programs } from '@/constants'
import { Card } from '@/components/ui/card'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import men from '@/assets/men.png'
import { useUserState } from '@/components/stores/user.store'
import { Dumbbell } from 'lucide-react'
const Home = () => {
	const { user } = useUserState()
	return (
		<>
			<div className='w-full h-screen  flex items-center gap-10 justify-center '>
				<div className='max-w-xl ml-00 flex h-full flex-col justify-center px-10 md:px-0'>
					<h2 className=' md:text-9xl font-semibold uppercase'>
						Workout with me
					</h2>
					<p className='text-muted-foreground'>
						A huge selection of health and fitness content , healthy recipes and
						transformation stories to help you gget fit and stay fit!
					</p>
					{user ? (
						<>
							<div className='flex gap-4'>
								<Link to={'/dashboard'}>
									<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
										<span>Go to GYM</span>
										<Dumbbell className='w-4 h-4 mr-2' />
									</Button>
								</Link>
							</div>
						</>
					) : (
						<Link to={'/auth'}>
							<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
								Join club now
							</Button>
						</Link>
					)}

					<div className='mt-24'>
						<p className='text-muted-foreground'>AS FEATURED IN</p>
						<div className='flex items-center gap-2 md:gap-4 mt-2'>
							{featuredItem.map((Icon, idx) => (
								<Icon key={idx} className='w-12 h-12 cursor-pointer' />
							))}
						</div>
					</div>
				</div>

				<img src={men} alt='' className='w-1/4 hidden md:block ' />
			</div>
			<div className='container max-w-6xl mx-auto'>
				<h2 className='text-4xl'>Not sure to start?</h2>
				<p className='mt-2 text-muted-foreground '>
					Programs offer day-to-day guidanse on an interactive calendar to keep
					you on track
				</p>
				<div className='grid md:grid-cols-3 grid-cols-1 gap-4 my-8'>
					{programs.map(item => (
						<Card
							key={item.title}
							className='p-8 relative cursor-pointer group'
						>
							<h4>{item.title}</h4>
							<p className='text-sm text-muted-foreground mt-2'>{item.descr}</p>
							<Button
								variant={'ghost'}
								className='absolute right-2 top-1/2 group-hover:translate-x-2 transition-all	 '
							>
								<FaArrowRightLong />
							</Button>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default Home
