import Link from "next/link";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={`w-full p-8 justify-around text-center text-base text-zinc-400 flex ${className}`}
    >
      <a
        href="https://github.com/solidsnk86"
        target="_blank"
        rel="noreferrer"
        className="md:flex hover:brightness-150 transition-all duration-300"
      >
        SolidSnk86 &copy; 2024
      </a>
      <aside className="flex gap-3 font-medium footer-menu bg-violet-400/60 md:bg-transparent">
        {[
          { name: "Inicio", link: "/" },
          { name: "Trabajos", link: "/works" },
          { name: "Comentar", link: "/comments" },
          { name: "404", link: "/404" },
        ].map((link, index) => (
          <Link
            key={index}
            href={link.link}
            className="hover:opacity-60 transition-all duration-300"
          >
            {link.name}
          </Link>
        ))}
      </aside>
    </footer>
  );
};
