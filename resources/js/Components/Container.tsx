import BackgroundImage from '/public/assets/background_image.jpg';

export function WelcomeContainer() {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden bg-background-primary hero md:px-10 lg:px-40">
      <div className="absolute inset-0 w-full h-full p-4 overflow-hidden rounded-lg">
        <img
          src={BackgroundImage}
          alt="Welcome Image"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
}
