import React from 'react';
import EmployeeLayout from '../../components/EmployeeLayout';


const Profile = () => {
  return (
    <EmployeeLayout>
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg">Raghv Chadda</div>
            <div className="text-purple-500 font-semibold text-base">
              Manager <span className="text-green-500 font-medium text-sm">• Online</span>
            </div>
          </div>
          <button className="border border-gray-200 rounded px-4 py-1 bg-gray-50 text-gray-500 font-semibold">Log Out</button>
        </div>
      </div>

      {/* Shift Timing Card */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">
        <div className="flex items-center mb-2">
          <span className="text-xl text-purple-500 mr-2">🕑</span>
          <span className="font-bold text-base">Shift Timing</span>
        </div>
        <div className="text-sm text-gray-500 mb-1">Shift Timing : <span className="text-gray-800 font-medium">10:00 AM – 6:00 PM</span></div>
        <div className="text-sm text-gray-500 mb-1">Shift Duration : <span className="text-gray-800 font-medium">8 hrs</span></div>
        <div className="text-sm text-gray-500 mb-1">Time Passed : <span className="text-purple-500 font-bold">03:42 hrs</span></div>
        <div className="text-sm text-gray-500 mb-1">Break Time : <span className="text-yellow-500 font-bold">00:15 min</span></div>
        <div className="text-sm text-gray-500 mb-3">Work Time : <span className="text-green-500 font-bold">03:28 hrs</span></div>
        <button className="w-full bg-yellow-500 text-white font-bold rounded py-2 text-base">Take Break</button>
      </div>

      {/* Allocated Section */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">
        <div className="mb-2">
          <div className="text-gray-500 font-medium text-sm">Allocated Section</div>
          <div className="font-semibold text-base text-gray-800">AC , Garden , Main Hall</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-500 font-medium text-sm">Assigned Tables</div>
          <div className="font-semibold text-base text-gray-800">T2 , T3 , T7</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-500 font-medium text-sm">Allocated Kitchen</div>
          <div className="font-semibold text-base text-gray-800">Kitchen one</div>
        </div>
        <div>
          <div className="text-gray-500 font-medium text-sm">Billing terminal</div>
          <div className="font-semibold text-base text-gray-800">Terminal - 1</div>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default Profile;
