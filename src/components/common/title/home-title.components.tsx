export type HomeSectionTitleProps  = {
    title: string,
    link?: string | null
}
export const HomePageSectionTitle = ({title, link}: HomeSectionTitleProps) => {
    return (<>
        <div className="max-w-screen-xl my-5  px-4 mx-auto 2xl:px-0 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-teal-800">{title}</h1>
                
                {
                    (link) ? <a href={link} className="text-teal-700 underline hover:cursor-pointer hover:bg-teal-400 hover:py-1 hover:px-2 hover:rounded-md "> View All &rarr;</a> : ""
                }
            </div>
        </div>
    </>)
}