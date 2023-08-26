import router from 'next/router';
import styles from '@/styles/Home.module.css';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Header from '../components/Headers';
import { withUserData } from '@/middleware/WrappedGetServerSide';
import { UserData } from '@/interface/api';
import { makeApiRequest } from '@/api/api';
import { getProfessor } from '@/api/profile';
import React from 'react';
import ClassList from '../components/ClasseList';
import CreateClassePopupForm from '../components/CreateClasse';
import { default as cki } from 'js-cookie';

export default function ProfessorDetail({
    userData,
    id,
}: {
    userData: UserData | null;
    id: string;
}) {
    const [user, setUser] = useState(userData);
    const [professorData, setProfessorData] = useState(null);
    const [openCreateClassePU, setOpenCreateClassePU] = useState(false);

    const handleOpen = () => {
        setOpenCreateClassePU(true);
    };

    const handleClose = () => {
        setOpenCreateClassePU(!openCreateClassePU);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await makeApiRequest({
                    config: getProfessor(id),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
                    setProfessorData(response.data);
                    cki.set(
                        'profile',
                        JSON.stringify({
                            professor: response.data['professor'],
                        }),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const CreateClasseButton = () => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            onClick={handleOpen}
            style={{ cursor: 'pointer' }}
            className={styles.cardAdd}
            rel="noopener noreferrer"
        >
            <h2>Create ✚</h2>
            <p>Create new classe</p>
        </a>
    );

    return (
        <>
            <main className={styles.main}>
                <Header user={user} setUser={setUser} />
                {professorData !== null && (
                    <>
                        <div className={styles.center}>
                            <Typography variant="h3" gutterBottom>
                                My classe {professorData['university']['name']}
                            </Typography>
                        </div>
                        <div className={styles.center}>
                            <ClassList
                                classes={professorData['classes']}
                                user={user}
                                setUser={setUser}
                                profileData={professorData}
                                setProfileData={setProfessorData}
                            />
                        </div>
                        <CreateClassePopupForm
                            open={openCreateClassePU}
                            onClose={handleClose}
                            user={professorData}
                            setUser={setUser}
                        />
                        <div></div>
                        <CreateClasseButton />
                    </>
                )}
            </main>
        </>
    );
}

export const getServerSideProps = withUserData(async ({ params }) => {
    return {
        props: {
            id: params?.id ? String(params.id) : '',
        },
    };
});
