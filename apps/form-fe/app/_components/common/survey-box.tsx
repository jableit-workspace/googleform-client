
export const SurveyBox = ({ title, children }: { title: string, children?: React.ReactNode }) => {

  return (
    <div key={title} className="w-full px-6 py-6 rounded-md border shadow-md">
      <p className="mb-6">{title}</p>
      {children}
    </div>
  )
}