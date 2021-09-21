import PatientCreateForm from 'components/Forms/PatientCreateForm';
import SidebarNutritionist from 'components/SidebarNutritionist';
import React from 'react';

const DashboardNutritionistCreatePatient = () => {
  return (
    <div className="dashboard-page page-padding">
      <div className="dashboard-page-left">
        <SidebarNutritionist />
      </div>
      <div className="dashboard-page-right">
        <div className="">
          <PatientCreateForm/>
        </div>
      </div>
    </div>
  );
};

export default DashboardNutritionistCreatePatient;