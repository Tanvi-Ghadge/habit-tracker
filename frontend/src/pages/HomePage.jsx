import React, { useEffect, useState } from "react";
import { useHabitStore } from "../store/usehabitstore";
import HamburgerMenu from "../components/Hamburger";

const habitCategories = [
  "Health",
  "Fitness",
  "Nutrition",
  "Productivity",
  "Learning",
  "Mindfulness",
  "Social",
  "Hobbies",
  "Finance",
  "Other",
];

const HomePage = () => {
  const {
    habits,
    progress,
    fetchHabits,
    createHabit,
    deleteHabit,
    checkInHabit,
    fetchHabitProgress,
    updateHabit,
    loading,
    setProgress,
  } = useHabitStore();

  const [newHabit, setNewHabit] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [category, setCategory] = useState("Health");

  const [filterCategory, setFilterCategory] = useState("");

  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("Health");
  const [editFrequency, setEditFrequency] = useState("daily");

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;
    createHabit({
      name: newHabit,
      category: category || "Other",
      frequency,
      startDate: new Date(),
    });
    setNewHabit("");
    setFrequency("daily");
    setCategory("Health");
  };

  const handleDeleteHabit = (habitId) => {
    deleteHabit(habitId);
    if (progress?.habit?._id === habitId) {
      setProgress(null);
    }
  };

  const handleEditHabit = (habit) => {
    setEditingHabitId(habit._id);
    setEditName(habit.name);
    setEditCategory(habit.category || "Other");
    setEditFrequency(habit.frequency);
  };

  const handleSaveEdit = (habitId) => {
    updateHabit(habitId, {
      name: editName,
      category: editCategory,
      frequency: editFrequency,
    });
    setEditingHabitId(null);
  };

  const handleCancelEdit = () => {
    setEditingHabitId(null);
  };

  // Filter habits based on selected category
  const filteredHabits = filterCategory
    ? habits.filter((habit) => habit.category === filterCategory)
    : habits;

  return (
    <div className="container mx-auto px-6 py-10 space-y-10 pt-32">
      <HamburgerMenu />
      <h1 className="text-4xl font-bold text-emerald-700 text-center">
        Your Habits Dashboard 🌱
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}

      {/* Add Habit */}
      <div className="flex flex-wrap gap-4 justify-center items-end bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Habit Name
          </label>
          <input
            type="text"
            placeholder="e.g. Read 30 mins"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {habitCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <button
          onClick={handleAddHabit}
          className="bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-emerald-600 transition-all"
        >
          Add Habit
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex justify-end mb-6">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Filter by Category</option>
          {habitCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Habits List */}
      <div className="grid md:grid-cols-3 gap-6">
        {Array.isArray(filteredHabits) && filteredHabits.length > 0 ? (
          filteredHabits.map((habit) => (
            <div
              key={habit._id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform"
            >
              {editingHabitId === habit._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {habitCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editFrequency}
                    onChange={(e) => setEditFrequency(e.target.value)}
                    className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveEdit(habit._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="font-bold text-lg text-emerald-600 mb-1">
                    {habit.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Category: {habit.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Frequency: {habit.frequency}
                  </p>
                  <p className="text-sm text-gray-600">
                    Streak: {habit.streak || 0} 🔥
                  </p>
                  <p className="text-sm text-gray-600">
                    Completion: {habit.completionRate || 0}%
                  </p>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                      onClick={() => checkInHabit(habit._id)}
                      className="bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-600 text-sm transition-all"
                    >
                      Check In
                    </button>
                    <button
                      onClick={() => fetchHabitProgress(habit._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm transition-all"
                    >
                      Progress
                    </button>
                    <button
                      onClick={() => handleEditHabit(habit)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 text-sm transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteHabit(habit._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No habits yet. Add your first one! 🌱
          </p>
        )}
      </div>

      {/* Progress Section */}
      {progress && (
        <div className="bg-emerald-50 rounded-xl p-6 shadow-lg mt-8">
          <h2 className="text-xl font-bold text-emerald-700 mb-4">
            Progress for {progress.habit?.name}
          </h2>
          <p>Streak: {progress.streak} 🔥</p>
          <p>Completion Rate: {progress.completionRate}%</p>
          <p>Total Check-ins: {progress.totalCheckIns}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
