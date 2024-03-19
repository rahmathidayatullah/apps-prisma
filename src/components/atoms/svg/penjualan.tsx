import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconPenjualan(props: any) {
  return (
    <Svg
      width={41}
      height={37}
      viewBox="0 0 41 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M24.087 14.47c-1.84-1.698-6.75-2.263-6.75 1.134 0 3.398 6.75 1.7 6.75 5.095 0 3.396-5.521 3.398-7.362 1.132m3.681 1.578v2.389m0-12.677v-2.048M2 11.073l17.913-8.957a1.105 1.105 0 01.986 0l17.913 8.957"
        stroke="#119387"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M35.131 16.594v14.725A3.681 3.681 0 0131.45 35H9.363a3.681 3.681 0 01-3.682-3.681V16.594"
        stroke="#119387"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IconPenjualan;
