import React from 'react'
import Header from '@/components/Header.js'

export default function App (props) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}
