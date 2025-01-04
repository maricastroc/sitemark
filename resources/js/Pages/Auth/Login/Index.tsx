import { WelcomeContainer } from '@/Components/Container';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import Logo from '/public/assets/logo.svg';
import { InputField } from '@/Components/InputField';
import { RedirectContainer } from '@/Components/RedirectContainer';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  message?: string;
}

export default function Login() {
  const [data, setData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', data);

      if (response.data.redirect) {
        window.location.href = response.data.redirect;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data.errors || {});

        if (error.response?.data.errors?.message) {
          notyf?.error(error.response?.data.errors?.message);
        }
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <Head title="Login" />
      <div className="flex flex-col bg-background-primary md:grid md:grid-cols-2">
        <div className="hidden md:flex">
          <WelcomeContainer />
        </div>

        <div className="flex items-center justify-center px-4 py-8 lg:py-0 bg-background-primary hero lg:px-10">
          <div className="flex flex-col w-full max-w-lg hero-content">
            <img src={Logo} alt="Logo" />
            <form onSubmit={handleSubmit} className="max-w-[25rem]">
              <div className="w-full card bg-background-primary md:shadow-xl">
                <div className="flex flex-col gap-2 py-3">
                  <InputField
                    label="E-mail"
                    name="email"
                    type="text"
                    placeholder="Your email here"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    error={errors?.email}
                  />

                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Your password here"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    error={errors?.password}
                  />

                  <RedirectContainer
                    redirectLink="/register"
                    text="Sign up here"
                    title="Don't have an account?"
                    buttonContent="Access Acount"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
