import { Link } from '../../Components/Link';
import { PlusCircle } from 'phosphor-react';
import { LinkFormModal } from '@/Components/LinkFormModal';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { LinkProps } from '@/types/link';
import AuthLayout from '../Layouts/AuthLayout';

interface DashboardProps {
  links: LinkProps[];
}

export default function Dashboard({ links }: DashboardProps) {
  const [isLinkFormModalOpen, setIsLinkFormModalOpen] = useState(false);

  return (
    <AuthLayout title="Dashboard" url="/">
      <div className="flex flex-col w-full h-screen mt-10 lg:max-w-[60rem]">
        <div className="flex items-center justify-between flex-grow">
          <h2 className="relative font-black text-heading-small text-content-primary">
            Links
            <span className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-accent-orange"></span>
          </h2>
          <Dialog.Root open={isLinkFormModalOpen}>
            <Dialog.Trigger asChild>
              <button
                onClick={() => setIsLinkFormModalOpen(true)}
                className="flex items-center gap-1 font-semibold text-label-medium text-accent-orange"
              >
                <PlusCircle className="text-accent-orange" size={18} />
                Add new link
              </button>
            </Dialog.Trigger>
            <LinkFormModal
              isEdit={false}
              onClose={() => setIsLinkFormModalOpen(false)}
            />
          </Dialog.Root>
        </div>

        <div className="lg:max-h-[55vh] flex flex-col flex-grow h-full gap-3 mt-5 lg:overflow-y-scroll">
          {links?.map((link) => {
            return (
              <div key={link.id}>
                <Link key={link.id} link={link} />
              </div>
            )
          })}
        </div>
      </div>
    </AuthLayout>
  );
}
