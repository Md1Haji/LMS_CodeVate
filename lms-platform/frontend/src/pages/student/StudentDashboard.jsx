import React from "react";
import { EmptyState, Button } from "../components/index";

const StudentDashboard = () => {
  return (
    <div className="p-6">
      <EmptyState
        icon="👨‍🎓"
        title="Student Dashboard"
        description="Coming soon - browse and learn from courses"
        action={<Button variant="primary">Learn More</Button>}
      />
    </div>
  );
};

export default StudentDashboard;
