import React from "react";
import { EmptyState, Button } from "../components/index";

const InstructorDashboard = () => {
  return (
    <div className="p-6">
      <EmptyState
        icon="👨‍🏫"
        title="Instructor Dashboard"
        description="Coming soon - create and manage your courses"
        action={<Button variant="primary">Learn More</Button>}
      />
    </div>
  );
};

export default InstructorDashboard;
