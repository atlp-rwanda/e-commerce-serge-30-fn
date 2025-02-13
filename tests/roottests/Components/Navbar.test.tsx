import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { navigateTo } from '../../utils';
import userEvent from '@testing-library/user-event';

describe('Home Navbar', () => {
  it('should render the homepage with / route', () => {
    navigateTo('/');
    expect(screen.getByRole('heading', { name: /store/i })).toBeInTheDocument();
  });

  it('should change menuActive state', async () => {
    navigateTo('/');
    const user = userEvent.setup();
    const openMenuButton = screen.getByLabelText(/open menu/i);
    await user.click(openMenuButton);
    const closeMenuButton = screen.getByLabelText(/close menu/i);
    expect(closeMenuButton).toBeInTheDocument();
    await user.click(closeMenuButton);
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });
});
