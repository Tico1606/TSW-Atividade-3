import { TriangleClassifier } from '../../src/exercise1/TriangleClassifier';

describe('TriangleClassifier', () => {
  const classifier = new TriangleClassifier();

  it('classifies a valid scalene triangle', () => {
    expect(classifier.classify(3, 4, 5)).toBe('ESCALENO');
  });

  it.each([
    [5, 5, 3],
    [5, 3, 5],
    [3, 5, 5],
  ])('classifies the isosceles permutation %i, %i, %i', (a, b, c) => {
    expect(classifier.classify(a, b, c)).toBe('ISÓSCELES');
  });

  it('classifies an equilateral triangle', () => {
    expect(classifier.classify(4, 4, 4)).toBe('EQUILÁTERO');
  });

  it('rejects a side with value zero', () => {
    expect(classifier.classify(0, 2, 2)).toBe('INVÁLIDO');
  });

  it('rejects a negative side', () => {
    expect(classifier.classify(-1, 2, 2)).toBe('INVÁLIDO');
  });

  it.each([
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ])('rejects equality permutation %i, %i, %i', (a, b, c) => {
    expect(classifier.classify(a, b, c)).toBe('INVÁLIDO');
  });

  it.each([
    [1, 2, 4],
    [1, 4, 2],
    [2, 1, 4],
    [2, 4, 1],
    [4, 1, 2],
    [4, 2, 1],
  ])('rejects inequality permutation %i, %i, %i', (a, b, c) => {
    expect(classifier.classify(a, b, c)).toBe('INVÁLIDO');
  });

  it('rejects three zero sides', () => {
    expect(classifier.classify(0, 0, 0)).toBe('INVÁLIDO');
  });
});
