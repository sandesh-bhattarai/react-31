import BaseHttpService, {PaginationProps} from "../../config/http.config";

class BrandService extends BaseHttpService {
    createBrand = async (data: any) => {
        try {
            const response = await this.postRequest(
                `${import.meta.env.VITE_API_VERSION}/brand`,
                data, 
                {auth: true, file: true}
            )
            return response
        } catch(exception) {
            throw exception
        }
    }

    listAllData = async({page, limit, search}: PaginationProps) => {
        // limit, current, search
        try {
            const response = await this.getRequest(
                `${import.meta.env.VITE_API_VERSION}/brand`,       // /api/v1/brand?page=1&limit=10&search=keyword
                {auth: true, params: {page, limit, search}}        // {auth: true, params: {page: 1, search: keyword, limit: 10}}
            )
            return response;
        } catch(exception) {
            throw exception
        }
    }

    deleteBrandById =  async(id: string) => {
        try {
            return await this.deleteRequest(
                `${import.meta.env.VITE_API_VERSION}/brand/${id}`,
                {auth: true}
            )
        } catch(exception) {
            throw exception
        }
    }

    getDetailById = async(id: string) => {
        try {
            return await this.getRequest(
                `${import.meta.env.VITE_API_VERSION}/brand/${id}`,
                {auth: true}
            )
        } catch(error) {
            throw error
        }
    }

    editBrand = async(id: string, data: any) => {
        try {
            return await this.putRequest(
                `${import.meta.env.VITE_API_VERSION}/brand/${id}`,
                data, 
                {auth: true, file: true}
            )
        } catch(exception) {
            throw exception
        }
    }

    getForHome = async() => {
        try {
            return await this.getRequest(
                `${import.meta.env.VITE_API_VERSION}/brand/list-home`
            )
        } catch(exception) {
            throw exception
        }
    }
}
const brandSvc = new BrandService()
export default brandSvc;