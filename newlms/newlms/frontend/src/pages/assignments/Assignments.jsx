import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, FileText, ChevronDown } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import AssignmentPlaceholder from '../../components/assignments/AssignmentPlaceholder';
import VoiceAssignmentTutor from '../../components/assignments/VoiceAssignmentTutor';

const Assignments = () => {
  const [assignmentType, setAssignmentType] = useState('Voice Assistance Assignment');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col text-left gap-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Assignments Hub"
          subtitle="Manage student exercises, project submissions, and evaluation metrics."
        />

        {/* Assignment Type Selector Dropdown */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <label className="text-xs font-bold text-slate-500 pl-2 uppercase tracking-wider">
            Assignment Type:
          </label>
          <div className="relative">
            <select
              value={assignmentType}
              onChange={(e) => setAssignmentType(e.target.value)}
              className="appearance-none bg-slate-50 text-slate-800 text-xs font-bold py-2 pl-3 pr-8 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="Normal Assignment">Normal Assignment</option>
              <option value="Voice Assistance Assignment">Voice Assistance Assignment</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-premium mt-1">
        {assignmentType === 'Normal Assignment' ? (
          <AssignmentPlaceholder />
        ) : (
          <VoiceAssignmentTutor />
        )}
      </div>
    </motion.div>
  );
};

export default Assignments;
