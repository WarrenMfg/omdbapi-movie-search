import { cy, it, describe, expect } from 'local-cypress';
import { IPHONE, MBP16, MOBILE_NAV_BUTTON, MOVIE_LIST } from '../constants';
import { FAVORITES, NAV_ITEMS } from '../../src/utils/constants';

describe('Navigation', () => {
  describe('Navigation on mobile', IPHONE, () => {
    NAV_ITEMS.forEach(navItem => {
      it(navItem, () => {
        cy.visit(`/${navItem}`);

        cy.get(MOBILE_NAV_BUTTON).click();
        cy.get(`a[href="/${navItem}"]`)
          .should('exist')
          .and($el => {
            expect($el).to.have.attr('tabindex', '0');
            expect($el).to.have.attr('aria-current', 'page');
          });
        cy.get(MOBILE_NAV_BUTTON).click();

        cy.get(MOVIE_LIST).should($el => {
          if (navItem !== FAVORITES) {
            expect($el).to.have.length.gt(0);
          } else {
            expect($el).to.have.length(0);
          }
        });
      });
    });
  });

  describe('Navigation on desktop', MBP16, () => {
    NAV_ITEMS.forEach(navItem => {
      it(navItem, () => {
        cy.visit(`/${navItem}`);

        cy.get(`a[href="/${navItem}"]`)
          .should('exist')
          .and($el => {
            expect($el).to.have.attr('aria-current', 'page');
          });

        cy.get(MOVIE_LIST).should($el => {
          if (navItem !== FAVORITES) {
            expect($el).to.have.length.gt(0);
          } else {
            expect($el).to.have.length(0);
          }
        });
      });
    });
  });
});
