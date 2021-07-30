import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../Downloads/frontend-v2-develop/tailwind.config.js';

export default function useTailwind() {
  return resolveConfig(tailwindConfig);
}
