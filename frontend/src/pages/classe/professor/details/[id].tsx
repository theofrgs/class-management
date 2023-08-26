import router from 'next/router';
import styles from '@/styles/Home.module.css';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { withUserData } from '@/middleware/WrappedGetServerSide';
import { UserData } from '@/interface/api';
import { makeApiRequest } from '@/api/api';
import React from 'react';
import { addGrade, getClasseProfessorDetails, patchGrade } from '@/api/classe';
import Header from '@/pages/components/Headers';
import Button from '@mui/material/Button';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    makeStyles,
} from '@material-ui/core';
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

enum ActionTypes {
    ADD,
    MODIFY,
}

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
    const [open, setOpen] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState<any>(null);
    const [newGrade, setNewGrade] = useState<string | undefined>(undefined);
    const [actionType, setActionType] = useState<ActionTypes>(ActionTypes.ADD);

    const handleGrade = async () => {
        if (
            newGrade !== undefined &&
            newGrade !== 'undefined' &&
            newGrade !== '' &&
            !Number.isNaN(parseInt(newGrade!))
        ) {
            const intGrade = parseInt(newGrade!);
            try {
                const response = await makeApiRequest({
                    config:
                        actionType == ActionTypes.ADD
                            ? addGrade({
                                  student: selectedGrade['student_id'],
                                  classe: classe!['classe']['id'],
                                  note: intGrade,
                              })
                            : patchGrade(
                                  {
                                      student: selectedGrade['student_id'],
                                      classe: classe!['classe']['id'],
                                      note: intGrade,
                                  },
                                  selectedGrade['grade_id'],
                              ),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
                    if (actionType === ActionTypes.ADD)
                        (classe!['student'] as [any])
                            .find(
                                (student) =>
                                    student['id'] ===
                                    selectedGrade['student_id'],
                            )
                            ['grade'].push(response.data);
                    else
                        (classe!['student'] as [any])
                            .find(
                                (student) =>
                                    student['id'] ===
                                    selectedGrade['student_id'],
                            )
                            ['grade'].find(
                                (grade: any) =>
                                    grade['id'] === selectedGrade['grade_id'],
                            )['note'] = intGrade;
                    setClasse(classe);
                }
            } catch (error) {
                console.log(error);
            }
            handleCloseDialog();
        }
    };

    const handleCancelGrade = () => {
        setNewGrade(undefined);
        setOpen(false);
    };

    const handleOpenDialog = (
        s_id: number,
        g_id: number,
        type: ActionTypes,
    ) => {
        setSelectedGrade({
            student_id: s_id,
            grade_id: g_id,
        });
        setActionType(type);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setNewGrade(undefined);
        setSelectedGrade(null);
        setOpen(false);
    };

    const handleChangeNewGrade = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNewGrade(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleGrade();
        }
    };

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
                    config: getClasseProfessorDetails(
                        id,
                        tmpProfile['professor']['id'],
                    ),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
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
                <div className={classes.name}>{student.name}</div>
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
                                    onClick={() =>
                                        handleOpenDialog(
                                            student.id,
                                            (grade as any)['id'] as number,
                                            ActionTypes.MODIFY,
                                        )
                                    }
                                >
                                    {(grade as any)['note']}
                                </Button>
                            </Grid>
                        ),
                    )}
                    <Button
                        className={classes.gradeItem}
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() =>
                            handleOpenDialog(student.id, 0, ActionTypes.ADD)
                        }
                    >
                        ✚
                    </Button>
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
                            {(classe['student'] as [any]).map(
                                (student, index) => (
                                    <StudentRow student={student} key={index} />
                                ),
                            )}
                        </List>
                    )}
                    <Dialog open={open} onClose={handleCloseDialog}>
                        <DialogTitle> Grade</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label={
                                    actionType == ActionTypes.MODIFY
                                        ? 'Modify Grade'
                                        : 'Add grade'
                                }
                                type="number"
                                onKeyPress={handleKeyPress}
                                value={newGrade !== undefined ? newGrade : ''}
                                onChange={handleChangeNewGrade}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelGrade} color="primary">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleGrade}
                                variant="contained"
                                color="primary"
                            >
                                Grade
                            </Button>
                        </DialogActions>
                    </Dialog>
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
