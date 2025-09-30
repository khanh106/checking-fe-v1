"use client"

import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { Controller, FormProvider, useFormContext, useFormState, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form"

import { Label, LabelProps } from "@/components/ui/label"
import { EText, ETextProps } from "@/elements/EText/EText"
import { cn } from "@/lib/utils"

const Form = FormProvider

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("flex flex-col gap-1", className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: LabelProps) {
  const { error, formItemId } = useFormField()

  return <Label data-slot="form-label" data-error={!!error} className={cn(className)} htmlFor={formItemId} {...props} />
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: ETextProps) {
  const { formDescriptionId } = useFormField()

  return <EText as="p" data-slot="form-description" id={formDescriptionId} className={cn("text-neutral-7 text-sm", className)} {...props} />
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()

  // Xử lý trường hợp error là mảng
  if (Array.isArray(error)) {
    const validErrors = error.map((err, index) => ({ err, index })).filter(({ err }) => err?.message)

    if (validErrors.length === 0) {
      return null
    }

    return (
      <p data-slot="form-message" id={formMessageId} className={cn("text-red-5 text-sm", className)} {...props}>
        Item {validErrors[0].index + 1}: {String(validErrors[0].err.message)}
      </p>
    )
  }

  // Xử lý trường hợp error đơn lẻ
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p data-slot="form-message" id={formMessageId} className={cn("text-red-5 text-sm", className)} {...props}>
      {body}
    </p>
  )
}

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField }
