import router from 'next/router';
import styles from '@/styles/Home.module.css';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { withUserData } from '@/middleware/WrappedGetServerSide';
import { UserData } from '@/interface/api';
import { makeApiRequest } from '@/api/api';
import React from 'react';
import { getClasseStudentDetails } from '@/api/classe';
import Header from '@/pages/components/Headers';
import Button from '@mui/material/Button';
import { Grid, makeStyles } from '@material-ui/core';
import List from '@mui/material/List';

import { default as cki } from 'js-cookie';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        padding: '10px 0',
    },
    name: {
        flexGrow: 1,
        marginRight: 20,
    },
    gradeItem: {
        marginRight: 10,
    },
});

export default function StudentList({
    userData,
    id,
}: {
    userData: UserData | null;
    id: string;
}) {
    const classes = useStyles();
    const [user, setUser] = useState(userData);
    const [profile, setProfile] = useState(null);
    const [classe, setClasse] = useState(null);

    useEffect(() => {
        (async () => {
            if (
                cki.get('profile') === undefined ||
                cki.get('profile') === 'undefined'
            ) {
                router.replace('/');
                return;
            }
            const tmpProfile = JSON.parse(cki.get('profile')!);
            setProfile(tmpProfile);
            try {
                const response = await makeApiRequest({
                    config: getClasseStudentDetails(
                        tmpProfile['student']['id'],
                        id,
                    ),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
                    console.log(response.data);
                    setClasse(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const StudentRow = ({ student }: any) => {
        return (
            <div className={classes.root}>
                <div className={classes.name}>My grade(s)</div>
                <Grid container spacing={1}>
                    {student.grade.map(
                        (
                            grade:
                                | string
                                | number
                                | boolean
                                | React.ReactElement<
                                      any,
                                      string | React.JSXElementConstructor<any>
                                  >
                                | React.ReactFragment
                                | React.ReactPortal
                                | null
                                | undefined,
                            gradeIndex: React.Key | null | undefined,
                        ) => (
                            <Grid item key={gradeIndex}>
                                <Button
                                    className={classes.gradeItem}
                                    variant="contained"
                                    color="primary"
                                >
                                    {(grade as any)['note']}
                                </Button>
                            </Grid>
                        ),
                    )}
                </Grid>
            </div>
        );
    };

    return (
        <>
            <main className={styles.main}>
                <Header user={user} setUser={setUser} />
                <>
                    <div className={styles.center}>
                        <Typography variant="h3" gutterBottom>
                            My classe
                        </Typography>
                    </div>
                    {classe !== undefined && classe !== null && (
                        <List sx={{}}>
                            <StudentRow student={classe} />
                        </List>
                    )}
                    <div className={styles.center}>
                        <div className={styles.card}>
                            <div className={styles.center}>
                                <h2>{''}</h2>
                            </div>
                            <p>{''}</p>
                        </div>
                    </div>
                </>
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
