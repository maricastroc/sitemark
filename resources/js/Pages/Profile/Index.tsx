import { useEffect, useRef, useState } from 'react';
import { PhotoInput } from '@/Components/PhotoInput';
import { PrimaryButton } from '@/Components/PrimaryButton';
import { UserProps } from '@/types/user';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { InputField } from '@/Components/InputField';
import { Label } from '@/Components/Label';
import { Error } from '@/Components/Error';
import Layout from '../Layouts/AuthLayout';

interface ProfileProps {
  user: UserProps;
}

interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
  old_password?: string | undefined;
  new_password?: string | undefined;
  avatar_url: File | null;
}

interface ProfileFormErrors {
  name?: string;
  email?: string;
  bio?: string;
  password?: string;
  avatar_url?: string;
  old_password?: string;
  new_password?: string;
}

export default function Profile({ user }: ProfileProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [changePassword, setChangePassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<ProfileFormData>({
    name: user.name,
    email: user.email,
    avatar_url: null,
    bio: user?.bio ?? ''
  });

  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setData({ ...data, avatar_url: file });
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('bio', data.bio);
    formData.append('email', data.email);

    if (data.avatar_url) {
      formData.append('avatar_url', data.avatar_url);
    }

    if (!!changePassword) {
      formData.append('old_password', data.old_password || '');
      formData.append('new_password', data.new_password || '');
    }

    formData.append('_method', 'PUT');

    try {
      setIsLoading(true);

      const response = await axios.post(`profile/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

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

        if (error.response?.data?.message) {
          notyf?.error(error.response?.data?.message);
        }
      } else {
        console.error('Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setData({
        ...data,
        name: user.name,
        email: user.email,
        bio: user.bio ?? ''
      });

      if (user.avatar_url) {
        setPhotoPreview(`storage/${user.avatar_url}`);
      }
    }
  }, [user]);

  return (
    <Layout title="Profile" url="/profile">
      <div className="flex flex-col">
        <div className="flex flex-col w-full mb-3">
          <div className="flex items-center justify-between">
            <h2 className="relative font-black text-heading-small text-content-primary">
              Profile
              <span className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-accent-orange"></span>
            </h2>
            <a
              href="/"
              className="px-3 text-[14px] py-1.5 font-bold transition-all duration-200 rounded-xl text-accent-orange text-label-small bg-background-tertiary hover:bg-background-secondary brightness-100 hover:brightness-110"
            >
              Go back
            </a>
          </div>
        </div>

        <div className="flex flex-col w-full overflow-y-scroll lg:max-h-[60vh]">
          <form onSubmit={handleUpdateProfile}>
            <div className="w-full md:shadow-xl lg:pr-3">
              <div className="flex flex-col gap-2 py-3">
                <PhotoInput
                  isProfileScreen
                  withMarginTop={false}
                  photoPreview={photoPreview}
                  onChange={handleAvatarChange}
                  error={errors?.avatar_url}
                  inputFileRef={
                    inputFileRef as React.RefObject<HTMLInputElement>
                  }
                  isLoading={isLoading}
                />

                <InputField
                  isProfileScreen
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Link name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  error={errors?.name}
                  isLoading={isLoading}
                />

                <InputField
                  isProfileScreen
                  label="E-mail"
                  name="email"
                  type="text"
                  placeholder="Your email here"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  error={errors?.email}
                  isLoading={isLoading}
                />

                <div className="flex flex-col items-start mt-3">
                  <Label content="Bio" />
                  <textarea
                    name="bio"
                    value={data.bio}
                    onChange={(e) => setData({ ...data, bio: e.target.value })}
                    className={`flex items-center justify-start w-full overflow-hidden text-gray-100 truncate text-md input bg-background-secondary text-ellipsis whitespace-nowrap h-24`}
                    placeholder="Your Bio Here"
                    disabled={isLoading}
                  />
                  {errors?.bio && <Error content={errors.bio} />}
                </div>

                {changePassword && (
                  <>
                    <InputField
                      isProfileScreen
                      label="Current Password"
                      name="old_password"
                      type="password"
                      placeholder="Your current password here"
                      value={data.old_password || ''}
                      onChange={(e) =>
                        setData({ ...data, old_password: e.target.value })
                      }
                      error={errors?.old_password}
                      isLoading={isLoading}
                    />

                    <InputField
                      isProfileScreen
                      label="New Password"
                      name="new_password"
                      type="password"
                      placeholder="Your new password here"
                      value={data.new_password || ''}
                      onChange={(e) =>
                        setData({ ...data, new_password: e.target.value })
                      }
                      error={errors?.new_password}
                      isLoading={isLoading}
                    />
                  </>
                )}

                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Change Password?</span>
                    <input
                      checked={changePassword}
                      onChange={() => setChangePassword(!changePassword)}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <PrimaryButton disabled={isLoading} content={'Save Changes'} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
