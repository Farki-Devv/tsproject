import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

function ErrorMessage() {
	return (
		<Alert variant='destructive'>
			<ExclamationTriangleIcon className='h-4 w-4' />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>No email</AlertDescription>
		</Alert>
	)
}

export default ErrorMessage
