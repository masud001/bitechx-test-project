"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function Pagination({ page, limit, onPageChange, onLimitChange }: {
  page: number;
  limit: number;
  onPageChange: (p: number) => void;
  onLimitChange: (l: number) => void;
}) {
  const prevDisabled = page <= 1;
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        className="rounded hover:bg-primary hover:text-primary-foreground border-[.5px] border-primary"
        onClick={() => onPageChange(page - 1)}
        disabled={prevDisabled}
      >
        Prev
      </Button>
      <span className="text-sm">Page {page}</span>
      <Button
        variant="outline"
        size="sm"
        className="rounded hover:bg-primary hover:text-primary-foreground border-[.5px] border-primary"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
      <Select
        value={String(limit)}
        onValueChange={(val) => onLimitChange(Number(val))}
      >
        <SelectTrigger aria-label="Items per page" className="h-9">
          <SelectValue placeholder={`${limit}/page`} />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 20].map((n) => (
            <SelectItem key={n} value={String(n)}>{n}/page</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}