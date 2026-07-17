import React from "react";
import { EmptyState, Button } from "../../components/index";

const AdminCourses = () => {
  return (
    <div className="p-6">
      <EmptyState
        icon="📚"
        title="Courses Management"
        description="Coming soon - manage all courses on the platform"
        action={<Button variant="primary">Learn More</Button>}
      />
    </div>
  );
};

export default AdminCourses;
