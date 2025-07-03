'use client';

import { Card, Button, Space, Popconfirm, message, Descriptions, Spin, Tag, Avatar, Timeline, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchProjectById, deleteProject } from '../../../services/projectService';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const projectId = parseInt(params.id);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProjectById(projectId),
    enabled: !!projectId,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      message.success('Project deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      router.push('/projects');
    },
    onError: () => {
      message.error('Failed to delete project');
    },
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Loading project details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Button 
              type="primary"
              onClick={() => router.push('/projects')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700"
            >
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push('/projects')}
            className="mb-4 rounded-lg"
          >
            Back to Projects
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <Avatar
                size={64}
                style={{
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                }}
              >
                {project.name.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">{project.name}</h1>
                <div className="flex items-center space-x-4">
                  <Tag color={getStatusColor(project.created_at)}>
                    {getStatusText(project.created_at)}
                  </Tag>
                  <span className="text-gray-500 flex items-center">
                    <CalendarOutlined className="mr-1" />
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <Space>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => router.push(`/projects/${project.id}/edit`)}
                className="bg-gradient-to-r from-green-500 to-blue-600 border-0 hover:from-green-600 hover:to-blue-700 shadow-lg"
              >
                Edit Project
              </Button>
              <Popconfirm
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
                onConfirm={() => deleteMutation.mutate(project.id)}
                okText="Yes, Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  loading={deleteMutation.isPending}
                  className="shadow-lg"
                >
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </div>
        </div>

        {/* Project Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <Card 
              title={
                <div className="flex items-center space-x-2">
                  <FileTextOutlined className="text-blue-500" />
                  <span>Project Description</span>
                </div>
              }
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </Card>

            {/* Project Timeline */}
            <Card 
              title={
                <div className="flex items-center space-x-2">
                  <ClockCircleOutlined className="text-purple-500" />
                  <span>Project Timeline</span>
                </div>
              }
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <Timeline
                items={[
                  {
                    color: 'green',
                    children: (
                      <div>
                        <div className="font-semibold">Project Created</div>
                        <div className="text-gray-500">
                          {new Date(project.created_at).toLocaleString()}
                        </div>
                      </div>
                    ),
                  },
                  {
                    color: 'blue',
                    children: (
                      <div>
                        <div className="font-semibold">Project Updated</div>
                        <div className="text-gray-500">
                          {new Date(project.updated_at).toLocaleString()}
                        </div>
                      </div>
                    ),
                  },
                  {
                    color: 'gray',
                    children: (
                      <div>
                        <div className="font-semibold">Next Steps</div>
                        <div className="text-gray-500">
                          Add tasks, assign team members, and track progress
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <Card 
              title={
                <div className="flex items-center space-x-2">
                  <UserOutlined className="text-green-500" />
                  <span>Project Details</span>
                </div>
              }
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Project ID">
                  <span className="font-mono text-gray-600">#{project.id}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={getStatusColor(project.created_at)}>
                    {getStatusText(project.created_at)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Created">
                  {new Date(project.created_at).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Last Updated">
                  {new Date(project.updated_at).toLocaleDateString()}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Quick Actions */}
            <Card 
              title="Quick Actions"
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <div className="space-y-3">
                <Button 
                  block 
                  onClick={() => router.push(`/projects/${project.id}/edit`)}
                  className="text-left"
                >
                  <EditOutlined className="mr-2" />
                  Edit Project
                </Button>
                <Button 
                  block 
                  onClick={() => router.push('/projects')}
                  className="text-left"
                >
                  <ArrowLeftOutlined className="mr-2" />
                  Back to Projects
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 