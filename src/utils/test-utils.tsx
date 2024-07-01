import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, combineReducers, Store } from '@reduxjs/toolkit';
import userReducer, { UserState } from '../redux/features/auth/authSlice';
import { ecommerceSergeApi } from '../service';

export interface RootState {
  user: UserState;
  [ecommerceSergeApi.reducerPath]: ReturnType<typeof ecommerceSergeApi.reducer>;
}

const rootReducer = combineReducers({
  user: userReducer,
  [ecommerceSergeApi.reducerPath]: ecommerceSergeApi.reducer,
});

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: Store<RootState>;
  route?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ecommerceSergeApi.middleware),
      preloadedState: preloadedState as RootState,
    }),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from '@testing-library/react';

export { renderWithProviders as render };
