import React, { useState } from 'react';
import { Award, BookOpenCheck, Download, Share2, CheckCircle2, Lock } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const mockCertificates = [
    {
      id: 'cert-1',
      courseTitle: 'React Development Masterclass',
      issuedDate: 'July 15, 2026',
      instructor: 'Dr. Manoj Kumar',
      skills: ['React 19', 'JSX', 'Redux Toolkit', 'Hooks'],
      grade: '98% Score',
      unlocked: true
    },
    {
      id: 'cert-2',
      courseTitle: 'Python Data Structures & Algorithms',
      issuedDate: 'In Progress (90% Completed)',
      instructor: 'Dr. Manoj Kumar',
      skills: ['Python 3', 'OOP', 'Data Structures'],
      grade: 'Pending Completion',
      unlocked: false
    }
  ];

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="border-b border-slate-200/60 pb-4">
        <h1 className="text-xl font-black tracking-tight text-slate-800">My Earned Certificates & Qualifications</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Verify and showcase your official course completion credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCertificates.map(cert => (
          <Card key={cert.id} className="p-5 flex flex-col justify-between border-slate-200/50 bg-white">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Award size={22} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  cert.unlocked ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}>
                  {cert.unlocked ? 'Official Certificate' : 'In Progress'}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-base font-extrabold text-slate-800">{cert.courseTitle}</h3>
                <p className="text-xs text-slate-500 font-medium">Instructor: {cert.instructor}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-2">
                {cert.skills.map(s => (
                  <span key={s} className="text-[9px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold">{cert.issuedDate}</span>
              {cert.unlocked ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedCert(cert)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-extrabold"
                >
                  View & Download
                </Button>
              ) : (
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  <Lock size={12} /> Complete remaining lessons
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Certificate Modal Preview */}
      {selectedCert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl w-full shadow-2xl flex flex-col gap-6 text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
              <Award size={36} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600">Certificate of Completion</span>
              <h2 className="text-xl font-black text-slate-800">This certifies that Student Manoj</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                has successfully completed all lectures, assignments, and assessments for <span className="font-bold text-slate-800">{selectedCert.courseTitle}</span>.
              </p>
            </div>

            <div className="flex justify-around border-y border-slate-100 py-4 text-xs font-bold text-slate-600">
              <div>Issued Date: {selectedCert.issuedDate}</div>
              <div>Instructor: {selectedCert.instructor}</div>
              <div>Grade: {selectedCert.grade}</div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert('Certificate PDF Generated')}
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 text-xs font-extrabold"
              >
                <Download size={14} className="mr-1" /> Download PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedCert(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-extrabold"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
