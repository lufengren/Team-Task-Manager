export interface Task {
  id?: string;
  desc: string;
  completed: boolean;
  priority: number;
  startDate?: Date;
  endDate?: any;
  createdDate?: Date;
  taskListId: string;
  projectId: string;
}
