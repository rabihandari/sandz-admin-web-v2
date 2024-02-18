'use client';

import React from 'react';
import Logo from './Logo';
import LogoutDialog from './LogoutDialog';
import { useAppContext } from '@/context';
import { ImenuItemChildren } from '@/types';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, ChevronUp, LogOut } from 'lucide-react';
import {
  List,
  Divider,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';

const Sidebar = () => {
  const router = useRouter();
  const { menuItems } = useAppContext();
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({});

  const handleClick = (key: string, children?: ImenuItemChildren[]) => {
    if (!children) router.push(key);

    setOpen((old) => ({ ...old, [key]: !old[key] }));
  };

  const handleRedirect = (basePath: string, path: string) => {
    router.push(basePath + path);
  };

  return (
    <div className='h-screen w-[371px] bg-[#3F6BFC] p-2 flex flex-col justify-between'>
      <div>
        <div className='flex px-2 pt-2'>
          <Logo />
          <div className='text-white'>
            <h1 className='font-medium text-3xl'>Sandz</h1>
            <p className='font-medium text-sm'>Admin Panel</p>
          </div>
        </div>
        <Divider
          orientation='horizontal'
          sx={{ backgroundColor: '#d7e1ff', marginTop: 3, marginInline: 1 }}
        />
        <List component='nav'>
          {menuItems.map((item) => (
            <div key={item.basePath}>
              <ListItemButton
                sx={{ padding: 0, paddingBlock: 2, paddingInline: 1 }}
                onClick={() => handleClick(item.basePath, item.children)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{ color: '#fff' }} primary={item.title} />
                {item.children ? (
                  open[item.basePath] ? (
                    <ChevronUp color='white' />
                  ) : (
                    <ChevronDown color='white' />
                  )
                ) : (
                  <ChevronRight color='white' />
                )}
              </ListItemButton>
              {item.basePath === '/' && (
                <Divider
                  orientation='horizontal'
                  sx={{
                    marginBlock: 1,
                    marginInline: 1,
                    backgroundColor: '#d7e1ff',
                  }}
                />
              )}
              {item.children && (
                <Collapse
                  in={!!open[item.basePath]}
                  timeout='auto'
                  unmountOnExit
                >
                  <List component='div' disablePadding>
                    {item.children.map((subItem) => (
                      <ListItemButton
                        onClick={() =>
                          handleRedirect(item.basePath, subItem.path)
                        }
                        key={subItem.path}
                        sx={{ pl: 9, color: '#fff' }}
                      >
                        <ListItemText primary={subItem.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </div>
      <div>
        <Divider
          orientation='horizontal'
          sx={{ backgroundColor: '#d7e1ff', marginBlock: 1 }}
        />
        <LogoutDialog>
          {(handleOpen) => (
            <ListItemButton
              onClick={handleOpen}
              sx={{
                color: '#fff',
                padding: 0,
                paddingBlock: 2,
                paddingInline: 1,
              }}
            >
              <ListItemIcon>
                <LogOut color='#fff' />
              </ListItemIcon>
              <ListItemText primary='Logout' />
              <ChevronRight color='white' />
            </ListItemButton>
          )}
        </LogoutDialog>
      </div>
    </div>
  );
};

export default Sidebar;
