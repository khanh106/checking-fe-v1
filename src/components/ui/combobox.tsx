"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Checkmark16Regular, ChevronDownRegular, Search16Regular } from "@fluentui/react-icons"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  isLoading?: boolean
  onSearchChange?: (search: string) => void
  className?: string
  disabled?: boolean
  noResultsText?: string
  searchValue?: string
  multiple?: boolean
  maxSelectedDisplay?: number
  useCommand?: boolean
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  isLoading = false,
  onSearchChange,
  className,
  disabled = false,
  noResultsText,
  searchValue,
  multiple = false,
  maxSelectedDisplay = 3,
  useCommand = false,
}: ComboboxProps) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      if (!newOpen && onSearchChange) {
        onSearchChange("")
      }
    },
    [onSearchChange],
  )

  const selectedValues = useMemo(() => {
    return Array.isArray(value) ? value : []
  }, [value])

  const selectedOptions = useMemo(() => {
    if (!multiple) return []
    return options.filter((option) => selectedValues.includes(option.value))
  }, [options, selectedValues, multiple])

  const handleSelect = useCallback(
    (selectedValue: string) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : []
        const newValues = currentValues.includes(selectedValue) ? currentValues.filter((v) => v !== selectedValue) : [...currentValues, selectedValue]
        onValueChange?.(newValues)
      } else {
        onValueChange?.(selectedValue)
        handleOpenChange(false)
      }
    },
    [multiple, value, onValueChange, handleOpenChange],
  )

  const getDisplayText = useMemo(() => {
    if (multiple) {
      if (selectedValues.length === 0) {
        return placeholder ?? t("select")
      }

      if (selectedOptions.length <= maxSelectedDisplay) {
        return selectedOptions.map((option) => option.label).join(", ")
      } else {
        const displayOptions = selectedOptions.slice(0, maxSelectedDisplay)
        const remainingCount = selectedOptions.length - maxSelectedDisplay
        return `${displayOptions.map((option) => option.label).join(", ")} +${remainingCount}`
      }
    } else {
      const selectedOption = options.find((option) => option.value === value)
      return selectedOption ? selectedOption.label : (placeholder ?? t("select"))
    }
  }, [multiple, selectedValues, selectedOptions, maxSelectedDisplay, options, value, placeholder, t])

  const isSelected = useCallback(
    (optionValue: string) => {
      if (multiple) {
        return selectedValues.includes(optionValue)
      } else {
        return optionValue === value
      }
    },
    [multiple, selectedValues, value],
  )

  const loadingContent = useMemo(
    () => (
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center gap-2">
          <Loader2 className="text-muted-foreground size-4 animate-spin" />
          <span className="text-muted-foreground text-sm">{t("loading")}</span>
        </div>
      </div>
    ),
    [t],
  )

  const emptyContent = useMemo(
    () => <div className="text-muted-foreground py-6 text-center text-sm">{noResultsText || t("noResults")}</div>,
    [noResultsText, t],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange?.(e.target.value)
    },
    [onSearchChange],
  )

  const renderContent = useCallback(() => {
    if (useCommand) {
      return (
        <Command>
          <CommandInput placeholder={searchPlaceholder || t("search")} className="h-11" />
          <CommandList>
            {isLoading ? (
              loadingContent
            ) : (
              <>
                <CommandEmpty>{noResultsText || t("noResults")}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem key={option.value} value={option.label} onSelect={() => handleSelect(option.value)} className={multiple ? "pl-2" : ""}>
                      {multiple ? (
                        <div className="flex items-center gap-2">
                          <Checkbox checked={isSelected(option.value)} />
                          <span>{option.label}</span>
                        </div>
                      ) : (
                        <>
                          {option.label}
                          <Checkmark16Regular className={cn("ml-auto size-4", isSelected(option.value) ? "opacity-100" : "opacity-0")} />
                        </>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      )
    }

    return (
      <div className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md">
        <div className="flex h-11 items-center gap-2 overflow-hidden border-b px-3">
          <Search16Regular className="size-4 shrink-0 opacity-50" />
          <Input
            placeholder={searchPlaceholder || t("search")}
            className="h-11 focus-visible:border-none focus-visible:ring-0"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="scrollbar-thin max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto">
          {isLoading ? (
            loadingContent
          ) : options.length === 0 ? (
            emptyContent
          ) : (
            <div>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    multiple ? "pl-2" : "",
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <div className="flex w-full items-center gap-2">
                    <Checkbox checked={isSelected(option.value)} />
                    <span className="truncate">{option.label}</span>
                  </div>
                  {/* {multiple ? (
                    <div className="flex items-center gap-2">
                      <Checkbox checked={isSelected(option.value)} />
                      <span>{option.label}</span>
                    </div>
                  ) : (
                    <>
                      <span className="truncate">{option.label}</span>
                      <Checkmark16Regular className={cn("ml-auto size-4 shrink-0", isSelected(option.value) ? "opacity-100" : "opacity-0")} />
                    </>
                  )} */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }, [
    useCommand,
    searchPlaceholder,
    t,
    isLoading,
    loadingContent,
    noResultsText,
    options,
    handleSelect,
    multiple,
    isSelected,
    searchValue,
    handleInputChange,
    emptyContent,
  ])

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal>
      <PopoverTrigger asChild>
        <Button
          variant="input"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", (!value || (Array.isArray(value) && value.length === 0)) && "text-muted-foreground h-11", className)}
          disabled={disabled}
        >
          {getDisplayText}
          {!disabled && <ChevronDownRegular className="size-6 shrink-0" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">{renderContent()}</PopoverContent>
    </Popover>
  )
}
