import { Clock } from 'lucide-react'
import * as Switch from '@radix-ui/react-switch'

export default function EventModalSwitch({ checked, onCheckedChange }) {
  return (
    <div className='flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:shadow-gray-50/5'>
      <label className='flex items-center gap-2' htmlFor='all-day'>
        <Clock className='size-5' />
        <span>All day</span>
      </label>
      <Switch.Root
        className='relative flex h-[25px] w-[42px] items-center rounded-full bg-gray-300 data-[state=checked]:bg-sky-500 dark:bg-gray-500'
        id='all-day'
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <Switch.Thumb className='block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 data-[state=checked]:translate-x-[19px]' />
      </Switch.Root>
    </div>
  )
}
