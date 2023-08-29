"use client"; // This is a client component 👈🏽

import Head from 'next/head'
import { FaFacebookF, FaLinkedin, FaGoogle, FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { DefaultApi,  RegisterDTO, } from '../../utils/api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../utils/defaultConfiguration';

export default function Register() {
    const [age, setAge] = useState('');
    const api = new DefaultApi(config);

    const handleAgeChange = (event: SelectChangeEvent<string>) => { // Use SelectChangeEvent type
        setAge(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
        const firstName = (document.getElementById('firstname') as HTMLInputElement)?.value || '';
        const lastName = (document.getElementById('lastname') as HTMLInputElement)?.value || '';
        const password = (document.getElementById('password') as HTMLInputElement)?.value || '';
        const confirmPassword = (document.getElementById('confirmpassword') as HTMLInputElement)?.value || '';

        if (!password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            toast.error('Passwords must contain at least 1 upper case letter, 1 lower case letter 1 number, 1 special character and at least 8 characters.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        const registerDTO: RegisterDTO = {
            email: email,
            password: password,
            age: age,
            first_name: firstName,
            last_name: lastName
        };

        api.authControllerRegister(registerDTO)
            .then(response => {
                console.log(response);

                // TODO handle token mangement
                toast.success("User successfully registered")
            })
            .catch(error => {
                console.log(error.response);
                // TODO code error + Server down
                toast.error(error.response.data.message);
            });
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <Head>
                <title>Class management</title>
                <link rel="icon" href='./favicon.ico'></link>
            </Head>
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className='bg-white rounded-2xl shadow-2xl flex  max-w-4xl'>
                    {/* Section 1 */}
                    <div className='m-5 p-5 text-black'>
                        <div className='text-left font-bold'>
                            <span className='text-green-500'>Company</span>name
                        </div>
                        <div className='w-full py-10 justify-center'>
                            <h2 className='text-3xl font-bold text-green-500 mb-2'>
                                Sign up for your account
                            </h2>
                            <div className='border-2 w-10 border-green-500 inline-block mb-2' />
                            {/* Form section */}
                            <div className='flex flex-col items-center'>
                                <form onSubmit={handleSubmit}>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <FaRegEnvelope className='text-gray-400 m-2' />
                                        <input type='email' id='email' placeholder="Email" className='bg-gray-100 outline-none text-sm flex-1' required />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <FaRegEnvelope className='text-gray-400 m-2' />
                                        <input type='firstname' id='firstname' placeholder="Fist Name" className='bg-gray-100 outline-none text-sm flex-1' required />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <FaRegEnvelope className='text-gray-400 m-2' />
                                        <input type='lastname' id='lastname' placeholder="Last Name" className='bg-gray-100 outline-none text-sm flex-1' required />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <FaRegEnvelope className='text-gray-400 m-2' />
                                        <Select
                                            required
                                            value={age}
                                            onChange={handleAgeChange}
                                            placeholder="Age"
                                            className='bg-gray-100 outline-none text-sm flex-1'
                                            style={{ width: '10px', height: "30px", textAlign: 'left' }}
                                        >
                                            {Array.from({ length: 100 }, (_, index) => (
                                                <MenuItem key={index} value={index}>{index}</MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <MdLockOutline className='text-gray-400 m-2' />
                                        <input type='password' id='password' placeholder="Password" className='bg-gray-100 outline-none text-sm flex-1' required />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-7'>
                                        <MdLockOutline className='text-gray-400 m-2' />
                                        <input type='password' id='confirmpassword' placeholder="Confirm password" className='bg-gray-100 outline-none text-sm flex-1' required />
                                    </div>
                                    <button type="submit" className='border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semi-bold hover:bg-green-500 hover:text-white'>Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
