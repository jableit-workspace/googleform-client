import { use } from "react";
import { SurveyContainer } from "./_container";

export default function SurveyPage({ searchParams }: { searchParams: { id: number } }) {

  const { id } = searchParams;

  const { result: data } = use(fetch('https://google.vote24.co.kr/question/' + id).then(res => res.json()))

  return <SurveyContainer data={data} id={id} />

}