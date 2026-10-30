# Exercícios de TDD — TypeScript e Jest

Projeto com três exercícios de classificação de triângulos, validação de pessoas e cálculo de salário líquido. As regras e cenários estão cobertos por testes Jest em TypeScript.

## Requisitos

- Node.js e npm. A implementação e os relatórios abaixo foram executados com Node.js `v24.18.0` e npm `11.16.0`.
- A primeira instalação precisa de acesso ao registry do npm.

## Instalar, compilar e executar os testes

Na raiz do projeto, instale as versões fixadas no `package-lock.json`, compile as classes TypeScript e execute a suíte completa:

```sh
npm ci
npm run build
npm test
```

`npm run build` compila os arquivos de `src/` para `dist/`. `npm test` executa todos os testes em `tests/` uma vez, sem modo de observação.

Os testes foram escritos antes das classes de produção e cobrem:

- **Exercício 1:** triângulos escaleno, isósceles em suas três permutações e equilátero; lados zero e negativos; todas as seis permutações dos casos em que a soma é igual ou menor que o terceiro lado; e três zeros.
- **Exercício 2:** nomes com e sem acentos, idade nos limites e fora deles, emails ausentes, válidos e inválidos, vários emails, erros simultâneos e o comportamento de `save`.
- **Exercício 3:** os quatro cargos no limite da faixa de desconto maior e imediatamente abaixo dele, arredondamento para centavos e cargo não suportado.

## Cobertura por exercício

Gere os relatórios em separado ou execute todos de uma vez:

```sh
npm run coverage:exercise1
npm run coverage:exercise2
npm run coverage:exercise3
# ou
npm run coverage
```

Cada comando executa somente os testes daquele exercício e mede somente seus arquivos de produção. Os relatórios HTML, JSON, LCOV e texto ficam em `coverage/exercise1/`, `coverage/exercise2/` e `coverage/exercise3/`.

Resultados medidos em **29/10/2026**:

| Exercício | Testes | Instruções | Ramificações | Funções | Linhas |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 — Triângulo | 20 | 100% (11/11) | 100% (14/14) | 100% (2/2) | 100% (10/10) |
| 2 — Pessoa e emails | 22 | 100% (28/28) | 100% (14/14) | 100% (4/4) | 100% (28/28) |
| 3 — Salário | 10 | 100% (20/20) | 100% (5/5) | 100% (3/3) | 100% (20/20) |

Os totais e percentuais acima são produzidos pelo Jest/Istanbul ao executar os comandos de cobertura. Os arquivos `coverage-summary.json` registram os contadores usados na tabela; `index.html` apresenta os detalhes por arquivo e linha.

## Decisões de implementação

- O classificador retorna `INVÁLIDO` se algum lado não for inteiro positivo ou se a desigualdade triangular não for satisfeita.
- `PersonDAO.isValidToInclude` acumula erros na ordem nome, idade, ausência de emails e emails inválidos. O nome exige ao menos duas partes compostas por letras Unicode. Cada email deve ter texto antes de `@` e um domínio com duas partes não vazias separadas por um ponto.
- `PersonDAO.save` valida a pessoa e lança uma exceção com os erros concatenados quando ela é inválida; não faz persistência.
- O salário líquido é calculado em centavos e devolvido como número em reais, arredondado ao centavo mais próximo. O limite de cada cargo usa o desconto maior.
