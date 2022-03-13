import { cy, it, describe, beforeEach } from 'local-cypress';
import {
  DESKTOP_NAV,
  IPHONE,
  MBP16,
  MOBILE_NAV,
  MOBILE_NAV_BUTTON,
  MODAL_BACKGROUND,
  MOVIE_LIST,
} from '../constants';
import { assertModalIsClosed, openCard } from '../utils';

describe('Favorites', () => {
  [
    { description: 'mobile', device: IPHONE },
    { description: 'desktop', device: MBP16 },
  ].forEach(screenSize => {
    describe(
      `Favorites on ${screenSize.description}`,
      screenSize.device,
      () => {
        beforeEach(() => {
          cy.visit('/super');
          cy.clearLocalStorage();
          cy.get(`${MOVIE_LIST} button`).as('cards');
          cy.get(MODAL_BACKGROUND).as('modalBackground');
        });

        it('should add and remove a favorite from a movie list route', () => {
          openCard();
          cy.contains('Favorite').click();
          cy.contains('Unfavorite').should('exist');
          cy.contains('Close').click();
          openCard();
          cy.contains('Unfavorite').should('exist').click();
          cy.contains('Favorite').should('exist');
        });

        it('should add a favorite and remove it from the favorites route', () => {
          openCard();
          cy.contains('Favorite').click();
          cy.contains('Unfavorite').should('exist');
          cy.contains('Close').click();

          const isMobile = screenSize.description === 'mobile';

          isMobile && cy.get(MOBILE_NAV_BUTTON).click();
          cy.get(`${isMobile ? MOBILE_NAV : DESKTOP_NAV} ul li`)
            .last()
            .click();
          cy.contains('Pick some favorites!').should('not.exist');
          cy.reload();
          cy.contains('Pick some favorites!').should('not.exist');
          openCard();

          cy.contains('Unfavorite').click();
          assertModalIsClosed();
        });
      }
    );
  });
});
