import { use } from "react"
import { ResultScreen } from "./_container"

export default function ResultPage({ searchParams }: { searchParams: { id: number } }) {
  const { id } = searchParams

  const { result } = use(fetch(`https://google.vote24.co.kr/question/statistics/${id}`).then(res => res.json()))

  return (
    <ResultScreen data={result} />
  )
}