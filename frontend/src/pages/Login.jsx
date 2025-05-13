import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { validateForm, formatApiErrors } from '../utils/formUtils';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when field is changed
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFieldErrors({});
    
    // Form validation
    const validationRules = {
      email: { required: true, isEmail: true },
      password: { required: true, minLength: 8 },
    };
    
    const { isValid, errors } = validateForm(formData, validationRules);
    
    if (!isValid) {
      setFieldErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setFormError(formatApiErrors(result.message));
      }
    } catch (err) {
      setFormError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">NeXTStep</h1>
          <p className="text-gray-500">Log in to your account</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          {formError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {formError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
            />
            
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Log In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? {' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} NeXTStep Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;