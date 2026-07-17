import React from "react";
import { EmptyState, Button } from "../../components/index";

const AdminAchievements = () => {
  return (
    <div className="p-6">
      <EmptyState
        icon="🏆"
        title="Achievements Management"
        description="Coming soon - manage platform achievements and badges"
        action={<Button variant="primary">Learn More</Button>}
      />
    </div>
  );
};

export default AdminAchievements;
