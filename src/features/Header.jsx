import { Moon, Sun } from 'lucide-react'
import Button from '../components/Button'
import useLocalStorage from '../hooks/useLocalStorage'
import { useEffect } from 'react'

export default function Header() {
  const [theme, setTheme] = useLocalStorage(
    'theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    if (theme === 'dark') {
      document.documentElement.classList.remove('bg-gray-50')
      document.documentElement.classList.add('bg-gray-950')
    } else {
      document.documentElement.classList.remove('bg-gray-950')
      document.documentElement.classList.add('bg-gray-50')
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header className='mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-3 xl:py-4'>
      <h1 className='text-2xl font-bold text-sky-500 xl:text-3xl'>
        Calendar App
      </h1>
      <Button
        onClick={toggleTheme}
        size='md'
        icon={theme === 'dark' ? <Sun /> : <Moon />}
        label='Toggle Theme'
      />
    </header>
  )
}
