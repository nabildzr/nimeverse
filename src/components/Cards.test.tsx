import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { EpisodeCardItem } from './Cards'

describe('EpisodeCardItem', () => {
  it('links to the watch URL and shows episode and type badges', () => {
    render(
      <MemoryRouter>
        <EpisodeCardItem
          item={{
            animeSlug: 'kusuriya-no-hitorigoto',
            animeTitle: 'Kusuriya no Hitorigoto',
            coverImage: 'https://example.test/c.jpg',
            format: 'TV',
            status: 'RELEASING',
            number: 7,
            airedAt: '2026-10-15T00:00:00Z',
          }}
        />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/kusuriya-no-hitorigoto-episode-7')
    expect(screen.getByText('Ep 7')).toBeInTheDocument()
    expect(screen.getByText('Anime')).toBeInTheDocument()
    expect(screen.getByText('Sub')).toBeInTheDocument()
    expect(screen.getByText('Kusuriya no Hitorigoto')).toBeInTheDocument()
  })
})
