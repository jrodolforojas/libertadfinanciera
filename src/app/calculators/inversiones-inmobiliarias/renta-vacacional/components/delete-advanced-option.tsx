import { TrashIcon } from '@/components/icons'

export default function DeleteAdvancedOption({ onClick }: {
  onClick: () => void
}) {
  return (
    <button className='text-primary hover:rounded-full p-2 hover:bg-secondary' onClick={onClick}>
      <TrashIcon />
    </button>
  )
}
