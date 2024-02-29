export interface ITaskData {
	weekTotal: number
	monthTotal: number
	total: number
	task: iTask[]
}

export interface iTask {
	id: string
	title: string
	startTime: number
	totalTime: number
	endTime: number
	userId: string
	status: ITaskStatus
}

export type ITaskStatus = 'unstarted' | 'in_progress' | 'paused'
