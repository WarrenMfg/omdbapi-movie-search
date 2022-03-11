import { cy, it, describe } from 'local-cypress';

describe('Basic test', () => {
  it('works', () => {
    cy.visit('/');
    cy.get('#root').should('exist');
  });
});
