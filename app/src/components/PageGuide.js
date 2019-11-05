import React from 'react'
import Joyride from 'react-joyride'

export default function PageGuide () {
  return (
    <Joyride
      run
      callback={() => null}
      steps={[
        {
          content:
            'Double click or press enter on this cell to open the custom ColorPicker Editor.',
          target: '.react-grid-Cell:last-child'
        }
      ]}
    />
  )
}
