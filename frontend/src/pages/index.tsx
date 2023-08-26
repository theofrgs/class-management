import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { checkIsLoggedIn, handleLogin } from '@/tools/auth';
import { UserData } from '@/interface/api';
import Header from './components/Headers';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Cookies from 'cookies';
import CreateProfilePopupForm from './components/CreateProfile';
import { getAllUniversity } from '@/api/university';
import { default as cki } from 'js-cookie';
import { makeApiRequest } from '@/api/api';

const { publicRuntimeConfig: config } = getConfig();

export default function Home({ userData }: { userData: UserData }) {
    const router = useRouter();
    const [user, setUser] = useState(userData);
    const [openCreateProfilePU, setOpenCreateProfilePU] = useState(false);
    const [university, setUniversity] = useState([]);

    const handleOpen = () => {
        setOpenCreateProfilePU(true);
    };

    const handleClose = () => {
        setOpenCreateProfilePU(!openCreateProfilePU);
    };

    const addProfile = (type: string, data: any) => {
        type === 'professor'
            ? user!.professors.push(data)
            : user!.students.push(data);
        setUser(user);
        cki.set('user', JSON.stringify(user));
    };

    useEffect(() => {
        handleLogin({ router, setUser, user });
    }, [router.query]);

    useEffect(() => {
        if (
            cki.get('profile') === undefined ||
            cki.get('profile') === 'undefined'
        )
            return;
        cki.remove('profile');
    }, []);

    useEffect(() => {
        (async () => {
            if (
                cki.get('token') === undefined ||
                cki.get('token') === 'undefined'
            )
                return;
            try {
                const response = await makeApiRequest({
                    config: getAllUniversity(),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
                    setUniversity(response.data);
                }
                router.replace('/', undefined, { shallow: true });
            } catch (error) {
                console.log(error);
            }
        })();
    }, [cki.get('token')]);

    const CreateProfileButton = () => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            onClick={handleOpen}
            style={{ cursor: 'pointer' }}
            className={styles.cardAdd}
            rel="noopener noreferrer"
        >
            <h2>Create ✚</h2>
            <p>Create new profile</p>
        </a>
    );

    const ProfileCard = ({ profile, role }: { profile: any; role: any }) => {
        return (
            <a
                href={`/${role.toLowerCase()}/${profile['id']}`}
                className={styles.card}
                rel="noopener noreferrer"
            >
                <h2>{role}</h2>
                <p>
                    {
                        university.find(
                            (item) => item['id'] === profile['university'],
                        )!['name']
                    }
                </p>
            </a>
        );
    };

    const MyProfiles = () => (
        <div className={styles.cardStatic}>
            <h2>Vos profile(s) </h2>
            <div className={styles.grid}>
                {(user! as UserData).students.map((s, key) => {
                    return <ProfileCard key={key} profile={s} role="Student" />;
                })}
                {(user! as UserData).professors.map((p, key) => {
                    return (
                        <ProfileCard key={key} profile={p} role="Professor" />
                    );
                })}
                <CreateProfilePopupForm
                    open={openCreateProfilePU}
                    onClose={handleClose}
                    user={user}
                    setUser={setUser}
                    addProfile={addProfile}
                    university={university}
                    setUniversity={setUniversity}
                />
                <CreateProfileButton />
            </div>
        </div>
    );

    return (
        <>
            <main className={styles.main}>
                <Header user={user} setUser={setUser} />
                <div className={styles.center}>
                    <Typography variant="h3" gutterBottom>
                        {router.query['code'] == undefined &&
                        university !== undefined &&
                        university.length !== 0 ? (
                            <>
                                {user === null
                                    ? 'University Manager'
                                    : `Welcome back ${
                                          (user! as UserData).account.first_name
                                      }`}
                            </>
                        ) : (
                            <>
                                {user === null
                                    ? 'University Manager'
                                    : 'Connection pending . . .'}
                            </>
                        )}
                    </Typography>
                </div>
                {router.query['code'] == undefined ? (
                    <>
                        {user === null ? (
                            <div className={styles.center}>
                                <a
                                    href={`https://${config.AUTH0_IDENTIFIER}/authorize?response_type=code&client_id=${config.AUTH0_CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&scope=openid+profile}`}
                                    className={styles.card}
                                    target="_parent"
                                    rel="noopener noreferrer"
                                >
                                    <div className={styles.center}>
                                        <h2>Login</h2>
                                    </div>
                                    <p>
                                        We using auth0 to connect with our
                                        application.
                                    </p>
                                </a>
                            </div>
                        ) : (
                            <>
                                {university !== undefined &&
                                university.length !== 0 ? (
                                    <MyProfiles />
                                ) : (
                                    <div className={styles.center}>
                                        <div className={styles.card}>
                                            <div className={styles.center}>
                                                <h2>{''}</h2>
                                            </div>
                                            <p>{''}</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <div className={styles.center}>
                        <div className={styles.card}>
                            <div className={styles.center}>
                                <h2>{''}</h2>
                            </div>
                            <p>{''}</p>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export async function getServerSideProps({
    req,
    res,
}: GetServerSidePropsContext): Promise<
    GetServerSidePropsResult<{ userData?: Record<string, unknown> }>
> {
    const cookies = new Cookies(req, res);
    return {
        props: {
            userData: checkIsLoggedIn({ cookies }),
        },
    };
}
