import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { InputField } from './InputField';
import { useRef, useState } from 'react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { Label } from './Label';
import { PrimaryButton } from './PrimaryButton';
import { PhotoInput } from './PhotoInput';

interface AddLinkFormData {
  title: string;
  platform: string;
  url: string;
  photoUrl: File | null;
}

interface AddLinkFormErrors {
  title?: string;
  platform?: string;
  url?: string;
  photoUrl?: string;
}

interface AddLinkModalProps {
  onClose: () => void;
}

export function AddLinkModal({ onClose }: AddLinkModalProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setphotoPreview] = useState<string | null>(null);

  const [data, setData] = useState<AddLinkFormData>({
    title: '',
    platform: '',
    url: '',
    photoUrl: null
  });

  const [errors, setErrors] = useState<AddLinkFormErrors>({});

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setData({ ...data, photoUrl: file });
      const reader = new FileReader();
      reader.onload = () => setphotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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
          Add Link
          <span className="absolute bottom-0 left-0 w-[1.5rem] h-[0.2rem] bg-accent-orange"></span>
        </Dialog.Title>

        <Dialog.Description className="flex flex-col w-full">
          <form onSubmit={handleSubmit} className="bg-background-secondary">
            <div className="w-full bg-background-secondary md:shadow-xl">
              <div className="flex flex-col gap-2 py-3">
                <PhotoInput
                  photoPreview={photoPreview}
                  onChange={handleAvatarChange}
                  error={errors?.photoUrl}
                  inputFileRef={
                    inputFileRef as React.RefObject<HTMLInputElement>
                  }
                />

                <InputField
                  label="E-mail"
                  type="text"
                  placeholder="Link Title"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  error={errors?.title}
                />

                <div className="flex flex-col items-start mt-3">
                  <Label content="Streaming Platform" />
                  <select className="w-full border-2 border-zinc-800 select bg-background-secondary">
                    <option disabled selected>
                      Streaming Platform
                    </option>
                    <option>Prime Video</option>
                    <option>MAX</option>
                    <option>Netflix</option>
                    <option>Paramount</option>
                    <option>Disney+</option>
                    <option>Apple TV</option>
                  </select>
                </div>

                <InputField
                  label="Link URL"
                  type="text"
                  placeholder="Paste link URL here"
                  value={data.url}
                  onChange={(e) => setData({ ...data, url: e.target.value })}
                  error={errors?.url}
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <PrimaryButton content="Add Link" />
            </div>
          </form>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
