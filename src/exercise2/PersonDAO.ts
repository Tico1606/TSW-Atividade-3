import { Person } from './Person';

const EMAIL_PATTERN = /^[^@\s]+@[^@.\s]+\.[^@.\s]+$/;
const PERSON_NAME_PATTERN = /^\p{L}+(?:\s+\p{L}+)+$/u;

export class PersonDAO {
  isValidToInclude(person: Person): string[] {
    const errors: string[] = [];
    const normalizedName = typeof person.name === 'string' ? person.name.trim() : '';

    if (!PERSON_NAME_PATTERN.test(normalizedName)) {
      errors.push('Nome deve conter ao menos duas partes formadas por letras.');
    }

    if (!Number.isInteger(person.age) || person.age < 1 || person.age > 200) {
      errors.push('Idade deve ser um número inteiro entre 1 e 200.');
    }

    if (!Array.isArray(person.emails) || person.emails.length === 0) {
      errors.push('Pessoa deve possuir ao menos um email.');
      return errors;
    }

    for (const email of person.emails) {
      const emailName = typeof email?.name === 'string' ? email.name : '';
      if (!EMAIL_PATTERN.test(emailName)) {
        errors.push(`Email inválido: ${emailName}.`);
      }
    }

    return errors;
  }

  save(person: Person): void {
    const errors = this.isValidToInclude(person);
    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }
  }
}
