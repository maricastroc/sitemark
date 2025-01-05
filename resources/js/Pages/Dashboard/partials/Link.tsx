import {
  ArrowDown,
  ArrowUp,
  PencilSimpleLine,
  TrashSimple
} from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { LinkFormModal } from '@/Components/LinkFormModal';
import { LinkProps } from '@/types/link';
import { getTagColor } from '@/utils/getTagColor';
import { DeleteLinkModal } from '@/Components/DeleteLinkModal';
import axios from 'axios';
import { notyf } from '@/libs/notyf';

interface LinkComponentProps {
  link: LinkProps;
}

export function Link({ link }: LinkComponentProps) {
  const [isEditLinkModalFormOpen, setIsEditLinkModalFormOpen] = useState(false);

  const [isDeleteLinkModalOpen, setIsDeleteLinkModalOpen] = useState(false);

  const handleMoveUp = async () => {
    try {
      const response = await axios.patch(`links/${link.id}/up`);

      if (response.data.redirect) {
        window.location.href = response.data.redirect;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors?.message) {
          notyf?.error(error.response?.data.errors?.message);
        }
      } else {
        console.error('Error:', error);
      }
    }
  };

  const handleMoveDown = async () => {
    try {
      const response = await axios.patch(`links/${link.id}/down`);

      if (response.data.redirect) {
        window.location.href = response.data.redirect;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors?.message) {
          notyf?.error(error.response?.data.errors?.message);
        }
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto lg:overflow-x-hidden w-full lg:max-w-[60rem]">
      <div className="flex items-center gap-3 text-content-primary">
        <button
          onClick={handleMoveUp}
          className={`flex items-center justify-center transition-all duration-100 disabled:text-content-tertiary disabled:cursor-not-allowed hover:text-accent-orange`}
          disabled={!!link?.is_first}
        >
          <ArrowUp size={20} />
        </button>
        <button
          onClick={handleMoveDown}
          className={`flex items-center justify-center transition-all duration-100 disabled:text-content-tertiary disabled:cursor-not-allowed hover:text-accent-orange`}
          disabled={!!link?.is_last}
        >
          <ArrowDown size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between flex-grow gap-4 p-4 rounded-lg bg-background-secondary">
        <div className="flex items-center gap-3">
          <img
            className="w-[3rem] h-[3rem] rounded-md"
            src={`storage/${link.photo_url}`}
            alt=""
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-label-large text-content-primary">
                {link.name}
              </h2>
              <span
                className={`flex items-center h-2 p-[0.65rem] rounded-full ${getTagColor(link.platform)}`}
              >
                <p className="font-bold text-label-small text-content-inverse">
                  {link.platform}
                </p>
              </span>
            </div>

            <p className="max-w-[90%] lg:max-w-[32rem] overflow-hidden truncate whitespace-nowrap text-paragraph-medium">
              {link.url}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Dialog.Root open={isEditLinkModalFormOpen}>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setIsEditLinkModalFormOpen(true)}
                className="flex items-center justify-center p-2 transition-all duration-100 text-content-primary hover:text-accent-orange"
              >
                <PencilSimpleLine size={18} />
              </button>
            </Dialog.Trigger>
            <LinkFormModal
              isEdit
              linkId={link.id}
              onClose={() => setIsEditLinkModalFormOpen(false)}
            />
          </Dialog.Root>
          <Dialog.Root open={isDeleteLinkModalOpen}>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setIsDeleteLinkModalOpen(true)}
                className="flex items-center justify-center p-2 transition-all duration-100 text-content-primary hover:text-accent-orange"
              >
                <TrashSimple size={18} />
              </button>
            </Dialog.Trigger>
            <DeleteLinkModal
              onClose={() => setIsDeleteLinkModalOpen(false)}
              linkId={link.id}
            />
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
