'use client';

import { Menu, Button, Avatar, Dropdown } from 'antd';
import { DashboardOutlined, ProjectOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined className="text-lg" />,
      label: 'Dashboard',
    },
    {
      key: '/projects',
      icon: <ProjectOutlined className="text-lg" />,
      label: 'Projects',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // Remove token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-white/20 py-2 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="md:flex items-center space-x-2 ml-8">
            <Menu
              mode="horizontal"
              selectedKeys={[pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              className="bg-transparent border-0"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
          <h1 className="text-xl font-bold gradient-text">Monday Dashboard</h1>
        </div>

        {/* Main Navigation */}

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Button
            type="primary"
            className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 px-4 py-2"
            onClick={() => router.push('/projects/create')}
          >
            + New Project
          </Button>
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Avatar
              size={40}
              icon={<UserOutlined />}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: 'var(--gradient-primary)' }}
            />
          </Dropdown>
        </div>
      </div>
    </nav>
  );
} 