import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconAkad(props: any) {
  return (
    <Svg
      width={28}
      height={33}
      viewBox="0 0 28 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M17.2 0H4A3.3 3.3 0 00.7 3.3v26.4A3.3 3.3 0 004 33h19.8a3.3 3.3 0 003.3-3.3V9.9L17.2 0zm6.6 29.7H4V3.3h11.55v8.25h8.25V29.7z"
        fill="#119387"
      />
    </Svg>
  );
}

export default IconAkad;
