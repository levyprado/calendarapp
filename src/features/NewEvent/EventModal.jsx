import { ArrowRight, BookText, Clock } from 'lucide-react'
import * as Modal from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import EventModalSelect from './EventModalSelect'
import EventModalSwitch from './EventModalSwitch'
import ActionButton from '../../components/ActionButton'

export default function EventModal({
  event = null,
  activeDate = null,
  children,
  handleSaveEvent,
}) {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const titleRef = useRef(null)
  const [allDay, setAllDay] = useState(event?.allDay)
  const [startTime, setStartTime] = useState(event?.startTime || '09:00')
  const [endTime, setEndTime] = useState(event?.endTime || '17:00')
  const [repeatMode, setRepeatMode] = useState(event?.repeat || 'never')
  const notesRef = useRef(null)
  const [ref, bounds] = useMeasure()

  const handleStartTimeChange = e => {
    if (e.target.value === '') return
    if (e.target.value > endTime) setEndTime(e.target.value)
    setStartTime(e.target.value)
  }

  const handleEndTimeChange = e => {
    if (e.target.value === '') return
    if (e.target.value < startTime) setStartTime(e.target.value)
    setEndTime(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!titleRef.current.value) return
    setIsAddEventOpen(false)
    handleSaveEvent({
      id: event?.id || Date.now(),
      date: event?.date || activeDate,
      title: titleRef.current.value,
      allDay,
      startTime,
      endTime,
      repeat: repeatMode,
      notes: notesRef.current.value,
    })
  }

  return (
    <Modal.Root
      open={isAddEventOpen}
      onOpenChange={o => {
        if (!o) {
          setAllDay(event?.allDay)
          setStartTime(event?.startTime || '09:00')
          setEndTime(event?.endTime || '17:00')
          setRepeatMode(event?.repeat || 'never')
        }
        setIsAddEventOpen(o)
      }}
    >
      {children}
      <AnimatePresence mode='popLayout'>
        {isAddEventOpen && (
          <Modal.Portal forceMount>
            <Modal.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
                className='fixed inset-0 z-20 bg-black/50'
              />
            </Modal.Overlay>
            <Modal.Content
              asChild
              forceMount
              onOpenAutoFocus={e => e.preventDefault()}
              aria-describedby={undefined}
            >
              <motion.form
                onSubmit={handleSubmit}
                initial={{ y: '100%', x: 'var(--x-from)' }}
                animate={{ y: 0 }}
                exit={{ y: '100%', transition: { duration: 0.3 } }}
                transition={{ type: 'spring', bounce: 0 }}
                className='fixed bottom-0 left-0 z-30 mx-auto w-full max-w-2xl rounded-t-lg bg-white px-5 py-3 text-gray-900 [--x-from:0%] sm:left-1/2 sm:[--x-from:-50%] dark:bg-gray-900 dark:text-gray-100'
              >
                <div className='mx-auto w-full max-w-2xl'>
                  <div className='mb-4'>
                    <Modal.Title className='text-lg font-bold'>
                      {event ? event.title : 'New event'}
                    </Modal.Title>
                  </div>
                  <div>
                    <input
                      className='w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow outline-none placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:shadow-gray-50/5 dark:placeholder:text-gray-400'
                      type='text'
                      required
                      placeholder='Title'
                      ref={titleRef}
                      defaultValue={event?.title || ''}
                    />
                  </div>
                  <hr className='my-4 h-px border-0 bg-gray-200 dark:bg-gray-700' />
                  <motion.div
                    animate={{
                      height: bounds.height > 0 ? bounds.height : null,
                    }}
                    className='overflow-hidden rounded-md border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800'
                  >
                    <div
                      className='flex flex-col gap-2.5 overflow-hidden p-2.5'
                      ref={ref}
                    >
                      <EventModalSwitch
                        checked={allDay}
                        onCheckedChange={setAllDay}
                      />
                      {!allDay && (
                        <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-3'>
                          <label
                            className='flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-500 focus-within:ring focus-within:ring-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:shadow-gray-50/5 dark:focus-within:ring-gray-700'
                            htmlFor='startTime'
                          >
                            <Clock className='size-5 shrink-0' />
                            <div className='relative w-12'>
                              <input
                                className='w-full opacity-0'
                                id='startTime'
                                type='time'
                                value={startTime}
                                onChange={handleStartTimeChange}
                              />
                              <span className='absolute inset-x-0 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-100'>
                                {startTime}
                              </span>
                            </div>
                          </label>
                          <span className='flex size-7 items-center justify-center rounded-md border border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700'>
                            <ArrowRight className='size-4' />
                          </span>
                          <label
                            className='flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-500 focus-within:ring focus-within:ring-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:shadow-gray-50/5 dark:focus-within:ring-gray-700'
                            htmlFor='endTime'
                          >
                            <Clock className='size-5 shrink-0' />
                            <div className='relative w-12'>
                              <input
                                className='w-full opacity-0'
                                id='endTime'
                                type='time'
                                value={endTime}
                                onChange={handleEndTimeChange}
                              />
                              <span className='absolute inset-x-0 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-100'>
                                {endTime}
                              </span>
                            </div>
                          </label>
                        </div>
                      )}
                      <EventModalSelect
                        value={repeatMode}
                        onValueChange={setRepeatMode}
                      />
                      <label
                        className='flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
                        htmlFor='notes'
                      >
                        <BookText className='size-5 shrink-0' />
                        <input
                          className='w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-gray-400'
                          id='notes'
                          type='text'
                          placeholder='Notes'
                          ref={notesRef}
                          defaultValue={event?.notes || ''}
                        />
                      </label>
                    </div>
                  </motion.div>
                  <div className='mb-1 mt-6 grid grid-cols-2 gap-4'>
                    <Modal.Close asChild>
                      <ActionButton outline type='button'>
                        Cancel
                      </ActionButton>
                    </Modal.Close>
                    <ActionButton type='submit'>Save Event</ActionButton>
                  </div>
                </div>
              </motion.form>
            </Modal.Content>
          </Modal.Portal>
        )}
      </AnimatePresence>
    </Modal.Root>
  )
}
