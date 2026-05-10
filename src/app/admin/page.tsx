export default function AdminDashboard() {

  const menus = [
    {
      title: 'Upload Video',
      href: '/admin/upload',
      icon: '📤',
      description:
        'Upload dan edit video',
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: '📊',
      description:
        'Realtime analytics dashboard',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-14">

          <p className="text-pink-500 font-semibold uppercase tracking-[0.3em] mb-4">
            Admin Panel
          </p>

          <h1 className="text-5xl font-black">
            Dashboard
          </h1>

        </div>

        {/* GRID */}

        <div className="grid md:grid-cols-2 gap-8">

          {menus.map((menu) => (

            <a
              key={menu.href}
              href={menu.href}
              className="
                group
                bg-zinc-900
                hover:bg-zinc-800
                rounded-3xl
                p-10
                transition
                border
                border-zinc-800
                hover:border-pink-600
              "
            >

              <div className="text-6xl mb-6">
                {menu.icon}
              </div>

              <h2 className="text-3xl font-black mb-3 group-hover:text-pink-500 transition">
                {menu.title}
              </h2>

              <p className="text-zinc-400 leading-relaxed">
                {menu.description}
              </p>

            </a>

          ))}

        </div>

      </div>

    </main>
  );
}