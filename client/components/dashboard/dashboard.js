import React from 'react'
import { PotholeListView } from '../'
import { Analytics } from '../analytics.js'

const Dashboard = () => {
  return (
    <div>
      <Analytics />
      <PotholeListView />
    </div>
  )
}

export default Dashboard
