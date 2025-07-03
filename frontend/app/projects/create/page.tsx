'use client';

import { Form, Input, Button, Card, message, Steps, Result } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createProject } from '../../../services/projectService';
import { ArrowLeftOutlined, CheckCircleOutlined, FileTextOutlined, RocketOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const steps = [
  {
    title: 'Basic Info',
    icon: <FileTextOutlined />,
  },
  {
    title: 'Review',
    icon: <CheckCircleOutlined />,
  },
];

export default function CreateProjectPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      message.success('Project created successfully! 🎉');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setCurrentStep(2); // Show success step
    },
    onError: () => {
      message.error('Failed to create project. Please try again.');
    },
  });

  const onFinish = (values: { name: string; description: string }) => {
    setFormData(values);
    setCurrentStep(1);
  };

  const handleCreate = () => {
    if (formData) {
      createMutation.mutate(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/projects');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Project Name <span className="text-red-500">*</span>
                  </span>
                }
                name="name"
                rules={[
                  { required: true, message: 'Please enter project name' },
                  { min: 2, message: 'Project name must be at least 2 characters' },
                  { max: 50, message: 'Project name cannot exceed 50 characters' },
                ]}
              >
                <Input 
                  placeholder="Enter a descriptive project name" 
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Description <span className="text-red-500">*</span>
                  </span>
                }
                name="description"
                rules={[
                  { required: true, message: 'Please enter project description' },
                  { min: 10, message: 'Description must be at least 10 characters' },
                  { max: 500, message: 'Description cannot exceed 500 characters' },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Describe your project goals, objectives, and key features..."
                  className="rounded-lg"
                  showCount
                  maxLength={500}
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <div className="flex gap-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 shadow-lg rounded-lg"
                  >
                    Next Step
                  </Button>
                  <Button 
                    onClick={handleBack}
                    size="large"
                    className="rounded-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        );

      case 1:
        return (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Project Details</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project Name</label>
                    <p className="text-lg text-gray-900">{formData?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{formData?.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  type="primary"
                  onClick={handleCreate}
                  loading={createMutation.isPending}
                  size="large"
                  icon={<RocketOutlined />}
                  className="bg-gradient-to-r from-green-500 to-blue-600 border-0 hover:from-green-600 hover:to-blue-700 shadow-lg rounded-lg"
                >
                  Create Project
                </Button>
                <Button 
                  onClick={handleBack}
                  size="large"
                  className="rounded-lg"
                >
                  Back
                </Button>
              </div>
            </div>
          </Card>
        );

      case 2:
        return (
          <Result
            status="success"
            icon={<CheckCircleOutlined className="text-green-500" />}
            title="Project Created Successfully!"
            subTitle={`"${formData?.name}" has been created and is ready to use.`}
            extra={[
              <Button
                type="primary"
                key="view"
                onClick={() => router.push('/projects')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 shadow-lg rounded-lg"
              >
                View All Projects
              </Button>,
              <Button
                key="create"
                onClick={() => {
                  setCurrentStep(0);
                  form.resetFields();
                  setFormData(null);
                }}
                className="rounded-lg"
              >
                Create Another
              </Button>,
            ]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="mb-4 rounded-lg"
          >
            Back
          </Button>
          
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Create New Project</h1>
            <p className="text-gray-600 text-lg">
              Set up a new project and start managing your work
            </p>
          </div>
        </div>

        {/* Steps */}
        {currentStep < 2 && (
          <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <Steps
              current={currentStep}
              items={steps}
              className="custom-steps"
            />
          </Card>
        )}

        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  );
} 