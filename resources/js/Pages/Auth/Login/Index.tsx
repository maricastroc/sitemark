import { WelcomeContainer } from '@/Components/WelcomeContainer/Index';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';

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
    password: '',
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
        notyf?.error(error.response?.data.errors?.message)
        }
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <Head title="Login" />
      <div className="flex flex-col md:grid md:grid-cols-2 bg-base-100 theme-dracula">
        <WelcomeContainer />

        <div className="flex items-center justify-center px-4 bg-base-100 md:bg-white hero lg:px-10">
          <div className="w-full max-w-md hero-content">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full card bg-base-100 md:shadow-xl">
                <div className="card-body">
                  <div className="mb-4 text-gray-100 card-title">Login here!</div>
                  <label className="w-full form-control">
                    <div className="label">
                      <span className="text-gray-100 label-text text-md">Your email:</span>
                    </div>
                    <input
                      type="text"
                      name="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="user@email.com"
                      className="w-full text-gray-100 input input-bordered"
                    />
                    {errors?.email && <span className="mt-1 text-sm text-red-500">{errors?.email}</span>}
                  </label>
                  <label className="w-full form-control">
                    <div className="label">
                      <span className="text-gray-100 label-text text-md">Your password:</span>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      placeholder="password"
                      className="w-full text-gray-100 input input-bordered"
                    />
                    {errors?.password && <span className="mt-1 text-sm text-red-500">{errors?.password}</span>}
                  </label>
                  <div className="w-full mt-4 card-actions">
                    <button className="btn btn-secondary btn-block text-base-100">Login</button>
                    <Link href="/register" className="text-gray-100 btn btn-link btn-secondary btn-block">
                      or sign up here
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
