'use client'

import { useTheme } from "next-themes"
import { DarkModeIcon, LightModeIcon } from "./icons"
import { useEffect, useState } from "react"

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    setMounted(true)
  }, [resolvedTheme])

  if (!mounted) {
    return null
  }

  return (
    <button onClick={toggleTheme}>
      {resolvedTheme === 'light' && <DarkModeIcon />}
      {resolvedTheme === 'dark' && <LightModeIcon />}
    </button>
  )

}