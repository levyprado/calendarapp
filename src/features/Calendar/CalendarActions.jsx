import CalendarItem from './CalendarItem'
import EventModal from '../NewEvent/EventModal'
import EventModalButton from '../NewEvent/EventModalButton'
import { Trigger } from '@radix-ui/react-dialog'
import { isSameDay } from 'date-fns'

export default function CalendarActions({
  dayMonth,
  activeDate,
  events,
  handleSaveEvent,
  handleRemoveEvent,
}) {
  return (
    <>
      <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-2 overflow-hidden'>
        <span className='px-4 text-xs text-gray-500 md:text-sm dark:text-gray-400'>
          {dayMonth}.
        </span>
        <ul className='flex-1 overflow-y-auto'>
          {events.some(e => isSameDay(e.date, activeDate)) ? (
            events.map(
              e =>
                isSameDay(e.date, activeDate) && (
                  <CalendarItem
                    key={e.id}
                    event={e}
                    handleSaveEvent={handleSaveEvent}
                    handleRemoveEvent={handleRemoveEvent}
                  />
                ),
            )
          ) : (
            <span className='flex h-full items-center justify-center px-4 text-sm text-gray-600 md:text-base dark:text-gray-300'>
              Click the + button to add an event for this day.
            </span>
          )}
        </ul>
        <div className='flex items-end justify-between px-4 py-1'>
          <small className='text-sm text-sky-500 xl:text-base'>
            By{' '}
            <a
              className='font-semibold underline underline-offset-2'
              href='https://github.com/levyprado'
              target='_blank'
            >
              Levy P.
            </a>
          </small>
          <EventModal handleSaveEvent={handleSaveEvent} activeDate={activeDate}>
            <Trigger asChild>
              <EventModalButton />
            </Trigger>
          </EventModal>
        </div>
      </div>
    </>
  )
}
