import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { CircleX } from 'lucide-react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useState } from 'react'
import ActionButton from '../../components/ActionButton'

export default function ConfirmDeleteDialog({ handleRemoveEvent }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>
        <button>
          <CircleX className='size-5' />
          <span className='sr-only'>Delete event</span>
        </button>
      </AlertDialog.Trigger>
      <MotionConfig transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.2 }}>
        <AnimatePresence>
          {isOpen && (
            <AlertDialog.Portal forceMount>
              <AlertDialog.Overlay asChild forceMount>
                <motion.div
                  key={isOpen}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm'
                />
              </AlertDialog.Overlay>
              <AlertDialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: '-50%', x: '-50%' }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className='fixed left-1/2 top-1/2 z-[60] w-11/12 max-w-md -translate-y-1/2 rounded-md bg-white px-4 py-3 shadow-lg dark:bg-gray-800'
                >
                  <AlertDialog.Title className='mb-1 font-bold text-gray-900 dark:text-gray-100'>
                    Are you sure?
                  </AlertDialog.Title>
                  <AlertDialog.Description className='leading-tight text-gray-500 dark:text-gray-400'>
                    This action will delete the event permanently.
                  </AlertDialog.Description>
                  <div className='mt-4 flex items-center justify-end gap-2'>
                    <AlertDialog.Cancel asChild>
                      <ActionButton size='sm' outline>
                        Cancel
                      </ActionButton>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <ActionButton onClick={handleRemoveEvent} size='sm'>
                        Delete event
                      </ActionButton>
                    </AlertDialog.Action>
                  </div>
                </motion.div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          )}
        </AnimatePresence>
      </MotionConfig>
    </AlertDialog.Root>
  )
}

export const ConfirmDeleteDialogRoot = AlertDialog.Root
export const ConfirmDeleteDialogTrigger = AlertDialog.Trigger
