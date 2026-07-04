import { motion } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsShowcase } from './components/SkillsShowcase';
import { PortfolioGrid } from './components/PortfolioGrid';
import { About } from './components/About';
import { Contact, Footer } from './components/Contact';
import { ScrollProgress, ScrollGlow } from './components/ScrollEffects';
import { PreviewBanner } from './components/PreviewBanner';
import { usePortfolio } from './hooks/usePortfolio';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useSiteMeta } from './hooks/useSiteMeta';

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <motion.div
        className="relative h-10 w-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-violet-500" />
      </motion.div>
      <motion.p
        className="text-sm text-white/55"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        加载作品中…
      </motion.p>
    </div>
  );
}

export default function App() {
  const { data, loading, error, previewMode, previewSavedAt, exitPreview } = usePortfolio();
  const activeSection = useScrollSpy(!loading && !!data);

  useSiteMeta({
    title: data?.site.title ?? '',
    description: data?.site.description ?? '',
    tagline: data?.site.tagline,
  });

  if (loading) {
    return (
      <>
        <AnimatedBackground />
        <LoadingScreen />
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <AnimatedBackground />
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-medium text-white/85">作品加载失败</p>
          <p className="text-sm text-white/60">{error ?? '未知错误'}</p>
          <p className="text-sm text-white/55">请确认 portfolio.json 已正确部署，或检查网络连接</p>
        </div>
      </>
    );
  }

  const { site, about, categories, projects, stats } = data;

  return (
    <>
      {previewMode && (
        <PreviewBanner savedAt={previewSavedAt} onExit={exitPreview} />
      )}
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:fixed focus:left-4 focus:z-[300] focus:rounded-full focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white ${previewMode ? 'focus:top-16' : 'focus:top-4'}`}
      >
        跳到主要内容
      </a>
      <AnimatedBackground />
      <ScrollProgress />
      <ScrollGlow />
      <Navbar
        title={site.title}
        contact={site.contact}
        activeSection={activeSection}
        className={previewMode ? 'top-12' : undefined}
      />
      <main id="main" className={previewMode ? 'pt-12' : undefined}>
        <Hero
          title={site.title}
          subtitle={site.subtitle}
          tagline={site.tagline}
          description={site.description}
          status={site.status}
          stats={stats}
        />
        {site.marquee && site.marquee.length > 0 && <SkillsShowcase items={site.marquee} />}
        <PortfolioGrid projects={projects} categories={categories} />
        <About avatar={about.avatar} bio={about.bio} tools={about.tools} />
        <Contact contact={site.contact} location={site.location} social={site.social} />
      </main>
      <Footer title={site.title} />
    </>
  );
}
