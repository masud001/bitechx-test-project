"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ConfirmModal({
  open,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
  confirmIcon,
  cancelIcon,
}: {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmIcon?: React.ReactNode;
  cancelIcon?: React.ReactNode;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        // Only allow closing when not loading
        if (!next && !loading) onCancel();
      }}
    >
      <DialogContent className="outline-none shadow-lg ">
        <DialogHeader className='border-0'>
          <DialogTitle className="text-lg font-semibold text-text border-b-[.5px] border-b-text/20 pb-2">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-text/80">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='border-t-[.5px] border-t-text/20 pt-6'>
          <Button
            type="button"
            variant="outline"
            className="rounded cursor-pointer border-[.5px] hover:bg-secondary hover:text-white"
            onClick={onCancel}
            disabled={loading}
            aria-disabled={loading}
          >
            {cancelIcon ? <span className="mr-2">{cancelIcon}</span> : null}
            {cancelText}
          </Button>
          <Button
            type="button"
            className="rounded cursor-pointer bg-accent hover:bg-accent/80 hover:text-white text-text-light disabled:opacity-60"
            onClick={onConfirm}
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? 'Processing…' : (
              <>
                {confirmIcon ? <span className="mr-2">{confirmIcon}</span> : null}
                {confirmText}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}