export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: string;
  salary: number;
  phone: string;
}

export interface TodoType {
  id: number;
  title: string;
  isCompleted: boolean;
}
