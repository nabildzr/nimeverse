import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import type { EpisodeDownload } from '../api/types'
import { DownloadPicker } from './DownloadPicker'

afterEach(cleanup)

const dl = (over: Partial<EpisodeDownload>): EpisodeDownload =>
  ({ id: 1, provider: 'Otakudesu', format: 'mp4', quality: '720p', host: 'Pdrain', url: 'https://x.test/a', size: '74 MB', ...over }) as EpisodeDownload

const list = [
  dl({ id: 1, quality: '480p', host: 'Pdrain', url: 'https://x.test/480-pdrain', size: '40 MB' }),
  dl({ id: 2, quality: '720p', host: 'Pdrain', url: 'https://x.test/720-pdrain' }),
  dl({ id: 3, quality: '720p', host: 'GoFile', url: 'https://x.test/720-gofile' }),
  dl({ id: 4, quality: '1080p', host: 'Acefile', url: 'https://x.test/1080-acefile', size: '210 MB' }),
]

describe('DownloadPicker', () => {
  it('starts on the highest resolution and offers its servers', () => {
    render(<DownloadPicker downloads={list} episode={2} />)
    expect(screen.getByRole('combobox', { name: 'Resolusi unduhan' })).toHaveValue('MP4 1080p')
    expect(screen.getByRole('link', { name: /unduh/i })).toHaveAttribute('href', 'https://x.test/1080-acefile')
    const options = [...screen.getByRole('combobox', { name: 'Resolusi unduhan' }).querySelectorAll('option')].map((o) => o.textContent)
    expect(options).toEqual(['MP4 1080p (210 MB)', 'MP4 720p (74 MB)', 'MP4 480p (40 MB)'])
  })

  it('lists only the servers of the chosen resolution and links to the chosen one', () => {
    render(<DownloadPicker downloads={list} episode={2} />)
    fireEvent.change(screen.getByRole('combobox', { name: 'Resolusi unduhan' }), { target: { value: 'MP4 720p' } })
    const servers = [...screen.getByRole('combobox', { name: 'Server unduhan' }).querySelectorAll('option')].map((o) => o.textContent)
    expect(servers).toEqual(['Pdrain (Otakudesu)', 'GoFile (Otakudesu)'])
    expect(screen.getByRole('link', { name: /unduh/i })).toHaveAttribute('href', 'https://x.test/720-pdrain')

    fireEvent.change(screen.getByRole('combobox', { name: 'Server unduhan' }), { target: { value: 'https://x.test/720-gofile' } })
    expect(screen.getByRole('link', { name: /unduh/i })).toHaveAttribute('href', 'https://x.test/720-gofile')
  })

  it('opens the link safely in a new tab', () => {
    render(<DownloadPicker downloads={list} episode={2} />)
    const link = screen.getByRole('link', { name: /unduh/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it('renders nothing without downloads', () => {
    const { container } = render(<DownloadPicker downloads={[]} episode={1} />)
    expect(container).toBeEmptyDOMElement()
  })
})
