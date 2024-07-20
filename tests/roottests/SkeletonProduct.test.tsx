import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkeletonProduct from '../../src/components/rootcomponents/skeletonProduct';
import ProductCardSkeleton from '../../src/components/rootcomponents/productCardSkeleton';

vi.mock('../../src/components/rootcomponents/productCardSkeleton', () => ({
  ProductCardSkeleton: () => <div role="skeleton" />,
}));

describe('SkeletonProduct', () => {
  it('renders three ProductCardSkeleton components', () => {
    render(<SkeletonProduct />);
    const skeletons = screen.getAllByRole('skeleton');
    expect(skeletons).toHaveLength(3);
  });
});
