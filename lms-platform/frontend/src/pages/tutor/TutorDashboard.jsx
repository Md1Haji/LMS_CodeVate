import React from "react";
import { EmptyState, Button } from "../components/index";

const TutorDashboard = () => {
  return (
    <div className="p-6">
      <EmptyState
        icon="👨‍🏫"
        title="Tutor Dashboard"
        description="Coming soon - support students in your assigned courses"
        action={<Button variant="primary">Learn More</Button>}
      />
    </div>
  );
};

export default TutorDashboard;
