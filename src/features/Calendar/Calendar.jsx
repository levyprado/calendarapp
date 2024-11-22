import { useState } from 'react'
import CalendarGrid from './CalendarGrid'
import CalendarHeader from './CalendarHeader'
import { format } from 'date-fns'
import CalendarActions from './CalendarActions'
import useLocalStorage from '../../hooks/useLocalStorage'

export default function Calendar() {
  const [direction, setDirection] = useState(1)
  const [displayDate, setDisplayDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())
  const [events, setEvents] = useLocalStorage('events', [])

  // Dates
  const monthYear = format(displayDate, 'MMMM yyyy')
  const dayMonth = format(activeDate, 'dd MMM')

  const handleNextMonth = () => {
    setDisplayDate(prevDate => {
      const nextMonth = new Date(prevDate)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      setDirection(1)
      return nextMonth
    })
  }
  const handlePreviousMonth = () => {
    setDisplayDate(prevDate => {
      const previousMonth = new Date(prevDate)
      previousMonth.setMonth(previousMonth.getMonth() - 1)
      setDirection(-1)
      return previousMonth
    })
  }

  // Events
  const handleSaveEvent = newEvent => {
    const existingEventIndex = events.findIndex(
      event => event.id === newEvent.id,
    )

    if (existingEventIndex !== -1) {
      setEvents(prevEvents => {
        const updatedEvents = [...prevEvents]
        updatedEvents[existingEventIndex] = newEvent
        return updatedEvents
      })
    } else {
      setEvents(prevEvents => [...prevEvents, newEvent])
    }
  }

  const handleRemoveEvent = event => {
    const newEvents = events.filter(e => e.id !== event.id)
    setEvents(newEvents)
  }

  return (
    <div className='grid grid-rows-[auto_auto_1fr] gap-2 overflow-hidden py-2 xl:gap-3 xl:py-3 2xl:py-4'>
      <CalendarHeader
        monthYear={monthYear}
        handleNextMonth={handleNextMonth}
        handlePreviousMonth={handlePreviousMonth}
        direction={direction}
        setDirection={setDirection}
      />
      <CalendarGrid
        displayDate={displayDate}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
        direction={direction}
        events={events}
      />
      <CalendarActions
        dayMonth={dayMonth}
        activeDate={activeDate}
        events={events}
        handleSaveEvent={handleSaveEvent}
        handleRemoveEvent={handleRemoveEvent}
      />
    </div>
  )
}
