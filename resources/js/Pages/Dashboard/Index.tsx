export default function Dashboard() {
  const csrfToken = (
    document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
  )?.content;

  return (
    <div className="py-12 theme-dracula">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">You're logged in!</div>

          <form action="/logout" method="POST">
            <input type="hidden" name="_token" value={csrfToken} />

            <button type="submit" className="btn btn-block">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
