export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Khinmmad. Todos los derechos reservados.
        </p>
        <p className="text-sm text-gray-600">
          Hecho con Astro + React + Tailwind
        </p>
      </div>
    </footer>
  );
}
