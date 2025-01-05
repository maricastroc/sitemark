import Logo from '/public/assets/logo.svg';
import { LogOut, UserCircle, List } from 'iconoir-react';
import { ReactNode } from 'react';
import { ActionButton } from '@/Components/ActionButton';
import { Head } from '@inertiajs/react';

interface LayoutProps {
  title: string;
  children: ReactNode;
  url: string;
}

export default function AuthLayout({ title, children, url }: LayoutProps) {
  const csrfToken = (
    document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
  )?.content;

  return (
    <>
      <Head title={title} />
      <div className="max-h-[100vh] flex flex-col items-center w-full p-10 bg-background-primary lg:overflow-y-hidden">
        <img src={Logo} />

        {children}

        <div className="flex items-center justify-center w-full gap-3 mt-10">
          <ActionButton
            isActive={url === '/'}
            onClick={() => (window.location.href = '/')}
          >
            <List />
          </ActionButton>
          <ActionButton
            isActive={url === '/profile'}
            onClick={() => (window.location.href = '/profile')}
          >
            <UserCircle />
          </ActionButton>
          <form action="/logout" method="POST">
            <input type="hidden" name="_token" value={csrfToken} />
            <ActionButton isActive={false}>
              <LogOut />
            </ActionButton>
          </form>
        </div>
      </div>
    </>
  );
}
