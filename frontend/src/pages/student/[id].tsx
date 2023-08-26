import router from 'next/router';
import styles from '@/styles/Home.module.css';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Header from '../components/Headers';
import { withUserData } from '@/middleware/WrappedGetServerSide';
import { UserData } from '@/interface/api';
import { makeApiRequest } from '@/api/api';
import { getStudent } from '@/api/profile';
import React from 'react';
import ClassList from '../components/ClasseList';
import AddClassePopupForm from '../components/AddClasse';
import { default as cki } from 'js-cookie';

export default function StudentDetail({
    userData,
    id,
}: {
    userData: UserData | null;
    id: string;
}) {
    const [user, setUser] = useState(userData);
    const [studentData, setStudentData] = useState(null);
    const [openAddClassePU, setOpenAddClassePU] = useState(false);

    const handleOpen = () => {
        setOpenAddClassePU(true);
    };

    const handleClose = () => {
        setOpenAddClassePU(!openAddClassePU);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await makeApiRequest({
                    config: getStudent(id),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
                    setStudentData(response.data);
                    cki.set(
                        'profile',
                        JSON.stringify({ student: response.data['student'] }),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const AddClasseButton = () => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            onClick={handleOpen}
            style={{ cursor: 'pointer' }}
            className={styles.cardAdd}
            rel="noopener noreferrer"
        >
            <h2>Add ✚</h2>
            <p>Add new classe</p>
        </a>
    );

    return (
        <>
            <main className={styles.main}>
                <Header user={user} setUser={setUser} />
                {studentData !== null && (
                    <>
                        <div className={styles.center}>
                            <Typography variant="h3" gutterBottom>
                                My classe {studentData['university']['name']}
                            </Typography>
                        </div>
                        <div className={styles.center}>
                            <ClassList
                                classes={studentData['classes']}
                                user={user}
                                setUser={setUser}
                                profileData={studentData}
                                setProfileData={setStudentData}
                            />
                        </div>
                        <AddClassePopupForm
                            open={openAddClassePU}
                            onClose={handleClose}
                            user={studentData}
                            setUser={setUser}
                        />
                        <AddClasseButton />
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
