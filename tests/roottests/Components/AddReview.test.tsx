import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { vitest } from 'vitest';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../src/redux/store';
import { AddReview } from '../../../src/components/usercomponents/AddReview';

describe('AddReview Component Tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReview onReviewAdded={() => {}} />
          <ToastContainer />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('should render the form components', () => {
    const reviewTitleInput = screen.getByPlaceholderText('Enter review title');
    const reviewContentInput = screen.getByPlaceholderText(
      'Write your review...',
    );

    expect(reviewTitleInput).toBeInTheDocument();
    expect(reviewContentInput).toBeInTheDocument();
  });

  it('should display validation errors when submitting empty form', async () => {
    const submitButton = screen.getByRole('button', { name: /Add Review/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Review title must not be empty'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Review content must not be empty'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Rating must be greater than 0'),
      ).toBeInTheDocument();
    });
  });
});
