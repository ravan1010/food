// src/pages/Explore.jsx
import React, { useEffect, useState } from 'react';
import OrganizerCard from './OrganizerCard';
// import { SlidersHorizontal } from 'lucide-react';
import axios from 'axios';
import Navbar from './navbar';
import Footer from './Footer';

const Explore = () => {
  const [organizersData, setorganizersData] = useState([])
  const [filters, setFilters] = useState({
    name: '',
    companyName: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const fetchEventData = async() => {
  try {
    const res = await axios.get('/api/explore', { withCredentials: true });
    setorganizersData(res.data);
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
  };

  useEffect(() => {
    fetchEventData();
  }, []);
  
  const filteredOrganizers = organizersData.filter(org => {
    const nameMatch = filters.name ? org.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
    const companyNameMatch = filters.companyName ? org.companyName.toLowerCase().includes(filters.companyName.toLowerCase()) : true;
    return nameMatch && companyNameMatch 
  });

  // const Eventcategorys = ['All', 'birthday', 'wedding'];

  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Food</h1>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Type Filter */}
           
            {/* Location Filter */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" id="name" value={filters.name} onChange={handleFilterChange} placeholder="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Resturant Name</label>
              <input type="text" name="companyName" id="companyName" value={filters.companyName} onChange={handleFilterChange} placeholder="e.g., Resturant" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Budget Filter */}
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{filteredOrganizers.length} Planners Found</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOrganizers.map(organizer => (
              <OrganizerCard key={organizer._id} organizer={organizer} />
            ))}
          </div>
           {filteredOrganizers.length === 0 && (
            <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No planners match your criteria. Try adjusting your filters!</p>
            </div>
           )}
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Explore;