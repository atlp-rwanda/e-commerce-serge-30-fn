// / <reference types="@testing-library/jest-dom" />

import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
global.ResizeObserver = ResizeObserver;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
