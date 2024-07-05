import { screen, waitFor } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import React from 'react';
import Sidebar from '../../src/components/admincomponents/Sidebar';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';

describe('Admin Sidebar', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should render sidebar component', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    );
    const heading = screen.getByText(/settings/i);
    expect(heading).toBeInTheDocument();
  });

  it('should log out successfully', async () => {
    render(
      <Provider store={store}>
        <Sidebar menuActive={true} />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('logout-button'));

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();

    await waitFor(() => {
      expect(screen.getByTestId('logout-button')).toHaveTextContent(
        'Logging out...',
      );
    });
    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBeNull();
      expect(window.localStorage.getItem('user')).toBeNull();
      expect(window.location.pathname).toBe('/');
    });
  });
});
