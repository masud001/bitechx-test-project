import * as React from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import type { FieldValues, FormProviderProps } from "react-hook-form";
import { cn } from "@/lib/utils";

// Form: wrapper around react-hook-form's FormProvider (generic-aware)
export type FormProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = FormProviderProps<TFieldValues, TContext>;
export function Form<TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: FormProps<TFieldValues, TContext>
) {
  return <FormProvider {...props} />;
}

// Context so FormMessage can discover the current field name
type FormFieldContextValue = { name: string };
const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined);
function useFormFieldContext() {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) {
    throw new Error("Form components must be used within <FormField /> render");
  }
  return ctx;
}

// FormField bridges RHF Controller with our UI structure
export interface BaseFormFieldProps<TFieldValues> {
  control?: any;
  name: any;
  render: (field: { field: any; fieldState: any; formState: any }) => React.ReactNode;
}

export function FormField<TFieldValues = any>(props: BaseFormFieldProps<TFieldValues>) {
  const { control, name, render } = props as any;
  const form = useFormContext();
  const resolvedControl = control ?? form.control;

  return (
    <Controller
      control={resolvedControl}
      name={name}
      render={(ctx) => (
        <FormFieldContext.Provider value={{ name }}>
          {render(ctx)}
        </FormFieldContext.Provider>
      )}
    />
  );
}

// Item context for linking labels/messages if needed
const FormItemContext = React.createContext<{ id: string } | undefined>(undefined);
function useFormItemContext() {
  return React.useContext(FormItemContext);
}

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

export const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    const item = useFormItemContext();
    return <label ref={ref} className={cn("text-sm font-medium", className)} htmlFor={item?.id} {...props} />;
  }
);
FormLabel.displayName = "FormLabel";

export const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("relative", className)} {...props} />;
  }
);
FormControl.displayName = "FormControl";

export const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
FormDescription.displayName = "FormDescription";

export const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();
    const { name } = useFormFieldContext();
    const message = (errors as any)?.[name]?.message as string | undefined;

    if (!message && !children) return null;

    return (
      <p ref={ref} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {children ?? message}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

export type { FormFieldContextValue };