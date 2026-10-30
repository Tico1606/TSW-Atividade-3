import { Email } from '../../src/exercise2/Email';
import { Person } from '../../src/exercise2/Person';
import { PersonDAO } from '../../src/exercise2/PersonDAO';

describe('PersonDAO.isValidToInclude', () => {
  const dao = new PersonDAO();
  const validPerson = () => new Person(1, 'Ana Souza', 30, [new Email(1, 'ana@example.com')]);

  it('returns no errors for a valid person with an accented name', () => {
    const person = new Person(1, 'João Ávila', 30, [new Email(1, 'joao@exemplo.com')]);
    expect(dao.isValidToInclude(person)).toEqual([]);
  });

  it.each([1, 200])('accepts age boundary %i', (age) => {
    const person = validPerson();
    person.age = age;
    expect(dao.isValidToInclude(person)).toEqual([]);
  });

  it.each([0, 201, 2.5])('rejects invalid age %s', (age) => {
    const person = validPerson();
    person.age = age;
    expect(dao.isValidToInclude(person)).toContain('Idade deve ser um número inteiro entre 1 e 200.');
  });

  it.each(['Ana', 'Ana Maria3', 'Ana-Maria Souza', ''])('rejects invalid name "%s"', (name) => {
    const person = validPerson();
    person.name = name;
    expect(dao.isValidToInclude(person)).toContain('Nome deve conter ao menos duas partes formadas por letras.');
  });

  it('rejects a name with an unexpected runtime type', () => {
    const person = validPerson();
    person.name = null as unknown as string;
    expect(dao.isValidToInclude(person)).toContain('Nome deve conter ao menos duas partes formadas por letras.');
  });

  it('requires at least one email', () => {
    const person = new Person(1, 'Ana Souza', 30, []);
    expect(dao.isValidToInclude(person)).toContain('Pessoa deve possuir ao menos um email.');
  });

  it.each(['ana.example.com', 'ana@exemplo', '@exemplo.com', 'ana@.com', 'ana@exemplo.'])(
    'rejects malformed email "%s"',
    (name) => {
      const person = new Person(1, 'Ana Souza', 30, [new Email(1, name)]);
      expect(dao.isValidToInclude(person)).toContain(`Email inválido: ${name}.`);
    },
  );

  it('reports every invalid email in input order', () => {
    const person = new Person(1, 'Ana Souza', 30, [
      new Email(1, 'invalid'),
      new Email(2, 'also.invalid'),
    ]);
    expect(dao.isValidToInclude(person)).toEqual([
      'Email inválido: invalid.',
      'Email inválido: also.invalid.',
    ]);
  });

  it('rejects an email entry with an unexpected runtime value', () => {
    const person = new Person(1, 'Ana Souza', 30, [null as unknown as Email]);
    expect(dao.isValidToInclude(person)).toEqual(['Email inválido: .']);
  });

  it('returns all errors in a stable order', () => {
    const person = new Person(1, 'Ana', 0, [new Email(1, 'bad')]);
    expect(dao.isValidToInclude(person)).toEqual([
      'Nome deve conter ao menos duas partes formadas por letras.',
      'Idade deve ser um número inteiro entre 1 e 200.',
      'Email inválido: bad.',
    ]);
  });

  it('save accepts a valid person', () => {
    expect(() => dao.save(validPerson())).not.toThrow();
  });

  it('save throws with the validation errors for an invalid person', () => {
    const person = new Person(1, 'Ana', 30, []);
    expect(() => dao.save(person)).toThrow('Nome deve conter ao menos duas partes formadas por letras.; Pessoa deve possuir ao menos um email.');
  });
});
