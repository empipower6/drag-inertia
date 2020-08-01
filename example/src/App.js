import React from 'react'

import  DragInertia  from 'draginertia'
import 'draginertia/dist/index.css'

const App = () => {

  return (
      <>
      <DragInertia inertiaPower={4}><div className="drag"></div></DragInertia>
      </>
  )

}

export default App
