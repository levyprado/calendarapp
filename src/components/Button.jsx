export default function Button({ onClick, color, size = 'md', icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`z-10 rounded-lg border border-gray-300 p-2 shadow-md transition hover:bg-gray-100 active:translate-y-0.5 dark:border-gray-700 dark:shadow-gray-50/10 dark:hover:bg-gray-900 ${color ? `text-${color}-500` : ''}`}
    >
      <span className={`${size === 'md' ? '[&>*]:size-5' : '[&>*]:size-6'}`}>
        {icon}
      </span>
      <span className='sr-only'>{label}</span>
    </button>
  )
}
