import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  isSameDay,
} from 'date-fns'
import { useMemo } from 'react'
import { motion } from 'motion/react'

const daysOfWeek = eachDayOfInterval({
  start: startOfWeek(new Date()),
  end: endOfWeek(new Date()),
})

export default function CalendarGrid({
  displayDate,
  activeDate,
  setActiveDate,
  direction,
  events,
}) {
  const today = new Date()

  const daysOfMonth = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(displayDate)),
      end: endOfWeek(endOfMonth(displayDate)),
    })
  }, [displayDate])

  return (
    <div className='mx-auto mt-6 flex h-[50dvh] min-h-80 w-full max-w-screen-xl flex-col px-2 text-center xl:mt-7'>
      <div className='grid grid-cols-7'>
        {daysOfWeek.map(day => (
          <div
            key={day}
            className='mb-4 text-sm font-semibold text-gray-600 dark:text-gray-400'
          >
            {format(day, 'EEEEE')}
          </div>
        ))}
      </div>
      <motion.div
        key={displayDate}
        initial={{ opacity: 0, x: `${direction * 100}%` }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
        className='grid flex-1 grid-cols-7'
      >
        {daysOfMonth.map(date => (
          <button
            onClick={() => setActiveDate(date)}
            key={date}
            className={`relative flex justify-center border-t border-gray-200 pt-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900 [&:nth-last-child(-n+7)]:border-b ${isSameMonth(date, displayDate) ? '' : 'text-gray-400 dark:text-gray-600'} ${isSameDay(date, activeDate) ? 'bg-gray-100 dark:bg-gray-900' : ''}`}
          >
            <span
              className={`relative z-10 h-fit ${isSameDay(date, today) ? 'leading-tight text-gray-50 after:absolute after:left-1/2 after:top-1/2 after:-z-10 after:h-5 after:w-6 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-gray-800 dark:text-gray-950 dark:after:bg-gray-200' : ''}`}
            >
              {format(date, 'd')}
            </span>
            {events.some(e => isSameDay(e.date, date)) && (
              <span className='absolute top-[30px] h-1 w-9/12 max-w-20 rounded-md bg-sky-500'></span>
            )}
            {isSameDay(date, activeDate) && (
              <motion.span
                layoutId='activeDot'
                transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                className='absolute top-1/2 mt-2 size-2.5 rounded-full bg-sky-500'
              ></motion.span>
            )}
          </button>
        ))}
      </motion.div>
    </div>
  )
}
