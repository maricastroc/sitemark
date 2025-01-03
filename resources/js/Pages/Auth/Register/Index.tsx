import { WelcomeContainer } from '@/Components/WelcomeContainer/Index';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';

interface RegisterFormData {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}

interface RegisterFormErrors {
  email?: string;
  password?: string;
  name?: string;
  message?: string;
}

export default function Register() {
  const [data, setData] = useState<RegisterFormData>({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
  });
  
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/register', data);
      if (response?.data.message) {

        await new Promise((resolve) => {
          notyf?.success(response?.data?.message);
          setTimeout(resolve, 2000);
        });
      }
    
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
      <Head title="Register" />
      <div className="flex flex-col md:grid md:grid-cols-2 theme-dracula">
        <WelcomeContainer />

        <div className="flex items-center justify-center px-4 md:bg-white hero lg:px-10">
    <div className="w-full max-w-lg hero-content">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full card bg-base-100 md:shadow-xl">
          <div className="py-6 card-body">
            <label className="w-full form-control">
              <div className="label">
                <span className="text-gray-100 label-text text-md">Your name:</span>
              </div>
              <input
                name="name"
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Jon Doe"
                className="w-full text-gray-100 input input-bordered"
              /> 
              {errors?.name && <span className="mt-1 text-sm text-red-500">{errors?.name}</span>}    
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="text-gray-100 label-text text-md">Your email:</span>
              </div>
              <input
                name="email"
                type="text"
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
                name="password"
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="password"
                className="w-full text-gray-100 input input-bordered"
              />
              {errors?.password && <span className="mt-1 text-sm text-red-500">{errors?.password}</span>}
            </label>
            <label className="w-full form-control">
              <div className="label">
                <span className="text-gray-100 label-text text-md">Confirm your password:</span>
              </div>
              <input
                name="password_confirmation"
                type="password"
                placeholder="confirm password"
                onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                className="w-full text-gray-100 input input-bordered"
              />
              {errors?.password && <span className="mt-1 text-sm text-red-500">{errors?.password}</span>}
            </label>
            <div className="w-full mt-4 card-actions">
            <button className="text-xs font-semibold tracking-widest uppercase btn btn-secondary btn-block">
                      Sign Up
                    </button>
              <a href="/login" className="h-2 text-gray-100 btn btn-link btn-secondary btn-block">or login here</a>
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
