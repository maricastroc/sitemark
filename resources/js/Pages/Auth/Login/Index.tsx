import { Head, Link } from '@inertiajs/react';

export default function Login() {
    return (
        <>
        <Head title="Login" />
        <div className="flex flex-col md:grid md:grid-cols-2 bg-base-100 theme-dracula">
          <div className="flex items-center justify-center min-h-screen px-4 hero md:px-10 lg:px-40 bg-base-100">
            <div className="text-center md:-mt-20 hero-content md:text-left">
              <div>
                <p className="pt-[3rem] text-lg md:text-xl">
                  Welcome to
                </p>
                <h1 className="text-2xl font-bold ">Lockbox</h1>
                <p className="pt-8 pb-4 text-lg md:pt-4 md:text-xl">
                  where you keep <span className="italic text-secondary">everything</span> safely.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 bg-base-100 md:bg-white hero lg:px-10">
    <div className="w-full max-w-md hero-content">
      <form action="/login" method="post" className="w-full">
        <div className="w-full card bg-base-100 md:shadow-xl">
          <div className="card-body">
            <div className="mb-4 text-gray-100 card-title">Login here!</div>
            <label className="w-full form-control">
              <div className="label">
                <span className="text-gray-100 label-text text-md">Your email:</span>
              </div>
              <input type="text" name="email" placeholder="user@email.com" className="w-full text-gray-100 input input-bordered" />
          
            </label>
                  <label className="w-full form-control">
              <div className="label">
                <span className="text-gray-100 label-text text-md">Your password:</span>
              </div>
              <input type="password" name="password" placeholder="password" className="w-full text-gray-100 input input-bordered" />
            
            </label>
            <div className="w-full mt-4 card-actions">
              <button className="btn btn-secondary btn-block text-base-100">Login</button>
              <a href="/register" className="text-gray-100 btn btn-link btn-secondary btn-block">or sign up here</a>
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
