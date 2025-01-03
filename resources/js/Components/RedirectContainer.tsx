import { PrimaryButton } from './PrimaryButton';

interface RedirectContainerProps {
  buttonContent: string;
  title: string;
  redirectLink: string;
  text: string;
}

export function RedirectContainer({
  buttonContent,
  title,
  redirectLink,
  text
}: RedirectContainerProps) {
  return (
    <div className="flex justify-center w-full mt-12 align-center card-actions">
      <PrimaryButton content={buttonContent} />
      <div className="flex items-center gap-2 mt-4 text-center">
        <span className="text-content-secondary text-label-medium">
          {title}
        </span>
        <a
          href={redirectLink}
          className="font-bold link link-hover text-content-primary text-label-medium"
        >
          {text}
        </a>
      </div>
    </div>
  );
}
