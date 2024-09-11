import axiosInstance from "./axios.config"

export type AxiosConfigType = {
    auth?: boolean,
    file?: boolean
}

abstract class BaseHttpService {
    #headers = {}

    getHeaders = (config: AxiosConfigType) => {
        
        if(config && config.hasOwnProperty('file')) {
            this.#headers = {
                ...this.#headers,
                "Content-Type": "multipart/form-data"
            }
        }

        if(config && config.hasOwnProperty('auth'))  {
            const token = localStorage.getItem('token') || null;
            if(!token) {
                throw {status: 401, message: "Login Required"}
            }
            this.#headers = {
                ...this.#headers,
                "Authorization": "Bearer "+token
            }
        }

    }

    postRequest = async(url: string, data: any = {}, config: AxiosConfigType = {}) => {
        try {
            this.getHeaders(config);
            // headers populate
            const response = await axiosInstance.post(url, data, {
                headers: {
                    ...this.#headers
                }
            })
            return response;
        } catch(exception) {
            throw exception
        }
    }
    
    getRequest = async (url: string, config: AxiosConfigType = {}) => {
        try {
            this.getHeaders(config);
            const response = await axiosInstance.get(url,{
                headers: {
                    ...this.#headers
                }
            })
            return response;
        } catch(exception) {
            throw exception
        }
    }

    putRequest = async (url: string, data: any = {}, config: AxiosConfigType = {}) => {
        try {
            this.getHeaders(config);
            const response = await axiosInstance.put(url, data, {
                headers: {
                    ...this.#headers
                }
            })
            return response;
        } catch(exception) {
            throw exception
        }
    }

    patchRequest = async (url: string, data: any = {}, config: AxiosConfigType = {}) => {
        try {
            this.getHeaders(config);
            const response = await axiosInstance.patch(url, data, {
                headers: {
                    ...this.#headers
                }
            })
            return response;
        } catch(exception) {
            throw exception
        }
    }

    deleteRequest = async (url: string, config: AxiosConfigType = {}) => {
        try {
            this.getHeaders(config);
            const response = await axiosInstance.delete(url,{
                headers: {
                    ...this.#headers
                }
            })
            return response;
        } catch(exception) {
            throw exception
        }
    }
}

export default BaseHttpService