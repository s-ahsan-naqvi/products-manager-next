"use client"

import {useState, useEffect } from 'react'

import StoreModal from '@/components/modals/store-modal'

const ModalProvider = () => {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  } else {
    return <StoreModal />
  }
}

export default ModalProvider