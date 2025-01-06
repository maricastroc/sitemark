import { Link } from '../../Components/Link';
import { LinkProps } from '@/types/link';
import AuthLayout from '../Layouts/AuthLayout';

interface UrlProps {
  links: LinkProps[];
  user: {
    name: string;
    avatar_url: string;
    username: string;
  };
}

export default function Url({ links, user }: UrlProps) {
  return (
    <AuthLayout title="Url" url="/">
      <div className="flex flex-col w-full h-screen mt-10 lg:max-w-[60rem]">
        <div className="flex items-center justify-between flex-grow">
          <h2 className="relative font-black text-heading-small text-content-primary">
            {`${user.name.split(' ')[0]}'s Links`}
            <span className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-accent-orange"></span>
          </h2>
          <div className="flex items-end gap-2">
            <img
              className="border rounded-full h-7 w-7 border-content-primary"
              src={`storage/${user.avatar_url}`}
              alt=""
            />
            <p className="text-sm">@{user.username}</p>
          </div>
        </div>

        <div className="lg:max-h-[55vh] flex flex-col flex-grow h-full gap-3 mt-5 lg:overflow-y-scroll">
          {links?.map((link) => {
            return (
              <div key={link.id}>
                <Link isPublic key={link.id} link={link} />
              </div>
            )
          })}
        </div>
      </div>
    </AuthLayout>
  );
}
