import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from '@/styles/Home.module.css';
import { handleLogout } from '@/tools/auth';
import { UserData } from '@/interface/api';
import Head from 'next/head';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

type Props = {
    user: UserData | null;
    setUser: (arg0: any) => void;
};

export default function Header({ user, setUser }: Props) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>JustPaid</title>
                <meta
                    name="description"
                    content="JustPaid test, university class management"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.description}>
                <a href="/">JustPaid test</a>
                <div style={{ display: 'flex' }}>
                    <a
                        href="https://www.linkedin.com/in/theo-fargeas-127046197/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Typography variant="subtitle1">
                            By Théo Fargeas
                        </Typography>
                        <LinkedInIcon />
                    </a>
                    {user !== null ? (
                        <IconButton
                            onClick={() => {
                                handleLogout({ user, setUser, router });
                            }}
                            color="inherit"
                        >
                            <ExitToAppIcon />
                        </IconButton>
                    ) : null}
                </div>
            </div>
        </>
    );
}
