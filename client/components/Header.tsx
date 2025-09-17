// import nav from 'nav'

export default function Header() {
  return (
    <header className="header bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg p-2">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo placeholder */}
          <div className="logo-placeholder w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-md border-2 ">
            <span className="font-bold text-xl">TT</span>
          </div>
          
          
          {/* Title */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">Tail Trail</h1>
            <p className="text-base">Reuniting lost pets with their packs</p>
          </div>
        </div>
        {/* Navigation
        <Nav /> */}
      </div>
    </header>
  )
}