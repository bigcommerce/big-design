import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Box } from '../Box';
import { Flex, FlexItem } from '../Flex';

import { StyledAnchorNavList } from './styled';

export interface AnchorNavElement {
  id: string;
  label: string;
  element: React.ReactNode;
}

export interface AnchorNavProps {
  readonly elements: AnchorNavElement[];
}

const useAnchorObserver = (
  id: string,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
  suspendObserverRef: React.MutableRefObject<boolean>,
): React.RefCallback<HTMLElement> => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '0px 0px -90% 0px',
  });

  useEffect(() => {
    if (inView && !suspendObserverRef.current) {
      setActiveId(id);
    }
  }, [inView, id, setActiveId, suspendObserverRef]);

  return ref;
};

interface AnchorSectionProps {
  readonly id: string;
  readonly children: React.ReactNode;
  readonly setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  readonly suspendObserverRef: React.MutableRefObject<boolean>;
  readonly registerSection: (id: string, el: HTMLElement | null) => void;
}

const AnchorSection: React.FC<AnchorSectionProps> = ({
  id,
  children,
  setActiveId,
  suspendObserverRef,
  registerSection,
}) => {
  // We now know that observerRef is a function callback.
  const observerRef = useAnchorObserver(id, setActiveId, suspendObserverRef);

  // Combine the observer ref with the registration of the section.
  const combinedRef = useCallback(
    (el: HTMLElement | null) => {
      registerSection(id, el);
      observerRef(el); // Always call the ref function directly.
    },
    [id, registerSection, observerRef],
  );

  return (
    <FlexItem id={id} ref={combinedRef} style={{ scrollMarginTop: '80px' }}>
      {children}
    </FlexItem>
  );
};

export const AnchorNav: React.FC<AnchorNavProps> = ({ elements }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const suspendObserverRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrlHash = useCallback((id: string) => {
    const newHash = `#${id}`;

    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash); // Avoids adding to browser history
    }
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
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
    },
    [updateUrlHash],
  );

  // Scroll to section based on the URL hash when the component loads.
  useEffect(() => {
    const hash = window.location.hash?.slice(1);

    if (hash && sectionRefs.current[hash]) {
      scrollToSection(hash);
    }
  }, [scrollToSection]);

  // Cleanup timeout on unmount.
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Box>
      <StyledAnchorNavList>
        <ul>
          {elements.map(({ id, label }) => (
            <li key={id}>
              <a
                aria-current={id === activeId ? 'true' : undefined}
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
      </StyledAnchorNavList>

      <Flex flexDirection="column" flexGap="xLarge">
        {elements.map(({ id, element }) => (
          <AnchorSection
            id={id}
            key={id}
            registerSection={(id, el) => {
              sectionRefs.current[id] = el;
            }}
            setActiveId={setActiveId}
            suspendObserverRef={suspendObserverRef}
          >
            {element}
          </AnchorSection>
        ))}
      </Flex>
    </Box>
  );
};

AnchorNav.displayName = 'AnchorNav';
