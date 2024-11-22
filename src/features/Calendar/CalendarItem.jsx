import { CalendarFold } from 'lucide-react'
import EventModal from '../NewEvent/EventModal'
import { Trigger } from '@radix-ui/react-dialog'
import ConfirmDeleteDialog from '../Event/ConfirmDeleteDialog'

export default function CalendarItem({
  event,
  handleSaveEvent,
  handleRemoveEvent,
}) {
  return (
    <li className='flex items-center justify-between px-5 py-2 hover:bg-gray-100 active:bg-gray-200 has-[:focus-visible]:bg-gray-100 xl:py-2.5 2xl:py-3 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:has-[:focus-visible]:bg-gray-900'>
      <EventModal event={event} handleSaveEvent={handleSaveEvent}>
        <Trigger asChild>
          <button className='-mx-5 -my-2 flex w-full items-center gap-3 px-5 py-2 text-start transition-colors xl:-my-2.5 2xl:-my-3'>
            <div className='flex size-10 items-center justify-center'>
              <CalendarFold className='size-6 xl:size-7' />
            </div>
            <div>
              <p className='text-sm font-semibold md:text-base md:leading-tight'>
                {event.title}
              </p>
              <p className='text-xs font-medium text-gray-500 md:text-sm dark:text-gray-400'>
                {event.allDay
                  ? 'All day'
                  : `${event.startTime} - ${event.endTime}`}
              </p>
            </div>
          </button>
        </Trigger>
      </EventModal>
      <ConfirmDeleteDialog handleRemoveEvent={() => handleRemoveEvent(event)} />
    </li>
  )
}
