'use client'

import { useState } from 'react'

const OPTIONS = {
  TRUE: 1,
  FALSE: 0
}

export default function useSwitch() {
  const [isSelected, setIsSelected] = useState(OPTIONS.FALSE)
  const isActive = isSelected === OPTIONS.TRUE

  const toggleValue = () => {
    isSelected === OPTIONS.FALSE ? setIsSelected(OPTIONS.TRUE) : setIsSelected(OPTIONS.FALSE)
  }

  return {
    isActive,
    isSelected,
    toggleValue
  }
}
