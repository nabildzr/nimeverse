import { useEffect } from 'react'

const SITE = 'AniVerse'

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} - ${SITE}` : `${SITE} - Nonton Anime Subtitle Indonesia`
  }, [title])
}
