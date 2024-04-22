export type PopoverDemoProps = {
  name: string
  title: string
  taskname: string
  subtitle: string
  categoryLabel: string
  descriptionLabel: string
}

export interface Strip {
  id: string
  title: string
  content: string
}

export interface StripCardProps {
  title: string
  content: string
  onDelete: () => void
  onUpdate: (data: AddTask) => void
  handleId: (id: string | unknown) => void
}
export interface AlertDialogProps {
  onDelete: () => void
}
export interface StripCardsContainerProps {
  strips: Strip[]
}

export interface AddTask {
  taskname: string
  category: string
  description: string
}

export type TaskProps = {
  name: string
  categoryLabel: string
  descriptionLabel: string
  click: (data: AddTask) => void
}

export interface DialogProps {
  name: string
  description: string
}

export interface DialogDemoProps extends DialogProps {
  taskname: string
  categoryLabel: string
  descriptionLabel: string
  onUpdate: (data: AddTask) => void
  handleId: (id: string | unknown) => void
}

export interface Employee {
  id: string
  email: string
  name: string
}

export interface EmployeeTableProps {
  employees: Employee[]
  onUpdate: (id: string | unknown) => void
  onDelete: (id: string | unknown) => void
}

export interface PerformanceItem {
  id: string
  email: string
  category: string
}
