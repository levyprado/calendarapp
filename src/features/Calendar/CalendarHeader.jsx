import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../components/Button'
import { motion } from 'framer-motion'

export default function CalendarHeader({
  monthYear,
  handlePreviousMonth,
  handleNextMonth,
  direction,
}) {
  return (
    <nav className='mx-auto flex w-full max-w-screen-xl items-center justify-between px-4'>
      <Button
        onClick={handlePreviousMonth}
        icon={<ChevronLeft />}
        label='Previous'
      />
      <motion.p
        key={monthYear}
        initial={{ opacity: 0, x: `${direction * 100}%` }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
        className='text-lg font-semibold md:text-xl xl:text-2xl'
      >
        {monthYear}
      </motion.p>

      <Button onClick={handleNextMonth} icon={<ChevronRight />} label='Next' />
    </nav>
  )
}
