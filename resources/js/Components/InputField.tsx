import { Input } from './Input';
import { Label } from './Label';
import { Error } from './Error';

export const InputField = ({
  label,
  type,
  value,
  name,
  onChange,
  placeholder,
  error,
  isLoading,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  isLoading: boolean;
}) => (
  <div className="flex flex-col items-start mt-3">
    <Label content={label} />
    <Input
      type={type}
      disabled={isLoading}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full text-gray-100 input input-bordered bg-background-secondary"
    />
    {error && <Error content={error} />}
  </div>
);
