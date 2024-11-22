import Calendar from './features/Calendar/Calendar'
import Header from './features/Header'

export default function App() {
  return (
    <div className='grid h-dvh grid-rows-[auto_1fr] overflow-hidden text-gray-900 dark:text-gray-100'>
      <Header />
      <Calendar />
    </div>
  )
}
