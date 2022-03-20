import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import Modal from './Modal';

describe('Modal', () => {
  let container: HTMLElement;
  const OFF_SCREEN = ['-translate-y-full', 'opacity-0'];
  const ON_SCREEN = ['translate-y-0', 'opacity-100'];

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(
      <Modal isOpen={false} closeModal={() => undefined}>
        Hello
      </Modal>
    ).container;
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should be off screen when not open', () => {
    container = render(
      <Modal isOpen={false} closeModal={() => undefined}>
        Hello
      </Modal>
    ).container;
    expect(screen.getByRole('presentation')).toHaveClass(...OFF_SCREEN);
  });

  it('should be on screen when open', async () => {
    container = render(
      <Modal isOpen={true} closeModal={() => undefined}>
        Hello
      </Modal>
    ).container;

    // Must wait for animation
    await waitFor(() =>
      expect(screen.getByRole('presentation')).toHaveClass(...ON_SCREEN)
    );
  });

  it('should close the modal when user clicks on background', () => {
    const closeModal = jest.fn();
    container = render(
      <Modal isOpen={true} closeModal={closeModal}>
        Hello
      </Modal>
    ).container;

    screen.getByRole('presentation').click();
    expect(closeModal).toHaveBeenCalled();
  });

  it('should close the modal when user presses escape key', async () => {
    const closeModal = jest.fn();
    container = render(
      <Modal isOpen={true} closeModal={closeModal}>
        Hello
      </Modal>
    ).container;

    fireEvent.keyDown(screen.getByRole('presentation'), { key: 'Escape' });
    expect(closeModal).toHaveBeenCalled();
  });
});
