declare module 'react-native-vector-icons/*' {
  import {IconProps} from 'react-native-vector-icons/Icon';
  import React from 'react';

  export default class Icon extends React.Component<IconProps> {}
}

declare module 'react-native-vector-icons/MaterialIcons' {
  import {IconProps} from 'react-native-vector-icons/Icon';
  import React from 'react';

  export default class MaterialIcons extends React.Component<IconProps> {}
}

declare module 'react-native-vector-icons/Ionicons' {
  import {IconProps} from 'react-native-vector-icons/Icon';
  import React from 'react';

  export default class Ionicons extends React.Component<IconProps> {}
}

declare module 'react-native-vector-icons/FontAwesome' {
  import {IconProps} from 'react-native-vector-icons/Icon';
  import React from 'react';

  export default class FontAwesome extends React.Component<IconProps> {}
}
