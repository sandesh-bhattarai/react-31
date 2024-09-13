import BaseHttpService, {PaginationProps} from "../../config/http.config";

class BannerService extends BaseHttpService {
    createBanner = async (data: any) => {
        try {
            const response = await this.postRequest(
                `${import.meta.env.VITE_API_VERSION}/banner`,
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
                `${import.meta.env.VITE_API_VERSION}/banner`,       // /api/v1/banner?page=1&limit=10&search=keyword
                {auth: true, params: {page, limit, search}}        // {auth: true, params: {page: 1, search: keyword, limit: 10}}
            )
            return response;
        } catch(exception) {
            throw exception
        }
    }

    deleteBannerById =  async(id: string) => {
        try {
            return await this.deleteRequest(
                `${import.meta.env.VITE_API_VERSION}/banner/${id}`,
                {auth: true}
            )
        } catch(exception) {
            throw exception
        }
    }

    getDetailById = async(id: string) => {
        try {
            return await this.getRequest(
                `${import.meta.env.VITE_API_VERSION}/banner/${id}`,
                {auth: true}
            )
        } catch(error) {
            throw error
        }
    }

    editBanner = async(id: string, data: any) => {
        try {
            return await this.putRequest(
                `${import.meta.env.VITE_API_VERSION}/banner/${id}`,
                data, 
                {auth: true, file: true}
            )
        } catch(exception) {
            throw exception
        }
    }
}
const bannerSvc = new BannerService()
export default bannerSvc;