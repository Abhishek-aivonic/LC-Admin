import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import supabase from "./data/supabase";

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase.from("issues").select("*");
      if (error) console.error(error);
      else setIssues(data);
      setLoading(false);
    };
    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      {/* 🔥 Beautiful Carousel Banner */}
      <div className="w-full max-w-6xl mx-auto pt-6">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="rounded-2xl shadow-2xl overflow-hidden"
        >
          <SwiperSlide>
            <img
              src="https://npg.news/h-upload/2024/06/12/1230513-n-chandrababu-naidu-biography-hindi.webp"
              alt="Slide 1"
              className="w-full h-[450px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-800,h-800:w-400,h-600,c-at_max/et00379174-jqkefxqebx-portrait.jpg"
              alt="Slide 2"
              className="w-full h-[450px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://static.toiimg.com/thumb/msid-110546268,width-1280,height-720,resizemode-4/110546268.jpg"
              alt="Slide 3"
              className="w-full h-[450px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 🎥 Section Heading */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-2">
          Issues Reported
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Citizen Complaints and Local Governance Updates
        </p>

        {/* 📊 Issues Table */}
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : issues.length === 0 ? (
          <div className="text-center text-gray-400">No issues found.</div>
        ) : (
          <div className="overflow-x-auto max-w-6xl mx-auto bg-white rounded-lg shadow-lg text-black">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">State</th>
                  <th className="px-4 py-2">District</th>
                  <th className="px-4 py-2">Village</th>
                  <th className="px-4 py-2">Issue</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors border-b"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{issue.state}</td>
                    <td className="px-4 py-2">{issue.district}</td>
                    <td className="px-4 py-2">{issue.village}</td>
                    <td className="px-4 py-2">{issue.issue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesPage;
