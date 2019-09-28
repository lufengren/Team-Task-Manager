export interface Task {
  id?: string;
  desc: string;
  completed: boolean;
  priority: number;
  startDate?: Date;
  endDate?: Date;
  createdDate: Date;
  taskListId: string;
  projectId: string;
}
