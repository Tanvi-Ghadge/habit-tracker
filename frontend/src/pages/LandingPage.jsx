import React from "react";
import Logo from "../assets/Logo.png";
import header from "../assets/header.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32 min-h-screen">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                Track habits & share your progress!
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-stone-800 leading-tight">
                <span className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                  HabitNest: <br />
                  Build Habits, Share Wins, <br />
                  Grow Together
                </span>
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
                Track your daily routines, stay consistent with streaks, and
                share updates in a positive social feed. Your habit journey,
                simplified.
              </p>
              <div className="text-lg text-stone-500 font-medium">
                Track. Share. Stay Motivated.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={"/login"}>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  Start Tracking
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[500px] h-[500px]">
              <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl shadow-2xl overflow-hidden relative">
                <img
                  src={header}
                  alt="Header img"
                  className="w-full h-full object-contain"
                />
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Habit Tracking Matters */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Why Track Habits?
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Staying consistent with your habits builds momentum and real growth.
            HabitNest makes it simple and social.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Habits */}
          <div className="bg-white/60 backdrop-blur-sm border border-emerald-100 shadow-lg hover:shadow-xl transition-all rounded-3xl p-8 text-center group hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-stone-800 mb-4">
              Track Your Habits
            </h3>
            <p className="text-stone-600 leading-relaxed mb-4">
              Add new habits, complete check-ins, and keep your streak alive.
            </p>
            <div className="text-sm text-emerald-700 font-medium">
              Stay consistent every day.
            </div>
          </div>

          {/* Social */}
          <div className="bg-white/60 backdrop-blur-sm border border-emerald-100 shadow-lg hover:shadow-xl transition-all rounded-3xl p-8 text-center group hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-stone-800 mb-4">
              Share Your Progress
            </h3>
            <p className="text-stone-600 leading-relaxed mb-4">
              Post updates, celebrate wins, and get motivated by others in the
              feed.
            </p>
            <div className="text-sm text-emerald-700 font-medium">
              Grow together, not alone.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-3xl p-12 md:p-20 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Build Habits?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Track your routines, keep streaks alive, and share the journey with
            others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/login"}>
              <button className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg">
                Begin Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shadow">
                <img
                  src={Logo}
                  alt="HabitNest Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-stone-800">HabitNest</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Simple habit tracking with social motivation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-800 mb-4">Product</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="block text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Security
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-stone-800 mb-4">Support</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-emerald-100 pt-8">
          <p className="text-stone-500 text-center">
            © 2025 HabitNest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
