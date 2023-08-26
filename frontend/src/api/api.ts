import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, UserData } from '@/interface/api';
import { handleLogout } from '@/tools/auth';
// import router from 'next/router';

// const { publicRuntimeConfig: config } = getConfig();

type MakeApiRequestProps = {
    config: AxiosRequestConfig;
    user: null | UserData;
    setUser: (arg0: any) => void;
    router: { replace: (arg0: string) => void };
};

export async function makeApiRequest({
    config,
    user,
    setUser,
    router,
}: MakeApiRequestProps): Promise<ApiResponse> {
    try {
        return (await axios(config)).data;
    } catch (error) {
        if ((error as Error).message === '403') {
            // handleLogout({ user, setUser, router });
            throw new Error('Forbiden');
        }
        if (axios.isAxiosError(error)) {
            if (error.response?.data === undefined) {
                handleLogout({ user, setUser, router });
                console.log('server down');
                throw new Error('Server down');
            }
            if (error.response?.data['code'] === 'auth0_error') {
                handleLogout({ user, setUser, router });
                console.log('Error with auth0 down');
                throw new Error('Auth0 down');
            }
            throw new Error(error.response?.data);
        }
        throw new Error('Error return');
    }
}
