import { useState } from 'react'
import { DateRangePicker, DateRangePickerItem } from '@tremor/react'
import { es } from 'date-fns/locale'

export function DateRangeSpanish () {
  const [value, setValue] = useState({
    from: new Date(),
    to: new Date()
  })

  return (
    <DateRangePicker
      className='max-w-md mx-auto'
      value={value}
      onValueChange={setValue}
      locale={es}
      selectPlaceholder='Seleccionar'
      color='rose'
    >
      <DateRangePickerItem key='ytd' value='ytd' from={new Date(2023, 0, 1)}>
        Año transcurrido
      </DateRangePickerItem>
      <DateRangePickerItem
        key='half'
        value='half'
        from={new Date(2023, 0, 1)}
        to={new Date(2023, 5, 31)}
      >
        Primer semestre
      </DateRangePickerItem>
    </DateRangePicker>
  )
}
