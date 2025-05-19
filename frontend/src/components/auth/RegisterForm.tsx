import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon, PhoneIcon } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import { RegisterData } from '@/types';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string().min(6, 'Please confirm your password'),
  full_name: z.string().min(2, 'Full name is required'),
  phone: z.string().optional(),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
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

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { registerMutation } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    console.log('Submitting data:', data); // Log the form data

    // Transform the data to match the backend requirements
    const transformedData: RegisterData = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password, 
      phone: data.phone,
      role: data.role,
      institution: data.institution,
      school: data.school,
      university: data.university,
      program: data.program,
      company: data.company,
      specialization: data.specialization,
      bio: data.bio,
    };

    try {
      await registerMutation.mutateAsync(transformedData); // Use transformed data
      console.log('Registration successful'); // Log success
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Registration error:', err); // Log any errors
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Join NeXTStep to access personalized education and career resources
        </p>
      </div>

      {step === 1 && (
        <>
          <Input label="Email" startIcon={<MailIcon />} type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
          <Input label="Full Name" startIcon={<UserIcon />} placeholder="Your full name" error={errors.full_name?.message} {...register('full_name')} />
          <Input label="Phone Number (optional)" startIcon={<PhoneIcon />} placeholder="+123456789" error={errors.phone?.message} {...register('phone')} />
          <Select label="Your Role" options={roleOptions} error={errors.role?.message} {...register('role')} />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            startIcon={<LockIcon />}
            endIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            onEndIconClick={() => setShowPassword(!showPassword)}
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            startIcon={<LockIcon />}
            endIcon={showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            onEndIconClick={() => setShowConfirm(!showConfirm)}
            placeholder="••••••••"
            error={errors.confirm_password?.message}
            {...register('confirm_password')}
          />
          <Button type="button" fullWidth onClick={() => setStep(2)}>
            Continue
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          {(selectedRole === UserRole.O_LEVEL_STUDENT || selectedRole === UserRole.A_LEVEL_STUDENT) && (
            <Input label="School" placeholder="Enter your school name" error={errors.school?.message} {...register('school')} />
          )}
          {selectedRole === UserRole.TERTIARY_STUDENT && (
            <>
              <Input label="University" placeholder="Enter your university name" error={errors.university?.message} {...register('university')} />
              <Input label="Program" placeholder="Your degree program" error={errors.program?.message} {...register('program')} />
            </>
          )}
          {selectedRole === UserRole.LECTURER && (
            <>
              <Input label="Institution" placeholder="Enter your institution name" error={errors.institution?.message} {...register('institution')} />
              <Input label="Specialization" placeholder="Your area of expertise" error={errors.specialization?.message} {...register('specialization')} />
            </>
          )}
          {selectedRole === UserRole.EMPLOYER && (
            <Input label="Company" placeholder="Enter your company name" error={errors.company?.message} {...register('company')} />
          )}
          <TextArea label="Bio (optional)" placeholder="Tell us a bit about yourself" error={errors.bio?.message} {...register('bio')} />
          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" fullWidth isLoading={isSubmitting}>
              Create Account
            </Button>
          </div>
        </>
      )}
    </form>
  );
}