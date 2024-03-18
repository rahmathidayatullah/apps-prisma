import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconSubmission(props: any) {
  return (
    <Svg
      width={28}
      height={30}
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M19.286 21.429v6.428H2.143V2.143h10.714V0H2.143A2.143 2.143 0 000 2.143v25.714A2.143 2.143 0 002.143 30h17.143a2.143 2.143 0 002.143-2.143V21.43h-2.143z"
        fill="#fff"
      />
      <Path
        d="M27.364 4.029L23.83.493a1.714 1.714 0 00-2.4 0l-15 15v5.936h5.925l15-15a1.714 1.714 0 000-2.4h.01zm-15.9 15.257H8.571v-2.893L18.686 6.268l2.903 2.904-10.125 10.114zM23.1 7.661l-2.904-2.904 2.433-2.432 2.903 2.904L23.1 7.66z"
        fill="#fff"
      />
    </Svg>
  );
}

export default IconSubmission;
