export interface Task {
  id?: string;
  desc: string;
  completed: boolean;
  priority: number;
  startDate?: Date;
  endDate?: Date;
  createDate: Date;
  taskListId: string;
}
