import { Spacing } from "@repo/ui";

export const ResultScreen = ({ data }: any) => {

  return (
    <>
      <div className="w-full px-6 py-6 rounded-md border shadow-md">
        <p className="text-lg font-medium" >응답 {data.write_cnt}</p>
      </div>
      <Spacing size={10} />
      {data?.list?.map((item: any) => (
        <div key={item.id} className="w-full px-6 py-6 rounded-md border shadow-md">
          <p className="text-lg font-medium">{item.title}</p>
          <Spacing size={10} />
          <div className="flex flex-col gap-2">
            {item.options?.map((option: any) => {
              if (item.type === 1) return <p key={option.id}>{option.answer}</p>
              return <p key={option.id}>{option.name + ' ' + option.choice}</p>
            })}
          </div>
        </div>
      ))}
    </>
  )
}