import seriesImage from '@/assets/series/rings_of_power.jpg';
import { PencilSimpleLine, TrashSimple } from 'phosphor-react';

export function Link() {
  return (
    <div className="max-w-full overflow-x-auto lg:overflow-x-hidden lg:max-w-[60rem] flex items-center gap-4 p-4 rounded-lg bg-background-secondary">
      <div className="flex items-center gap-3">
        <img
          className="w-[3rem] h-[3rem] rounded-md"
          src={seriesImage}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-label-large text-content-primary">
              Anéis do Poder
            </h2>
            <span className="flex items-center h-2 p-[0.65rem] rounded-full bg-accent-blue">
              <p className="font-bold text-label-small text-content-inverse">
                prime video
              </p>
            </span>
          </div>

          <p className="max-w-[90%] lg:max-w-[95%] overflow-hidden truncate whitespace-nowrap text-paragraph-medium">
            https://www.primevideo.com/region/na/detail/amzn1.dv.gti.ffefa84e-6092-433b-9f8a-79c6dd7551ae
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center p-2 text-content-primary">
          <PencilSimpleLine size={18} />
        </button>
        <button className="flex items-center justify-center p-2 text-content-primary">
          <TrashSimple size={18} />
        </button>
      </div>
    </div>
  );
}
