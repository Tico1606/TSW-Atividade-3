import { Employee } from './Employee';
import { JobTitle } from './JobTitle';

type SalaryRule = { threshold: number; discountPercent: number; lowerDiscountPercent: number };

const SALARY_RULES: Record<JobTitle, SalaryRule> = {
  [JobTitle.DEVELOPER]: { threshold: 3000, discountPercent: 20, lowerDiscountPercent: 10 },
  [JobTitle.DBA]: { threshold: 2000, discountPercent: 25, lowerDiscountPercent: 15 },
  [JobTitle.TESTER]: { threshold: 2000, discountPercent: 25, lowerDiscountPercent: 15 },
  [JobTitle.MANAGER]: { threshold: 5000, discountPercent: 30, lowerDiscountPercent: 20 },
};

export class SalaryCalculator {
  static calculateNetSalary(employee: Employee): number {
    const rule = SALARY_RULES[employee.jobTitle];
    if (!rule) {
      throw new Error(`Cargo não suportado: ${employee.jobTitle}.`);
    }

    const discountPercent = employee.baseSalary >= rule.threshold
      ? rule.discountPercent
      : rule.lowerDiscountPercent;
    const baseSalaryInCents = Math.round(employee.baseSalary * 100);
    const netSalaryInCents = Math.floor((baseSalaryInCents * (100 - discountPercent) + 50) / 100);

    return netSalaryInCents / 100;
  }
}
