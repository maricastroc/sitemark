import { ImageSquare, Pencil, User } from 'phosphor-react';
import { Input } from './Input';
import { Label } from './Label';

interface PhotoInputProps {
  photoPreview: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputFileRef: React.RefObject<HTMLInputElement>;
  error: string | undefined;
}

export const PhotoInput = ({
  photoPreview,
  onChange,
  inputFileRef
}: PhotoInputProps) => {
  return (
    <div className="mt-5 flex flex-col w-full sm:mb-4 sm:grid sm:grid-cols-[1fr,4fr] items-center gap-4">
      <div className="flex items-center justify-center border-2 border-zinc-800 rounded-xl h-[6rem] w-[6rem]">
        <div className="flex items-center justify-center relative h-[5rem] w-[5rem]">
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Avatar Preview"
              className="rounded-xl h-[5rem] w-[5rem]"
            />
          ) : (
            <ImageSquare className="w-16 h-16 text-gray-500" />
          )}
          <button
            type="button"
            onClick={() => {
              if (inputFileRef.current) {
                inputFileRef.current.click(); // Simula o clique no input escondido
              } else {
                console.error('inputFileRef está nulo.');
              }
            }}
            className="absolute hover:bg-gray-500 cursor-pointer top-[80%] left-[100%] flex items-center justify-center bg-gray-900 border border-gray-500 rounded-full text-gray-100 w-[1.9rem] h-[1.9rem] sm:left-[68%]"
          >
            <Pencil size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-full">
        <Label content="Link Photo" />
        <Input
          type="file"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={onChange}
        />
        <span className="flex items-center justify-start w-full overflow-hidden text-gray-100 truncate border-2 text-md input border-zinc-800 bg-background-secondary text-ellipsis whitespace-nowrap">
          <p className="max-w-[15rem] truncate text-content-secondary">
            {photoPreview || 'No file selected'}
          </p>
        </span>
      </div>
    </div>
  );
};
