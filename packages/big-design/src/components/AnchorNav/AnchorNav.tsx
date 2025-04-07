import React, { useEffect, useRef, useState } from 'react';

import { StyledAnchorNav } from './styled';

export interface AnchorNavElement {
  id: string;
  label: string;
  element: React.ReactNode;
}

export interface AnchorNavProps {
  elements: AnchorNavElement[];
}

export const AnchorNav: React.FC<AnchorNavProps> = ({ elements }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const suspendObserverRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize IntersectionObserver
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (suspendObserverRef.current) {
          return;
        }

        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible?.target?.id) {
          const id = visible.target.id;

          setActiveId(id);
          updateUrlHash(id);
        }
      },
      { rootMargin: '0px 0px -95% 0px', threshold: 0.1 },
    );

    Object.entries(sectionRefs.current).forEach(([, el]) => {
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [elements]);

  // Scroll to section from hash on load
  useEffect(() => {
    const hash = window.location.hash?.slice(1);

    if (hash && sectionRefs.current[hash]) {
      scrollToSection(hash);
    }
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      updateUrlHash(id);

      suspendObserverRef.current = true;

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }

      resumeTimeoutRef.current = setTimeout(() => {
        suspendObserverRef.current = false;
      }, 1000);
    }
  };

  const updateUrlHash = (id: string) => {
    const newHash = `#${id}`;

    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash); // Avoids adding to browser history
    }
  };

  return (
    <StyledAnchorNav>
      <div className="anchor-nav__list">
        <ul>
          {elements.map(({ id, label }) => (
            <li key={id}>
              <a
                className={id === activeId ? 'active' : ''}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="anchor-nav__elements">
        {elements.map(({ id, element }) => (
          <div
            id={id}
            key={id}
            ref={(el) => {
              sectionRefs.current[id] = el;
            }}
            style={{ scrollMarginTop: '80px' }}
          >
            {element}
          </div>
        ))}
      </div>
    </StyledAnchorNav>
  );
};

AnchorNav.displayName = 'AnchorNav';
