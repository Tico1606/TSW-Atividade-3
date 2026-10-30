import { JobTitle } from './JobTitle';

export class Employee {
  constructor(
    public name: string,
    public email: string,
    public baseSalary: number,
    public jobTitle: JobTitle,
  ) {}
}
