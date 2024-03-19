import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconHome(props: any) {
  return (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M32.407 31.238A1.762 1.762 0 0130.646 33H2.461A1.762 1.762 0 01.7 31.238V12.725a1.762 1.762 0 01.68-1.392L15.472.371a1.761 1.761 0 012.163 0l14.093 10.962a1.761 1.761 0 01.68 1.392v18.514zm-3.522-1.761V13.584l-12.331-9.59-12.331 9.59v15.893h24.661z"
        fill="#119387"
      />
    </Svg>
  );
}

export default IconHome;
