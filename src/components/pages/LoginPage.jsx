import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../Logo';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        const from =
          location.state?.from ||
          (result.user.role === 'admin'
            ? '/admin/dashboard'
            : '/subjects');

        navigate(from, { replace: true });
      } else {
        if (result.errors?.length > 0) {
          setError(result.errors.map(err => err.message).join(', '));
        } else {
          setError(result.message || 'Invalid email or password');
        }
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 md:py-20">
      <div className="w-full max-w-md mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* Logo */}
          <div className="text-center mb-8">
            <Logo className="w-20 md:w-32 mx-auto mb-4" />
            <h1 className="mb-2">Welcome Back</h1>
            <p className="text-[#94A3B8]">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Card */}
          <div className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-sm mb-2 text-[#94A3B8]">
                  Email
                </label>

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />

                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="off"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl
                    focus:outline-none focus:border-[#06b5cc]
                    transition-all duration-300
                    group-hover:border-[#06b5cc]/60"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm mb-2 text-[#94A3B8]">
                  Password
                </label>

                <div className="relative">

                  {/* Lock Icon */}
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] pointer-events-none" />

                  {/* Input */}
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    className="w-full pl-12 pr-14 py-3 bg-white/5 border border-white/10 rounded-xl
      focus:outline-none focus:border-[#06b5cc]
      transition-all duration-300"
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
  absolute right-0 top-1/2 -translate-y-1/2
  h-[85%] w-12
  flex items-center justify-center
  rounded-full
  bg-gradient-to-b from-[#11282b] to-[#06b5cc]/40
  border border-white/10
  text-[#94A3B8]
  hover:text-white
  transition-all duration-300
  hover:shadow-[0_0_8px_rgba(6,181,204,0.4)]
"

                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>


                </div>
              </div>
              {/* Remember */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-[#94A3B8]">
                  <input type="checkbox" className="mr-2 rounded" />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[#06b5cc] hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl
                bg-gradient-to-r from-[#11282b] to-[#06b5cc]
                hover:from-[#0d454e] hover:to-[#077083]
                transform hover:-translate-y-0.5
                shadow-lg hover:shadow-cyan-500/20
                transition-all duration-300
                flex items-center justify-center gap-2
                disabled:opacity-50"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

            </form>

            {/* Signup */}
            <div className="mt-6 text-center text-sm text-[#94A3B8]">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[#06b5cc] hover:text-white transition-colors"
              >
                Sign up
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
