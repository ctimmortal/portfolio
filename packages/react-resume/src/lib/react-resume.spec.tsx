import { render } from '@testing-library/react'

import { describe, expect, it } from 'vitest'
import ReactResume from './react-resume'

describe('ReactResume', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactResume />)
    expect(baseElement).toBeTruthy()
  })
})
