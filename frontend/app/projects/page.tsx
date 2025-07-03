'use client';

import { Table, Button, Space, Popconfirm, message, Card, Input, Tag, Avatar, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchProjects, deleteProject } from '../../services/projectService';
import { Project } from '../../types/project';
import Navigation from '@/components/Navigation';

const { Search } = Input;

export default function ProjectsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      message.success('Project deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      message.error('Failed to delete project');
    },
  });

  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchText.toLowerCase()) ||
    project.description.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  const getStatusColor = (createdAt: string) => {
    const daysSinceCreation = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceCreation < 7) return 'green';
    if (daysSinceCreation < 30) return 'blue';
    return 'default';
  };

  const getStatusText = (createdAt: string) => {
    const daysSinceCreation = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceCreation < 7) return 'New';
    if (daysSinceCreation < 30) return 'Active';
    return 'Ongoing';
  };

  const columns = [
    {
      title: 'Project',
      key: 'project',
      render: (record: Project) => (
        <div className="flex items-center space-x-3">
          <Avatar
            size={40}
            style={{
              background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
            }}
          >
            {record.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500 max-w-xs truncate">
              {record.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: Project) => (
        <Tag color={getStatusColor(record.created_at)}>
          {getStatusText(record.created_at)}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => (
        <div className="text-sm">
          <div className="font-medium">{new Date(date).toLocaleDateString()}</div>
          <div className="text-gray-500">{new Date(date).toLocaleTimeString()}</div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Project) => (
        <Space size="small">
          <Tooltip title="View Project">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => router.push(`/projects/${record.id}`)}
              className="hover:bg-blue-50 hover:text-blue-600"
            />
          </Tooltip>
          <Tooltip title="Edit Project">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => router.push(`/projects/${record.id}/edit`)}
              className="hover:bg-green-50 hover:text-green-600"
            />
          </Tooltip>
          <Tooltip title="Delete Project">
            <Popconfirm
              title="Are you sure you want to delete this project?"
              description="This action cannot be undone."
              onConfirm={() => deleteMutation.mutate(record.id)}
              okText="Yes, Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                className="hover:bg-red-50"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <Navigation />
      <div className="max-w-7xl mx-auto animate-fade-in">

        {/* Search and Filters */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1 max-w-md">
              <Search
                placeholder="Search projects..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                size="large"
                className="rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                icon={<FilterOutlined />}
                size="large"
                className="rounded-lg"
              >
                Filters
              </Button>
              <div className="text-sm text-gray-500">
                {filteredProjects.length} of {projects?.length || 0} projects
              </div>
            </div>
          </div>
        </Card>

        {/* Projects Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <Table
            columns={columns}
            dataSource={filteredProjects}
            loading={isLoading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} projects`,
              className: 'custom-pagination',
            }}
            className="custom-table"
            rowClassName="hover:bg-gray-50 transition-colors"
          />
        </Card>
      </div>
    </div>
  );
} 