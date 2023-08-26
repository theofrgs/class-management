import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Cookies from 'cookies';
import { checkIsLoggedIn } from '@/tools/auth';

type Props = {
    userData?: Record<string, unknown>;
    id?: string;
};

type WrappedGetServerSideProps = (
    context: GetServerSidePropsContext,
    cookies: Cookies,
) => Promise<GetServerSidePropsResult<Props>>;

export const withUserData = (
    wrappedGetServerSideProps: WrappedGetServerSideProps,
) => {
    return async (
        context: GetServerSidePropsContext,
    ): Promise<GetServerSidePropsResult<Props>> => {
        const cookies = new Cookies(context.req, context.res);
        const userData = checkIsLoggedIn({ cookies });
        if (!userData) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
        const wrappedProps = await wrappedGetServerSideProps(context, cookies);
        if ('props' in wrappedProps) {
            return {
                ...wrappedProps,
                props: {
                    ...wrappedProps.props,
                    userData,
                },
            };
        }
        return wrappedProps;
    };
};
