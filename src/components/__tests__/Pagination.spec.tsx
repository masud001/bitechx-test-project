import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Pagination from '@/components/Pagination';

describe('Pagination component', () => {
  it('disables Prev on first page and increments on Next', () => {
    const onPageChange = vi.fn();
    const onLimitChange = vi.fn();
    render(<Pagination page={1} limit={10} onPageChange={onPageChange} onLimitChange={onLimitChange} />);

    const prev = screen.getByRole('button', { name: /prev/i });
    const next = screen.getByRole('button', { name: /next/i });

    expect(prev).toBeDisabled();

    fireEvent.click(next);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onLimitChange when select changes', () => {
    const onPageChange = vi.fn();
    const onLimitChange = vi.fn();
    const { container } = render(<Pagination page={2} limit={10} onPageChange={onPageChange} onLimitChange={onLimitChange} />);

    const select = within(container).getByLabelText(/items per page/i);
    fireEvent.change(select, { target: { value: '20' } });
    expect(onLimitChange).toHaveBeenCalledWith(20);
  });
});