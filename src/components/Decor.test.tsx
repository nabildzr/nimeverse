import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { AccessoryArt, FramedAvatar } from './Decor'

afterEach(cleanup)

describe('AccessoryArt', () => {
  it('renders nothing without a code', () => {
    const { container } = render(<AccessoryArt slot="frame" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('is hidden from assistive technology', () => {
    const { container } = render(<AccessoryArt slot="effect" code="petals" />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('tolerates a code this build does not know', () => {
    expect(() => render(<AccessoryArt slot="frame" code="from-the-future" />)).not.toThrow()
  })

  it('renders character frames such as jotaro and dio with stand aura and menacing kanji', () => {
    const { container } = render(<AccessoryArt slot="frame" code="frame-jotaro" />)
    expect(container.querySelector('svg')).toBeTruthy()
    expect(container.textContent).toContain('ゴ')
  })
})

describe('FramedAvatar', () => {
  const face = { name: 'rina', hasAvatar: false }

  it('adds no frame layer when none is worn', () => {
    const { container } = render(<FramedAvatar face={face} size={80} />)
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(1) // only the letter avatar
  })

  it('draws the frame larger than the avatar so it surrounds it', () => {
    const { container } = render(<FramedAvatar face={face} frame="neon" size={80} />)
    const layer = [...container.querySelectorAll<HTMLElement>('span[aria-hidden="true"]')].find((e) => e.style.width === '125px')
    expect(layer).toBeTruthy()
    expect(layer!.style.left).toBe('-22.5px')
  })
})
