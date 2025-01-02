export function WelcomeContainer() {
  return (
<div className="flex items-center justify-center min-h-screen px-4 hero md:px-10 lg:px-40 bg-base-100">
    <div className="text-center md:-mt-20 hero-content md:text-left">
      <div>
        <p className="pt-[3rem] text-lg md:text-xl">Welcome to</p>
        <h1 className="mt-2 text-5xl font-bold ">Biolinks</h1>
        <p className="pt-8 pb-4 mb-2 text-lg md:pt-4 md:text-xl">
          your <span className="italic text-secondary">favorite</span>{' '}
          link manager.
        </p>
      </div>
    </div>
  </div>
  );
}
