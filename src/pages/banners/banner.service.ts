import BaseHttpService from "../../config/http.config";

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
}
const bannerSvc = new BannerService()
export default bannerSvc;