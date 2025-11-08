import * as React from 'react';
import type { SVGProps } from 'react';
const SvgComingSoon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M2 4H0v14c0 1.1.9 2 2 2h14v-2H2zm16-4H6C4.9 0 4 .9 4 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2m0 14H6V2h12zM10 3.5v9L16 8z"
    />
  </svg>
);
export default SvgComingSoon;
