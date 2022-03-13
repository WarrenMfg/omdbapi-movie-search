import { cy } from 'local-cypress';
import { SPINNER } from './constants';

export const openCard = () => {
  cy.get('@cards').should('have.length.gt', 0);
  cy.wait(250);
  cy.get('@cards').first().click();
  assertModalIsOpen();
  assertMovieDetailsAreLoaded();
};

const assertModalIsOpen = () => {
  cy.get('@modalBackground')
    .should('have.class', 'opacity-100')
    .should('have.class', 'translate-y-0');
};

const assertMovieDetailsAreLoaded = () => {
  cy.get(SPINNER).should('not.exist');
};

export const assertModalIsClosed = () => {
  cy.get('@modalBackground')
    .should('not.have.class', 'opacity-100')
    .should('not.have.class', 'translate-y-0');
};
