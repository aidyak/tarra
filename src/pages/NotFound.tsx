import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>ページが見つかりませんでした。</p>
      <p>
        <Link to="/">Homeへ戻る</Link>
      </p>
    </div>
  )
}
