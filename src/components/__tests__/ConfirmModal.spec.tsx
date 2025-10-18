import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '@/components/ConfirmModal';

describe('ConfirmModal accessibility', () => {
  it('renders with role dialog and traps focus', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmModal
        open
        title="Delete"
        message="Are you sure?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    const confirmBtn = screen.getByRole('button', { name: /delete/i });

    // Initial focus should be on cancel button
    expect(cancelBtn).toHaveFocus();

    // Tab moves focus to confirm, then cycles back to cancel
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(confirmBtn).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(cancelBtn).toHaveFocus();
  });

  it('closes on Escape', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmModal
        open
        title="Delete"
        message="Are you sure?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalled();
  });
});