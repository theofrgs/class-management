import { useState } from 'react';
import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton,
    Box,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeApiRequest } from '@/api/api';
import { deleteClasse, removeClasse } from '@/api/classe';
import router from 'next/router';

type Props = {
    classes: any[];
    user: any | null;
    setUser: (arg0: any) => void;
    profileData: any | null;
    setProfileData: (arg0: any) => void;
};

const ClassList: React.FC<Props> = ({
    classes,
    user,
    setUser,
    profileData,
    setProfileData,
}) => {
    const [selectedClass, setSelectedClass] = useState<any | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [classesData, setClasseData] = useState(classes);

    const handleListItemClick = (classObj: any) => {
        setSelectedClass(classObj);
        setDialogOpen(true);
    };

    async function handleDeleteClass() {
        if (selectedClass) {
            const id = selectedClass['id'];
            setDialogOpen(false);
            setSelectedClass(null);
            try {
                const type = profileData.hasOwnProperty('student')
                    ? 'student'
                    : 'professor';
                const response = await makeApiRequest({
                    config:
                        type == 'professor'
                            ? deleteClasse(id)
                            : removeClasse({
                                  student_id: profileData['student']['id'],
                                  classe_id: id,
                              }),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
                    profileData!['classes'] = (
                        profileData!['classes'] as Array<any>
                    ).filter((c) => c['id'] !== id) as never;
                    setProfileData(profileData);
                    setClasseData(profileData!['classes']);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedClass(null);
    };

    return (
        <>
            {classesData !== undefined && (
                <List>
                    {classesData.map((classObj) => (
                        <ListItem button key={classObj['id']}>
                            <ListItemText
                                primary={
                                    <Box
                                        component="span"
                                        display="block"
                                        onClick={() => {
                                            const type =
                                                profileData.hasOwnProperty(
                                                    'student',
                                                )
                                                    ? 'student'
                                                    : 'professor';
                                            router.replace(
                                                `/classe/${type}/details/${classObj['id']}`,
                                            );
                                        }}
                                    >
                                        {classObj['title']}
                                    </Box>
                                }
                            />
                            <ListItemIcon>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() =>
                                        handleListItemClick(classObj)
                                    }
                                >
                                    <Delete color="error" />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            )}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Delete Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the class &quot
                        {selectedClass?.name}&quot?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={handleDeleteClass}
                        color="secondary"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ClassList;
