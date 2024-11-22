import { Plus } from 'lucide-react'

export default function EventModalButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className='rounded-full bg-sky-500 p-3.5 text-gray-50 shadow-md transition hover:bg-sky-600 active:translate-y-0.5 xl:p-4 dark:shadow-gray-50/10'
    >
      <Plus className='size-7 xl:size-8' />
      <span className='sr-only'>Add event</span>
    </button>
  )
}
