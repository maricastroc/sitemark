import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { PrimaryButton } from './PrimaryButton';
import { LinkProps } from '@/types/link';
import { SecondaryButton } from './SecondaryButton';

interface DeleteLinkModalProps {
  onClose: () => void;
  linkId?: number;
}

export function DeleteLinkModal({ onClose, linkId }: DeleteLinkModalProps) {
  const [link, setLink] = useState<LinkProps | null>();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.delete(`links/${linkId}`);

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
        if (error.response?.data?.message) {
          notyf?.error(error.response?.data?.message);
        }
      } else {
        console.error('Error:', error);
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    const getLink = async () => {
      try {
        const response = await axios.get(`links/${linkId}`);

        if (response?.data?.link) {
          const link = response?.data?.link;

          setLink(link);
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
      getLink();
    }
  }, [linkId]);

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
          Delete Link
          <span className="absolute bottom-0 left-0 w-[1.5rem] h-[0.2rem] bg-accent-orange"></span>
        </Dialog.Title>

        <div className="flex flex-col w-full mt-5">
          <form onSubmit={handleDeleteLink} className="bg-background-secondary">
            <div className="w-full bg-background-secondary md:shadow-xl">
              {`Are you sure you want to delete "${link?.name}" link? This action cannot be
            reversed, and all the data inside it will be removed forever.`}
            </div>

            <div className="flex items-center justify-center gap-3 mt-10">
              <PrimaryButton disabled={isLoading} content={'Delete Link'} />
              <SecondaryButton
                type="button"
                onClick={onClose}
                disabled={isLoading}
                content={'Return'}
              />
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
