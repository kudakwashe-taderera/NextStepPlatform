import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { TextArea } from '../ui/TextArea';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';

// Validation schema using zod
const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string().min(6, 'Please confirm your password'),
  full_name: z.string().min(2, 'Full name is required'),
  phone: z.string().optional(),
  role: z.string().min(1, 'Please select a role'),
  institution: z.string().optional(),
  school: z.string().optional(),
  university: z.string().optional(),
  program: z.string().optional(),
  company: z.string().optional(),
  specialization: z.string().optional(),
  bio: z.string().optional(),
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: authRegister } = useAuth();
  const [step, setStep] = useState(1);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  
  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await authRegister(data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const roleOptions = [
    { value: UserRole.O_LEVEL_STUDENT, label: 'O Level Student' },
    { value: UserRole.A_LEVEL_STUDENT, label: 'A Level Student' },
    { value: UserRole.TERTIARY_STUDENT, label: 'Tertiary Student' },
    { value: UserRole.LECTURER, label: 'Lecturer' },
    { value: UserRole.MENTOR, label: 'Mentor' },
    { value: UserRole.EMPLOYER, label: 'Employer' },
    { value: UserRole.GENERAL_USER, label: 'General User' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Join NeXTStep to access personalized education and career resources
        </p>
      </div>

      {step === 1 && (
        <>
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.full_name?.message}
            {...register('full_name')}
          />

          <Input
            label="Phone Number (optional)"
            placeholder="+123456789"
            error={errors.phone?.message}
            {...register('phone')}
          />

          <Select
            label="Your Role"
            options={roleOptions}
            error={errors.role?.message}
            {...register('role')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirm_password?.message}
            {...register('confirm_password')}
          />

          <Button
            type="button"
            fullWidth
            onClick={() => setStep(2)}
          >
            Continue
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          {/* Conditional fields based on role */}
          {(selectedRole === UserRole.O_LEVEL_STUDENT || selectedRole === UserRole.A_LEVEL_STUDENT) && (
            <Input
              label="School"
              placeholder="Enter your school name"
              error={errors.school?.message}
              {...register('school')}
            />
          )}

          {selectedRole === UserRole.TERTIARY_STUDENT && (
            <>
              <Input
                label="University"
                placeholder="Enter your university name"
                error={errors.university?.message}
                {...register('university')}
              />

              <Input
                label="Program"
                placeholder="Your degree program"
                error={errors.program?.message}
                {...register('program')}
              />
            </>
          )}

          {selectedRole === UserRole.LECTURER && (
            <>
              <Input
                label="Institution"
                placeholder="Enter your institution name"
                error={errors.institution?.message}
                {...register('institution')}
              />

              <Input
                label="Specialization"
                placeholder="Your area of expertise"
                error={errors.specialization?.message}
                {...register('specialization')}
              />
            </>
          )}

          {selectedRole === UserRole.EMPLOYER && (
            <Input
              label="Company"
              placeholder="Enter your company name"
              error={errors.company?.message}
              {...register('company')}
            />
          )}

          <TextArea
            label="Bio (optional)"
            placeholder="Tell us a bit about yourself"
            error={errors.bio?.message}
            {...register('bio')}
          />

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep(1)}
            >
              Back
            </Button>

            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
            >
              Create Account
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
