import { cy, it, describe, beforeEach } from 'local-cypress';
import { IPHONE, MBP16, MODAL_BACKGROUND, MOVIE_LIST } from '../constants';
import { assertModalIsClosed, openCard } from '../utils';

describe('Modal', () => {
  beforeEach(() => {
    cy.visit('/super');
    cy.get(`${MOVIE_LIST} button`).as('cards');
    cy.get(MODAL_BACKGROUND).as('modalBackground');
  });

  describe('Modal on mobile', IPHONE, () => {
    it('should open a movie card modal', () => {
      openCard();
    });

    it('should close a movie card modal with the "Close" button', () => {
      openCard();
      cy.contains('Close').click();
      assertModalIsClosed();
    });
  });

  describe('Modal on desktop', MBP16, () => {
    it('should open a movie card modal', () => {
      openCard();
    });

    it('should close a movie card modal with the "Close" button', () => {
      openCard();
      cy.contains('Close').click();
      assertModalIsClosed();
    });

    it('should close a movie card modal by clicking outside of the modal', () => {
      openCard();
      cy.get('@modalBackground').click('left');
      assertModalIsClosed();
    });

    it('should close a movie card modal by pressing the escape key', () => {
      openCard();
      cy.get('@modalBackground').trigger('keydown', { key: 'escape' });
      assertModalIsClosed();
    });
  });
});
