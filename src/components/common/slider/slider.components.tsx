export type SliderImgeProps = {
    image: string,
    link?: string,
    alt?: string
}
// export const SliderImage = (props: SliderImageProps) => {

export const SliderImage = ({ image, link, alt = "image" }: SliderImgeProps) => {
    // props.alt = "default Value Updated" // error 
    return (<>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            {
                link ? <a href="">
                    {/* <img src={props.image} alt={props.alt} /> */}
                    <img src={image} alt={alt} /></a> : <><img src={image} alt={alt} />
                </>
            }
        </div>
    </>)
}