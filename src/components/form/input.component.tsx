import { useEffect, useState } from "react"
import { useController } from "react-hook-form"
import Select from "react-select"
export enum InputTypeEnum {
    TEXT= 'text',
    EMAIL= 'email',
    NUMBER= 'number',
    URL= "url",
    PASSWORD= "password",
    TEL= 'tel',
    DATE='date',
    TIME='time'
}

export type TextInputProps ={
    name: string,
    defaultValue?: any,
    type?: InputTypeEnum,
    control: any,
    errMsg?: string | null | undefined,
    placeholder?: string
}

export type FileInputProps = {
    name: string, 
    setValue: any,
    multiple?: boolean,
    thumbClass?: string,
    thumbsize?: string,
    thumbnail?: any
}

export type TextAreaProps = {
    name: string,
    defaultValue?: any,
    type?: InputTypeEnum,
    control: any,
    errMsg?: string | null | undefined,
    placeholder?: string,
    rows?: number
}

export type InputLabelProps = {
    htmlFor: string, 
    label: string
}

export type OptionType = {
    label: string, 
    value: string
}

export type SelectInputProps = {
    name: string,
    control: any,
    options: OptionType[],
    errMsg?: string | null | undefined,
    multiple?: boolean
}

export const InputLabelComponet = ({htmlFor, label}: InputLabelProps) => {
    return (<>
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
    </>)
}


export const TextInputComponent = ({type = InputTypeEnum.TEXT, placeholder="Enter your value...", defaultValue="", name, control, errMsg}: TextInputProps) => {
    const {field} = useController({
        name: name, 
        control:control,
        defaultValue: defaultValue
    })
    return (<>
        <input
            type={type}
            {...field}
            placeholder={placeholder}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus-within:ring-gray-200"
        />
        <span className="text-red-800">{errMsg}</span>
    </>)
}

export const SelectOption = ({name, control, errMsg, options, multiple=false}: SelectInputProps) => {
    const {field} = useController({
        name: name, 
        control: control
    })
    return (<>
        <Select 
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            {...field}
            isMulti={multiple}
            isClearable    
            options={options} />
        <span className="text-red-800">{errMsg}</span>
    </>)
}

export const TextAreaInputComponent = ({
    name, 
    control, 
    defaultValue="",
    placeholder="",
    rows=5,
    errMsg=null
}: TextAreaProps) => {
    const {field} = useController({
        name: name, 
        control: control, 
        defaultValue: defaultValue
    })
    return (<>
    <textarea
        {...field}
        style={{resize: "none"}}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
    ></textarea>
    <span className="text-red-800">{errMsg}</span>
    </>)
}

export const FileInputComponent = ({name, setValue, multiple =false, thumbClass='rounded-full', thumbsize='200x200', thumbnail=null}: FileInputProps) => {
    const [thumb, setThumb]= useState<any>()

    const handleChange = (e: any) => {
        if(multiple) {
            setValue(name, Object.values(e.target.files))
            setThumb(Object.values(e.target.files))
        } else {
            setValue(name, e.target.files[0])
            setThumb(e.target.files[0])
        }
    }

    useEffect(() => {
        if(thumbnail) {
            setThumb(thumbnail)
        }
    }, [thumbnail])

    return (<>
        <div className="flex">
            <div className={`${multiple ? 'w-full' : 'w-3/4'}`}>
                <input 
                    className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-40`} 
                    onChange={handleChange}
                    multiple={multiple}
                    type="file"
                /> 
            </div>
            {
                !multiple ? <>
                    <div className="w-1/4 ms-2">
                        {
                            thumb && typeof thumb === 'object' ? <img className={`${thumbClass} w-full`} src={URL.createObjectURL(thumb)} /> : <>
                            
                            {thumb && typeof thumb === 'string' ? <>
                                <img className={`${thumbClass} w-full`} src={thumb} />
                            </> : <img src={`https://placehold.co/${thumbsize}?text=No+image`} className={thumbClass}/>}
                        
                            </>
                        }
                    </div>
                </> : <></>
            }    
            
        </div>
        <div className="flex mt-4">
            {
                multiple && thumb && Array.isArray(thumb) ? <>
                {
                    thumb.map((image: any, i: number) =>(
                        <div className="w-1/3 me-3 mb-3" key={i}>
                            <img className={`${thumbClass} w-full`} src={URL.createObjectURL(image)} />
                        </div>
                    ))
                }
                </> : <></>
            }
        </div>
    </>)
}