export type TriangleClassification = 'ESCALENO' | 'ISÓSCELES' | 'EQUILÁTERO' | 'INVÁLIDO';

export class TriangleClassifier {
  classify(a: number, b: number, c: number): TriangleClassification {
    if (![a, b, c].every((side) => Number.isInteger(side) && side > 0)) {
      return 'INVÁLIDO';
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
      return 'INVÁLIDO';
    }

    if (a === b && b === c) {
      return 'EQUILÁTERO';
    }

    if (a === b || a === c || b === c) {
      return 'ISÓSCELES';
    }

    return 'ESCALENO';
  }
}
