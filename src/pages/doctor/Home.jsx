import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fontsource/great-vibes';

function Home() {
  const [bookingData, setBookingData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cozastore.online/api/user/get-appoinment');
        console.log(response.data.data);
        setBookingData(response.data.data); // Set the booking data
      } catch (err) {
        setError('Failed to fetch data.'); // Set the error state
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependencies array to run only once

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <div className='-mt-36'>
      {/* Banner */}
      <div className='relative w-full h-screen'>
        <video
          className='absolute top-0 left-0 w-full h-full object-cover'
          src='http://www.skinandyou.in/static/media/Website%20Video.609f78c6161b60ddc4be.mp4'
          autoPlay
          loop
          muted
          playsInline
        />
        <div className='relative z-10 h-full flex items-center justify-center'>
          <span className='text-5xl text-[#1d2a4d] font-semibold'>WELCOME DR. GEETA MEHRA FAZALBHOY</span>
        </div>
      </div>

      {/* User booked details */}
      <div className='container mx-auto px-16 py-8'>
        <h2 className='text-2xl font-semibold text-[#0c1451] mb-4'>User Booked Details</h2>
        <div className='overflow-x-auto'>
          {bookingData.length === 0 ? ( // Check if there are no bookings
            <div className='text-center text-lg text-gray-500'>No orders yet.</div> // Message if no bookings
          ) : (
            <table className='min-w-full bg-white border border-gray-200 shadow-lg'>
              <thead>
                <tr>
                  <th className='px-6 py-3 border-b bg-[#fe9b8e] text-left text-sm leading-4 font-medium text-white uppercase tracking-wider'>Username</th>
                  <th className='px-6 py-3 border-b bg-[#fe9b8e] text-left text-sm leading-4 font-medium text-white uppercase tracking-wider'>Email</th>
                  <th className='px-6 py-3 border-b bg-[#fe9b8e] text-left text-sm leading-4 font-medium text-white uppercase tracking-wider'>Phone</th>
                  <th className='px-6 py-3 border-b bg-[#fe9b8e] text-left text-sm leading-4 font-medium text-white uppercase tracking-wider'>Booking Date</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {bookingData.map((booking, index) => (
                  <tr key={index} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900'>{booking.username}</td>
                    <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900'>{booking.email}</td>
                    <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900'>{booking.phone}</td>
                    <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900'>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
