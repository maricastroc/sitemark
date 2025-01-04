import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { InputField } from './InputField';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { Label } from './Label';
import { PrimaryButton } from './PrimaryButton';
import { PhotoInput } from './PhotoInput';
import { SelectInput } from './SelectInput';
import { Error } from './Error';
import { LinkProps } from '@/types/link';

interface LinkFormModalData {
  name: string;
  platform: string;
  url: string;
  photo_url: File | null;
}

interface LinkFormModalErrors {
  name?: string;
  platform?: string;
  url?: string;
  photo_url?: string;
}

interface LinkFormModalProps {
  onClose: () => void;
  isEdit: boolean
  linkId?: number
}

export function LinkFormModal({ onClose, isEdit, linkId }: LinkFormModalProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState<LinkFormModalData>({
    name: '',
    platform: '',
    url: '',
    photo_url: null
  });

  const [errors, setErrors] = useState<LinkFormModalErrors>({});

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setData({ ...data, photo_url: file });
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('platform', data.platform);
    formData.append('url', data.url);

    if (data.photo_url) {
      formData.append('photo_url', data.photo_url);
    }

    try {
      setIsLoading(true)
      
      const response = await axios.post('/links', formData, {
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
      setIsLoading(false)
    }
  };

  const handleUpdateLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('platform', data.platform);
    formData.append('url', data.url);
    
    if (data.photo_url) {
      formData.append('photo_url', data.photo_url);
    }

    formData.append('_method', 'PUT');

    try {
      setIsLoading(true)
      
      const response = await axios.post(`links/${linkId}`, formData, {
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
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const getLink = async () => { 
      try {
        const response = await axios.get(`links/${linkId}`);
  
        if (response?.data?.link) {
          const link = response?.data?.link

          setPhotoPreview(`storage/${link.photo_url}`)
          setData({ ...data, name: link.name, platform: link.platform, url: link.url })
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data.message) {
            notyf?.error(error.response?.data.message);
          }
        } else {
          console.error('Error:', error);
        }
      }
    };
    
    if (linkId) {
      getLink()
    }
  }, [linkId])

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        onClick={onClose}
        className="fixed inset-0 z-[990] bg-black bg-opacity-70"
      />

      <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-background-secondary rounded-lg shadow-lg p-6 md:w-[560px] md:p-8 max-h-[90vh] overflow-y-auto">
        <Dialog.Close
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-gray-900 hover:text-gray-100 transition-all duration-300 text-gray-500  p-[0.1rem] rounded-full border border-gray-900"
        >
          <X size={16} alt="Close modal" />
        </Dialog.Close>

        <Dialog.Title className="relative font-bold text-heading-small text-content-primary">
          {isEdit ? 'Edit Link' : 'Add Link'}
          <span className="absolute bottom-0 left-0 w-[1.5rem] h-[0.2rem] bg-accent-orange"></span>
        </Dialog.Title>

        <div className="flex flex-col w-full">
          <form onSubmit={isEdit ? handleUpdateLink : handleCreateLink} className="bg-background-secondary">
            <div className="w-full bg-background-secondary md:shadow-xl">
              <div className="flex flex-col gap-2 py-3">
                <PhotoInput
                  photoPreview={photoPreview}
                  onChange={handleAvatarChange}
                  error={errors?.photo_url}
                  inputFileRef={
                    inputFileRef as React.RefObject<HTMLInputElement>
                  }
                />

                <InputField
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Link name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  error={errors?.name}
                  isLoading={isLoading}
                />

                <div className="flex flex-col items-start mt-3">
                  <Label content="Streaming Platform" />
                  <SelectInput
                    onChange={(e) =>
                      setData({ ...data, platform: e.target.value })
                    }
                    disabled={isLoading}
                    value={data.platform}
                  />
                  {errors?.platform && <Error content={errors.platform} />}
                </div>

                <InputField
                  label="Link URL"
                  type="text"
                  name="url"
                  placeholder="Paste link URL here"
                  value={data.url}
                  onChange={(e) => setData({ ...data, url: e.target.value })}
                  error={errors?.url}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <PrimaryButton disabled={isLoading} content={isEdit ? 'Save Changes' : 'Create Link'} />
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
