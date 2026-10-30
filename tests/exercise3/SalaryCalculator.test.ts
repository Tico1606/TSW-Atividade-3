import { Employee } from '../../src/exercise3/Employee';
import { JobTitle } from '../../src/exercise3/JobTitle';
import { SalaryCalculator } from '../../src/exercise3/SalaryCalculator';

describe('SalaryCalculator', () => {
  const salaryCases: Array<[JobTitle, number, number]> = [
    [JobTitle.DEVELOPER, 3000, 2400],
    [JobTitle.DEVELOPER, 2999.99, 2699.99],
    [JobTitle.DBA, 2000, 1500],
    [JobTitle.DBA, 1999.99, 1699.99],
    [JobTitle.TESTER, 2000, 1500],
    [JobTitle.TESTER, 1999.99, 1699.99],
    [JobTitle.MANAGER, 5000, 3500],
    [JobTitle.MANAGER, 4999.99, 3999.99],
  ];

  it.each(salaryCases)('calculates net salary for %s with base salary %s', (jobTitle, baseSalary, expected) => {
    const employee = new Employee('Ana Souza', 'ana@example.com', baseSalary, jobTitle);
    expect(SalaryCalculator.calculateNetSalary(employee)).toBe(expected);
  });

  it('rounds the net salary to cents', () => {
    const employee = new Employee('Ana Souza', 'ana@example.com', 100.05, JobTitle.DEVELOPER);
    expect(SalaryCalculator.calculateNetSalary(employee)).toBe(90.05);
  });

  it('rejects an unsupported job title', () => {
    const employee = new Employee('Ana Souza', 'ana@example.com', 100, 'UNKNOWN' as JobTitle);
    expect(() => SalaryCalculator.calculateNetSalary(employee)).toThrow('Cargo não suportado: UNKNOWN.');
  });
});
