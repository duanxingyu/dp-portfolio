import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { Project } from '../types/portfolio';
import { assetUrl } from '../lib/dataSource';
import {
  projectCardVariants,
  projectImageVariants,
  projectContentVariants,
  projectIconVariants,
} from '../lib/motion';

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  const label = `查看 ${project.title}，${project.category}，${project.year}`;

  if (reduced) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-[#0f0a1e] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014]"
      >
        <CardInner project={project} />
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="card-shine group relative w-full cursor-pointer overflow-hidden rounded-2xl border bg-[#0f0a1e] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014]"
      variants={projectCardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <CardInner project={project} animated />
    </motion.button>
  );
}

function CardInner({ project, animated = false }: { project: Project; animated?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const Img = animated ? motion.img : 'img';
  const Content = animated ? motion.div : 'div';
  const Icon = animated ? motion.div : 'div';
  const iconClass =
    'absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm';

  return (
    <div className="relative aspect-[4/5] overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-950/40 via-[#0f0a1e] to-cyan-950/30" aria-hidden />
      )}
      <Img
        src={assetUrl(project.cover)}
        alt={project.title}
        loading="lazy"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={`portfolio-image h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...(animated ? { variants: projectImageVariants } : {})}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/20 to-transparent opacity-60 transition-opacity duration-500 ease-out group-hover:opacity-90" />
      <div className="absolute inset-0 bg-violet-600/0 transition-colors duration-500 ease-out group-hover:bg-violet-600/8" />

      <Content
        className="absolute inset-x-0 bottom-0 p-6"
        {...(animated ? { variants: projectContentVariants } : {})}
      >
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium tracking-wider text-cyan-400/90">
            {project.category} · {project.year}
          </p>
          {project.role && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
              {project.role}
            </span>
          )}
        </div>
        <h3 className="mt-1 font-display text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/60 opacity-100 transition-opacity duration-500 ease-out md:opacity-0 md:group-hover:opacity-100">
          {project.description}
        </p>
      </Content>

      <Icon
        className={
          animated
            ? iconClass
            : `${iconClass} opacity-100 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:opacity-100 md:group-hover:rotate-0 rotate-0 md:rotate-[-30deg]`
        }
        {...(animated ? { variants: projectIconVariants } : {})}
        aria-hidden
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </Icon>
    </div>
  );
}
