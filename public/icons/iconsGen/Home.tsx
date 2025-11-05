import * as React from 'react';
import type { SVGProps } from 'react';
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 9.158 12 2M2 9.158 12 2"
    />
    <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 19V7.368M19 19V7.368M5 19h14" />
  </svg>
);
export default SvgHome;
