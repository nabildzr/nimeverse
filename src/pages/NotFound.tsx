import { ApiError } from '../api/client'
import { ErrorView } from '../components/States'
import { useTitle } from '../lib/useTitle'

export default function NotFound() {
  useTitle('404')
  return <ErrorView error={new ApiError(404, 'not found')} />
}
