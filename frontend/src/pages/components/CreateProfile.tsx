import React, { useState } from 'react';
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
import { createProfile } from '@/api/profile';
import { UserData } from '@/interface/api';
import { makeApiRequest } from '@/api/api';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
    dialog: {
        minWidth: 400,
    },
});

type Props = {
    open: boolean;
    onClose: () => void;
    user: UserData | null;
    addProfile: (arg0: string, arg1: any) => void;
    setUser: (arg0: any) => void;
    university: never[] | null;
    setUniversity: (arg0: any) => void;
};

const PopupForm: React.FC<Props> = ({
    open,
    onClose,
    user,
    addProfile,
    setUser,
    university,
    setUniversity,
}) => {
    const classes = useStyles();
    const [type, setType] = useState<string>('');
    const [selection, setSelection] = useState<string>('');
    const [typeError, setTypeError] = useState<boolean>(false);
    const [selectionError, setSelectionError] = useState<boolean>(false);
    const router = useRouter();

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
        setTypeError(false);
    };

    const handleSelectionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSelection(event.target.value);
        setSelectionError(false);
    };

    const handleClose = () => {
        onClose();
        setSelectionError(false);
        setTypeError(false);
        setType('');
        setSelection('');
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (!type) {
            setTypeError(true);
        }
        if (!selection) {
            setSelectionError(true);
        }
        if (type && selection) {
            try {
                const response = await makeApiRequest({
                    config: createProfile({
                        profile_type: type,
                        university: selection,
                    }),
                    user: user,
                    setUser: setUser,
                    router: router,
                });
                if (response.data !== null) {
                    const data = {
                        id: response.data[type]['profile'],
                        profile: user!.account.id,
                        university: response.data['university'],
                    };
                    addProfile(type, data);
                }
            } catch (error) {
                console.log(error);
            }
            handleClose();
        }
    };

    return (
        <>
            {university !== undefined && university !== null && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    classes={{ paper: classes.dialog }}
                >
                    <DialogTitle>Create profile</DialogTitle>
                    <DialogContent>
                        <TextField
                            select
                            fullWidth
                            label="Profile type"
                            value={type}
                            onChange={handleTypeChange}
                            margin="normal"
                            error={typeError}
                            helperText={
                                typeError && 'Please select a profile type'
                            }
                        >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="professor">Professor</MenuItem>
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            label="University"
                            value={selection}
                            onChange={handleSelectionChange}
                            margin="normal"
                            error={selectionError}
                            helperText={
                                selectionError && 'Please select an option'
                            }
                        >
                            {university.map((u, key) => {
                                return (
                                    <MenuItem key={key} value={u['id']}>
                                        {u['name']}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default PopupForm;
