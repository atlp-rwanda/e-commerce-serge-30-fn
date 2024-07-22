import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCardSkeleton } from '../../src/components/rootcomponents/productCardSkeleton';

describe('ProductCardSkeleton', () => {
  it('renders three skeleton elements', () => {
    render(<ProductCardSkeleton />);
    const skeletons = screen.getAllByRole('generic');
    expect(skeletons).toHaveLength(6);
  });
});
