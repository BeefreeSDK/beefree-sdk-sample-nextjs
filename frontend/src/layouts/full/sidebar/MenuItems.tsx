import {
  IconAperture, 
  IconCopy, 
  IconLayoutDashboard, 
  IconMoodHappy, 
  IconTypography, 
  IconMail,
  IconFileStack,
  IconNews,
  IconLollipop
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Example Dashboard',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    navlabel: true,
    subheader: 'BEEFREE',
  },
  {
    id: uniqueId(),
    title: 'My Designs',
    icon: IconMail,
    href: '/beefree/my_designs',
  },
  {
    id: uniqueId(),
    title: 'Email Editor',
    icon: IconMail,
    href: '/beefree/email',
  },
  {
    id: uniqueId(),
    title: 'File Manager',
    icon: IconFileStack,
    href: '/beefree/filemanager',
  },
  {
    id: uniqueId(),
    title: 'Page Builder',
    icon: IconNews,
    href: '/beefree/page',
  },
  {
    id: uniqueId(),
    title: 'Popup Builder',
    icon: IconLollipop,
    href: '/beefree/popup',
  },
];

export default Menuitems;
