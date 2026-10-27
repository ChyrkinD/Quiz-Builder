declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react';

  const SvgComponent: FunctionComponent<SVGProps<SVGSVGElement>>;

  export default SvgComponent;
}
