import React from 'react'

import { DragInertia } from 'draginertia'
import 'draginertia/dist/index.css'

const App = () => {

  return (
    <>
    <DragInertia inertiaPower={5}> <div className="firstBox"></div> </DragInertia>
    <DragInertia inertiaPower={4}> <div className="secondBox"></div></DragInertia>
    </>


  )

}

export default App
