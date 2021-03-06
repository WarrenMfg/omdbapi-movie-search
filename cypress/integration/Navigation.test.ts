import { cy, it, describe, expect, beforeEach } from 'local-cypress';
import {
  DESKTOP_NAV,
  IPHONE,
  MBP16,
  MOBILE_NAV,
  MOBILE_NAV_BUTTON,
  MOVIE_LIST,
} from '../constants';
import { FAVORITES } from '../../src/utils/constants';
import { NAV_ITEMS } from '../../src/state/types';

describe('Navigation', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://www.omdbapi.com/?s=*', {
      fixture: 'movies.json',
    });
  });

  describe('Navigation on mobile', IPHONE, () => {
    NAV_ITEMS.forEach(navItem => {
      it(navItem, () => {
        cy.visit(`/${navItem}`);

        cy.get(MOBILE_NAV_BUTTON).click();
        cy.get(`${MOBILE_NAV} a[href="/${navItem}"]`)
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

        cy.get(`${DESKTOP_NAV} a[href="/${navItem}"]`)
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
