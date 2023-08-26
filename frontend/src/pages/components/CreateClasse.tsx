import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    makeStyles,
} from '@material-ui/core';
import { createClasse } from '@/api/classe';
import { makeApiRequest } from '@/api/api';
import { useRouter } from 'next/router';
import { default as cki } from 'js-cookie';

const useStyles = makeStyles({
    dialog: {
        minWidth: 400,
    },
});

type Props = {
    open: boolean;
    onClose: () => void;
    user: any | null;
    setUser: (arg0: any) => void;
};

const CreateClassePopupForm: React.FC<Props> = ({
    open,
    onClose,
    user,
    setUser,
}) => {
    const classes = useStyles();
    const [title, setTitle] = useState<string>('');
    const [titleError, setTitleError] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const router = useRouter();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        setTitleError(false);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(event.target.value);
        setDescriptionError(false);
    };

    const handleClose = () => {
        onClose();
        setTitleError(false);
        setTitle('');
        setDescriptionError(false);
        setDescription('');
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (!title) {
            setTitleError(true);
        }
        if (!description) {
            setDescriptionError(true);
        }
        if (title && description) {
            try {
                const response = await makeApiRequest({
                    config: createClasse({
                        title: title,
                        description: description,
                        professors: [user['professor']['id']],
                        students: [],
                        university: user['university']['id'],
                    }),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
                    user['classes'].push(response.data);
                    setUser(user);
                }
            } catch (error) {
                console.log(error);
            }
            handleClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle>Create classe</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={handleTitleChange}
                    error={titleError}
                    helperText={titleError ? 'Please enter a title' : ''}
                />
                <TextField
                    fullWidth
                    multiline
                    label="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    error={descriptionError}
                    helperText={
                        descriptionError ? 'Please enter a description' : ''
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateClassePopupForm;
