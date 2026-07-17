import React from "react";
import { EmptyState, Button } from "../../components/index";

const AdminReviews = () => {
  return (
    <div className="p-6">
      <EmptyState
        icon="⭐"
        title="Reviews Moderation"
        description="Coming soon - moderate course reviews"
        action={<Button variant="primary">Learn More</Button>}
      />
    </div>
  );
};

export default AdminReviews;
