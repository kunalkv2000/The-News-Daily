import React, { useEffect } from "react";
import { useGlobalStateContext } from "../context/GlobalStateContext";
import NewsCard from "../components/NewsCard";
import CategorySelector from "../components/CategorySelector";
import Loader from "../components/Loader"; // Optional, for handling loading state
import { useNavigate } from "react-router-dom";
import NewsList from "../components/NewsList";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import NewsPage from "../components/NewsPage";

const HomePage = () => {
  const {
    preferences,
    newsData,
    loading,
    updatePreferences,
    setLoading,
    setNewsData,
  } = useGlobalStateContext();

  const { setError } = useAuthContext();

  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate("/dashboard"); // Navigate to the dashboard with anchor
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gray-50">
        <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
          <img
            className="w-auto h-full"
            src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/background-pattern.png"
            alt=""
          />
        </div>

        <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5 ">
              <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                  <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
                    <span className="px-2 text-white bg-black rounded-lg">
                      Get In-Depth{" "}
                    </span>
                    Coverage On Global Headlines
                  </h1>

                  <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                    <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                      <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/avatar-male.png"
                        alt=""
                      />
                      <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/avatar-female-1.png"
                        alt=""
                      />
                      <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/avatar-female-2.png"
                        alt=""
                      />
                    </div>

                    <p className="mt-4 text-lg text-gray-900 lg:mt-0 lg:ml-4 font-pj">
                      Join with{" "}
                      <span className="font-bold">4600+ Subscribers</span> and
                      know the{" "}
                      <span className="font-bold"> Breaking News Updates </span>{" "}
                      Getstarted right now
                    </p>
                  </div>
                </div>

                <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                  <a
                    onClick={handleSubscribeClick}
                    title=""
                    className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600"
                    role="button"
                  >
                    Subscribe now
                  </a>

                  <a
                    href="#news"
                    title=""
                    className="inline-flex items-center px-4 py-4 mt-4 text-lg font-bold transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj justif-center rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-200 focus:bg-gray-200"
                    role="button"
                  >
                    Explore NEWS
                  </a>
                </div>
              </div>

              <div className="xl:col-span-3">
                <img
                  className="mx-auto p-5 rounded-lg scale-110 "
                  src="https://raw.githubusercontent.com/kunalkv2000/News-App/refs/heads/main/assets/news.png"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="bg-gray-50 py-10" id="news">
        {loading ? (
          <Loader /> // Show loader while fetching news
        ) : (
          <div>
            <NewsPage />
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
