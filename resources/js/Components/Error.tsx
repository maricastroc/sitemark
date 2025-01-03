interface ErrorProps {
  content: string;
}

export function Error({ content }: ErrorProps) {
  return <span className="mt-1 text-sm text-red-500">{content}</span>;
}
