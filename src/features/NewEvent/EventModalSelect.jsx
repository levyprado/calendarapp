import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDown, RefreshCcw } from 'lucide-react'

const repeatModes = [
  {
    label: 'Never',
    value: 'never',
  },
  {
    label: 'Everyday',
    value: 'everyday',
  },
  {
    label: 'Every Week',
    value: 'everyweek',
  },
  {
    label: 'Every Month',
    value: 'everymonth',
  },
  {
    label: 'Every Year',
    value: 'everyyear',
  },
]

export default function EventModalSelect({ value, onValueChange }) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className='relative inline-flex justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'>
        <div className='flex items-center gap-2'>
          <RefreshCcw className='size-5' />
          <Select.Value placeholder='Repeat' />
        </div>
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className='z-50 w-36 overflow-hidden rounded-md border border-gray-200 bg-white text-gray-500 shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'>
          <Select.Viewport className='p-1'>
            {repeatModes.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

function SelectItem({ children, ...props }) {
  return (
    <Select.Item
      className='group relative flex select-none items-center justify-between rounded-md px-2.5 py-1.5 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900 dark:data-[highlighted]:bg-gray-800 dark:data-[highlighted]:text-gray-100'
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.SelectItemIndicator className='flex justify-end bg-transparent dark:bg-gray-800'>
        <CheckIcon className='size-4 bg-transparent group-[data-highlighted]:bg-gray-100' />
      </Select.SelectItemIndicator>
    </Select.Item>
  )
}
