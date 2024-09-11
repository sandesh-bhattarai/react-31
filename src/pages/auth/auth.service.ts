import BaseHttpService from "../../config/http.config";
import { CredentialType } from "./login/login.page";
import { RegisterDataType } from "./register/register.page";

class AuthService extends BaseHttpService{
    login = async(data: CredentialType) => {
        try {
            const {data: response} = await this.postRequest(
                import.meta.env.VITE_API_VERSION+'/auth/login',
                data
            );
            
            localStorage.setItem('token',response.result.token.access);
            localStorage.setItem('refresh',response.result.token.refresh);

            return response;
        } catch(exception) {
            throw exception;
        }
    }

    register = async(data: RegisterDataType) => {
        try {
            // FormData 
            // const formData = new FormData()
            // formData.append("name", data.name as string);
            // formData.append("email", data.email as string);
            // formData.append("password", data.password as string);
            // formData.append("passwordConfirmation", data.passwordConfirmation as string);

            // formData.append("image", data.image, data.image.name)

            const response = await this.postRequest(import.meta.env.VITE_API_VERSION+'/auth/register', data, {file: true});
            return response;
        } catch(exception) {
            throw exception
        }
    }

    activateUser = async(token: string) => {
        try {
            const res = await this.getRequest(import.meta.env.VITE_API_VERSION+'/auth/activate/'+token);
            return res;
        } catch(exception) {
            throw exception;
        }
    }

    resendActivationToken = async(token: string) => {
        try {
            const res = await this.getRequest(import.meta.env.VITE_API_VERSION+'/auth/re-send/activation/'+token);
            return res;
        } catch(exception) {
            throw exception;
        }
    }

    getLoggedInuser = async() => {
        try {
            const res = await this.getRequest(import.meta.env.VITE_API_VERSION+'/auth/me',{auth:true})
            return res;
        } catch(exception) {
            throw exception
        }
    }
}

const authSvc = new AuthService()

export default authSvc;