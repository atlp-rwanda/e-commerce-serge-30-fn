import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import AutoComplete from '../../src/components/rootcomponents/searchComponents/AutoComplete';
import { vi } from 'vitest';
describe('Search Bar', () => {
  it('should Auto complete when not loading', () => {
    const searchResults = [];
    const setIsOpen = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AutoComplete
            isLoading={false}
            searchResults={searchResults}
            isOpen={true}
            setIsOpen={setIsOpen(true)}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('autoComplete')).toBeInTheDocument();
  });
  it('should render loading screen when loading is true', () => {
    const searchResults = [];
    const setIsOpen = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AutoComplete
            isLoading={true}
            searchResults={searchResults}
            isOpen={true}
            setIsOpen={setIsOpen(true)}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
  it('should not show autocomplete  when its state is false', () => {
    const searchResults = [];
    const setIsOpen = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AutoComplete
            isLoading={true}
            searchResults={searchResults}
            isOpen={false}
            setIsOpen={setIsOpen(false)}
          />
        </MemoryRouter>
      </Provider>,
    );
    const autoComplete = screen.queryByTestId('autoComplete')
    expect(autoComplete).toBeNull()
  });
});
