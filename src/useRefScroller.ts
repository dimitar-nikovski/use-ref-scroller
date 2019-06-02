import { useRef, useCallback, useEffect } from 'react';

enum ScrollDirections {
  Horiontal,
  Vertical
}

function scrollToPercent(el, { container, percentOfElement, offsetPX, direction, percentOfContainer }: ScrollOpts) {
  const rect = el.current.getClientRects()[0];
  const isVertical = direction === ScrollDirections.Vertical;
  const refSize = isVertical ? rect.height : rect.width;
  const elemScroll = isVertical ? rect.y : rect.x;

  const scrollSize =
    container === window
      ? isVertical
        ? container.innerHeight
        : container.innerWidth
      : isVertical
      ? container.scrollHeight
      : container.scrollWidth;

  let addOffset = (refSize * percentOfElement) / 100;
  if (offsetPX) {
    addOffset += offsetPX;
  }
  const containerScroll = isVertical ? container.scrollY : container.scrollX;
  const newScroll = elemScroll + containerScroll - (scrollSize * percentOfContainer) / 100 + addOffset;

  const scrollObj = isVertical ? { top: newScroll } : { left: newScroll };

  window.scrollTo({
    ...scrollObj,
    behavior: 'smooth'
  });
}

interface ScrollOpts {
  /**
   * Offset in percentage of the element's client dimentions
   * default is to scroll to center the element in the scrolling pane, hence 50%
   */
  percentOfElement?: number;
  /**
   * The offset in pixels, whch will be added to the percentage of the element
   */
  offsetPX?: number;
  /**
   * Whether to run the scroll on mounting
   */
  onMount?: boolean;
  /**
   * The scrollable container in which the ref element is scrolling
   */
  container?: any;
  // default is the center of the scrolling container, hence 50%
  percentOfContainer?: number;
  direction?: ScrollDirections;
}

export function useRefScroller({
  percentOfElement = 50,
  offsetPX = 0,
  onMount = false,
  container = window,
  percentOfContainer = 50,
  direction = ScrollDirections.Vertical
}: ScrollOpts) {
  const elRef = useRef(null);

  const scroll = useCallback(() => {
    if (elRef.current) {
      scrollToPercent(elRef, {
        percentOfElement,
        offsetPX,
        container,
        percentOfContainer,
        direction
      });
    }
  }, [elRef.current]);

  useEffect(() => {
    if (onMount) {
      scroll();
    }
  }, []);

  return { elRef, scroll };
}
