import { login, logout } from '@/api/auth/auth';
import { isJwtValid } from './jwt';
import { UserData } from '@/interface/api';
import Cookies from 'cookies';
import { default as cki } from 'js-cookie';

import { NextRouter } from 'next/router';
import { makeApiRequest } from '@/api/api';

type checkIsLoggedInProps = {
    cookies: Cookies;
};

function checkIsLoggedIn({ cookies }: checkIsLoggedInProps) {
    const currentToken = decodeURIComponent(cookies.get('token')!);
    const userStr = decodeURIComponent(cookies.get('user')!);
    if (
        currentToken !== 'undefined' &&
        userStr !== 'undefined' &&
        isJwtValid(currentToken) &&
        userStr !== null
    )
        return JSON.parse(userStr);
    return null;
}

type handleLoginProps = {
    user: null | UserData;
    router: NextRouter;
    setUser: (arg0: any) => void;
};

export async function handleLogin({ router, setUser, user }: handleLoginProps) {
    const code = router.query.code;
    if (code === undefined) return;
    try {
        const response = await makeApiRequest({
            config: login({ authorisation_code: code as string }),
            user: user,
            setUser: setUser,
            router: router,
        });
        if (response.data !== null) {
            setUser(response.data['user']);
            cki.set('token', response.data['token']);
            cki.set('user', JSON.stringify(response.data['user']));
        }
        router.replace('/', undefined, { shallow: true });
    } catch (error) {
        console.log(error);
    }
}

type handleLogoutProps = {
    user: null | UserData;
    setUser: (arg0: any) => void;
    router: { replace: (arg0: string) => void };
};

const handleLogout = async ({ user, setUser, router }: handleLogoutProps) => {
    if (user !== null) {
        // try {
        //     await makeApiRequest({ config: logout({ user_id: (user as UserData).id as string }), user: user, setUser: setUser, router: router })
        // } catch (error) {
        //     console.log(error);
        // }
        setUser(null);
        cki.remove('token');
        cki.remove('user');
    }
    router.replace('/');
};

export { checkIsLoggedIn, handleLogout };
