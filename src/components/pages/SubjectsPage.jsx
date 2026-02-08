import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { getSubjects } from '../../services/publicService';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gradientMap = {
    'as-level': 'from-[#11282b] to-[#0a1f22]',
    'a2-level': 'from-[#0a1f22] to-[#11282b]',
    'igcse': 'from-[#F7C94C] to-[#06b5cc]'
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getSubjects();
        if (result.success) {
          // Transform API data to match expected format
          const transformedSubjects = result.data.map(subject => {
            // Use slug or _id as identifier
            const subjectId = subject.slug || subject._id;
            return {
              id: subjectId,
              _id: subject._id,
              name: subject.name,
              description: subject.description || '',
              level: subject.level,
              slug: subject.slug,
              gradient: gradientMap[subject.slug] || gradientMap[subject.level?.toLowerCase()] || 'from-[#11282b] to-[#0a1f22]'
            };
          });
          setSubjects(transformedSubjects);
        } else {
          setError(result.message || 'Failed to load subjects');
        }
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError('Failed to load subjects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen py-10 md:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-[#94A3B8]">Loading subjects...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Subjects</h2>
          <p className="text-[#94A3B8] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-gradient rounded-xl transition-colors shadow-lg shadow-[#06b5cc]/10 hover:shadow-[#06b5cc]/20"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (subjects.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#94A3B8] text-lg">No subjects available at the moment.</p>
        </div>
      </div>
    );
  }
  return <div className="min-h-screen py-10 md:py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
        <div className="inline-flex h-8 items-center gap-3 px-6 py-2.5 bg-[#06b5cc]/10 border border-[#06b5cc]/20 rounded-full mb-8 mx-auto mt-4 hover:bg-[#06b5cc]/15 transition-colors duration-300">
          <GraduationCap className="w-6 h-6 text-[#06b5cc] " />
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#06b5cc]"> Academic Excellence</span>
        </div>
        <h1 className="mb-6 text-gradient-cyan">Choose Your Subject</h1>
        <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
          Select the course you're studying to access comprehensive notes, practice questions, and expert guidance
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subjects.map((subject, index) => {
          // Use subject ID (slug or _id) for navigation
          const subjectId = subject.slug || subject._id || subject.id;
          // For now, always link to sections page (sections will be fetched dynamically)
          const linkTo = `/subjects/${subjectId}`;
          const linkText = 'View Sections';

          return <motion.div key={subject.id} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} whileHover={{
            y: -12,
            scale: 1.02
          }}>
            <Link to={linkTo} className="block group">
              <div className="relative bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-3xl p-6 md:p-8 h-full hover:border-white/30 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center mb-6`}>
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="mb-4 group-hover:text-white  transition-colors duration-300">
                    {subject.name}
                  </h2>

                  <p className="text-[#94A3B8]">
                    {subject.description}
                  </p>

                  <div className="mt-6 flex items-center text-[#06b5cc] group-hover:text-white transition-colors duration-300">
                    <span className="text-sm">{linkText}</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>;
        })}
      </div>
    </div>
  </div>;
}