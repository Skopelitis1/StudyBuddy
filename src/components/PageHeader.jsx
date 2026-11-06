function PageHeader({ title, subtitle }) {
  return (
    <header className="bg-white px-5 pb-4 pt-4">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </header>
  )
}

export default PageHeader
