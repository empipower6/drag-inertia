# draginertia

> Hello! Welcome to the DragInertia Library. I created this library to be able to drag objects and apply inertia to them when they're dropped. I hope you enjoy it!

[![NPM](https://img.shields.io/npm/v/draginertia.svg)](https://www.npmjs.com/package/draginertia) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save draginertia
```

## Usage

```jsx
import React from 'react'

import DragInertia from 'draginertia'

class Example extends React.Component {
  render() {
    return (
        <>
        <DragInertia inertiaPower={4}><div className="redSquare"></div></DragInertia>
        <DragInertia inertiaPower={2}><div className="tomatoSquare"></div></DragInertia>

        </>
    )
  }
}
```
##Details

You can use DragInertia by inserting your draggable object inside the tags <DragInertia> </DragInertia> as you can see above.

You can set the inertiaPower; 1 being the lowest possible inertia applied to the object and 5 being the highest. If no entries, by default inertiaPower will be taken as 1.

I hope you enjoy it! :) 
## License

MIT © [https://github.com/empipower6](https://github.com/https://github.com/empipower6)
