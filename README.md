## use-ref-scroller

A react hook for scrolling to DOM elements

Only 599 bytes minified + g-zipped

#### Use case

You have a component which renders a DOM element you wish to be able to scroll to and you need a scrolling function to call

```jsx
import React from 'react';

import useRefScroller from 'use-ref-scroller';

function MyComponent() {
  // using the hook without arguments will scroll the element to the center of the
  // window's viewport
  // alias elRef to myDiv for easier usage if having multiple elements
  // in the same component

  const { elRef: myDiv, scroll } = useRefScroller();

  return (
    <div>
      <button onClick={scroll}>Scroll</button>

      <div ref={myDiv}>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, massa vitae consectetur egestas, justo magna
        facilisis arcu, non accumsan lacus ipsum sit amet nisl.`
      </div>
    </div>
  );
}
```

### Passing options to the hook

```ts
interface ScrollOpts {
  // Offset in percentage of the element's client dimentions
  // default is to scroll to center the element in the scrolling pane, hence 50%
  percentOfElement?: number;
  //The offset in pixels, whch will be added to the percentage of the element
  offsetPX?: number;
  // Whether to run the scroll on mounting
  onMount?: boolean;
  // The scrollable container in which the ref element is scrolling
  container?: any;
  // default is the center of the scrolling container, hence 50%
  percentOfContainer?: number;
  // ScrollDirections.Vertical is the default setting, pass ScrollDirections.Horizontal to override it
  direction?: ScrollDirections;
}
```

### Examples

```js
// scroll the element to the beginning of the screen horizontally
const { elRef, scroll } = useRefScroller({ percentOfElement: 0, percentOfContainer: 0 });

// scroll the center of the element to the center of the screen, after the first render
const { elRef, scroll } = useRefScroller({ onMount: true });

// scroll the element 200px from the bottom
const { elRef, scroll } = useRefScroller({ offsetPx: -200, percentOfContainer: 100 });
```
