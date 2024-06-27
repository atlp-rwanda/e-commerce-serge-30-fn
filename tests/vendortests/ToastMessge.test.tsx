import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { vi } from 'vitest';
import ToastMessage from '../../src/components/ToastMessage';
import { toast } from 'react-toastify';

// Mock toast.dismiss
vi.mock('react-toastify', () => ({
  toast: {
    dismiss: vi.fn(),
  },
}));

describe('ToastMessage Component', () => {
  beforeEach(() => {
    (toast.dismiss as jest.Mock).mockClear();
  });

  const renderToastMessage = (props = {}) => {
    return render(
      <Provider store={store}>
        <Router>
          <ToastMessage message="Test Message" {...props} />
        </Router>
      </Provider>,
    );
  };

  test('renders the message', () => {
    renderToastMessage();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  test('calls onCancel when the Cancel button is clicked', () => {
    const onCancel = vi.fn();
    renderToastMessage({ onCancel });
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
    expect(toast.dismiss).toHaveBeenCalled();
  });

  test('calls onProceed when the Stock button is clicked', () => {
    const onProceed = vi.fn();
    renderToastMessage({ onProceed });
    const proceedButton = screen.getByText('Stock');
    fireEvent.click(proceedButton);
    expect(onProceed).toHaveBeenCalled();
    expect(toast.dismiss).toHaveBeenCalled();
  });

  test('does not throw error when onCancel is not provided', () => {
    renderToastMessage();
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(toast.dismiss).toHaveBeenCalled();
  });

  test('does not throw error when onProceed is not provided', () => {
    renderToastMessage();
    const proceedButton = screen.getByText('Stock');
    fireEvent.click(proceedButton);
    expect(toast.dismiss).toHaveBeenCalled();
  });
});
