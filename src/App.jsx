import React, { useRef, useState, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Interface from './components/Interface';
import Scene, { TOTAL_PAGES } from './components/Scene';
import PortfolioModal from './components/PortfolioModal';

export default function App() {
  const scrollContainerRef = useRef(null);
  const [scrollEl, setScrollEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleScrollContainerReady = useCallback((el) => {
    scrollContainerRef.current = el;
    setScrollEl(el);
  }, []);

  const handleNavigate = useCallback((pageIndex) => {
    if (!scrollContainerRef.current) return;
    const target =
      pageIndex === 0
        ? scrollContainerRef.current.querySelector('.section--hero') ||
          scrollContainerRef.current.querySelector('[data-num="01"]')
        : scrollContainerRef.current.querySelector(`[data-num="0${pageIndex + 1}"]`) ||
          scrollContainerRef.current.querySelector(`[data-num="0${pageIndex}"]`) ||
          scrollContainerRef.current.querySelectorAll('.section')[pageIndex];

    if (target) {
      scrollContainerRef.current.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
      return;
    }

    const targetScroll =
      (pageIndex / (TOTAL_PAGES - 1)) *
      (scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight);

    scrollContainerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  return (
    <>
      <Header onNavigate={handleNavigate} />

      <div className="progress" aria-hidden="true">
        <div className="progress__bar" />
      </div>

      <CustomCursor />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 42 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050509']} />
        <fog attach="fog" args={['#050509', 16, 36]} />

        <Suspense fallback={null}>
          <ScrollControls pages={TOTAL_PAGES} damping={0.18}>
            <Scene
              onScrollContainerReady={handleScrollContainerReady}
              onSelectProject={setSelectedProject}
            />
            <Scroll html style={{ width: '100%' }}>
              <Interface
                scrollContainer={scrollEl}
                onNavigate={handleNavigate}
                onSelectProject={setSelectedProject}
              />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* Portfolio Card Pop-up Modal */}
      <PortfolioModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => handleNavigate(8)}
      />
    </>
  );
}
