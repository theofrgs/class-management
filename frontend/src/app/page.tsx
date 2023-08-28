import Image from 'next/image'
import { FaLinkedin, } from 'react-icons/fa'
import Head from 'next/head'

export default function Home() {
    return (
        // <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <main className="flex flex-col items-center justify-between min-h-screen p-24 bg-gray-100 text-black">
            <Head>
                <title>Class management</title>
                <link rel="icon" href='./favicon.ico'></link>
            </Head>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div className='text-left font-bold'>
                    <span className='text-green-500'>Company</span>name
                </div>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://www.linkedin.com/in/theo-fargeas-127046197"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Théo Fargeas
                        <FaLinkedin />
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen p-24 bg-gray-100 text-black">
                <a
                    href="/login"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Login{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Start using class management
                    </p>
                </a>

            </div>
        </main >
    )
}
