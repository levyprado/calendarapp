export default function ActionButton({
  onClick,
  children,
  size = 'md',
  outline = false,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border-2 border-sky-500 ${size === 'sm' ? 'px-2 py-1.5' : 'py-2.5'} font-bold transition-colors hover:border-sky-600 ${outline ? 'bg-transparent text-sky-500 hover:text-sky-600' : 'bg-sky-500 text-white hover:bg-sky-600'}`}
      {...props}
    >
      {children}
    </button>
  )
}
