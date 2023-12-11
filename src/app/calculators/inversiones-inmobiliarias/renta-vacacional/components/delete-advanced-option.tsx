import { TrashIcon } from '@/components/icons'

export default function DeleteAdvancedOption({ id, onClick }: {
  id: number
  onClick: () => void
}) {
  return (
    <button className='text-primary hover:rounded-full p-2 hover:bg-secondary' aria-label={`delete-option-${id}`} onClick={onClick} type='button'>
      <TrashIcon />
    </button>
  )
}
