'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CURRENCIES, type CurrencyCode } from '@/lib/fx-rates'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface CurrencySwitcherProps {
  value: CurrencyCode
  onChange: (code: CurrencyCode) => void
  className?: string
  /** Compact variant — icon + flag only */
  compact?: boolean
  align?: 'start' | 'center' | 'end'
}

export function CurrencySwitcher({
  value,
  onChange,
  className,
  compact = false,
  align = 'start',
}: CurrencySwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const selected = CURRENCIES.find((c) => c.code === value) ?? CURRENCIES[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select display currency"
            className={cn(
              'justify-between gap-2',
              compact ? 'w-auto px-3' : 'w-full sm:w-[260px]',
              className
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <span aria-hidden="true" className="text-base leading-none">
                {selected.flag}
              </span>
              <span className="font-medium">{selected.code}</span>
              {!compact && (
                <span className="text-muted-foreground truncate">
                  · {selected.name}
                </span>
              )}
            </span>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        }
      />
      <PopoverContent className="w-[260px] p-0" align={align}>
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {CURRENCIES.map((c) => (
                <CommandItem
                  key={c.code}
                  value={`${c.code} ${c.name}`}
                  onSelect={() => {
                    onChange(c.code)
                    setOpen(false)
                  }}
                  className="gap-2"
                >
                  <span aria-hidden="true" className="text-base">
                    {c.flag}
                  </span>
                  <span className="font-medium">{c.code}</span>
                  <span className="text-muted-foreground truncate">
                    {c.name}
                  </span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === c.code ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
