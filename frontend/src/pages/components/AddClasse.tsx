import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    makeStyles,
} from '@material-ui/core';
import { addClasse, getUniversityClasse } from '@/api/classe';
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

const AddClassePopupForm: React.FC<Props> = ({
    open,
    onClose,
    user,
    setUser,
}) => {
    const classes = useStyles();
    const [selection, setSelection] = useState<string>('');
    const [classe, setClasse] = useState([]);
    const [selectionError, setSelectionError] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (
                cki.get('token') === undefined ||
                cki.get('token') === 'undefined'
            )
                return;
            try {
                const response = await makeApiRequest({
                    config: getUniversityClasse(
                        user['university']['id'] as string,
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
    }, [cki.get('token')]);

    const handleSelectionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSelection(event.target.value);
        setSelectionError(false);
    };

    const handleClose = () => {
        onClose();
        setSelectionError(false);
        setSelection('');
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (!selection) {
            setSelectionError(true);
        }
        if (selection) {
            try {
                const response = await makeApiRequest({
                    config: addClasse({
                        student_id: user['student']['id'],
                        classe_id: selection,
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
            <DialogTitle>Add classe</DialogTitle>
            <DialogContent>
                <>
                    {classe.length === 0 ? (
                        'No class found'
                    ) : (
                        <TextField
                            select
                            fullWidth
                            label="Class"
                            value={selection}
                            onChange={handleSelectionChange}
                            margin="normal"
                            error={selectionError}
                            helperText={
                                selectionError && 'Please select an option'
                            }
                        >
                            {classe!.map((c, key) => {
                                console.log(classe, user['classes']);
                                return (
                                    <MenuItem key={key} value={c['id']}>
                                        {c['title']}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                    )}
                </>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    disabled={
                        classe.length === 0
                        // classe.some((itemA: any) =>
                        //     user['classes'].some(
                        //         (itemB: any) => itemA['id'] === itemB['id'],
                        //     ),
                        // )
                    }
                >
                    add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddClassePopupForm;
