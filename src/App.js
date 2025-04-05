import React, { useState } from "react";
import "./App.css";

function App() {
  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Personnel");
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Predefined list of task suggestions
  const taskSuggestions = [
    "Read a book",
    "Go for a run",
    "Workout",
    "Prepare lunch",
    "Write an article",
    "Clean the house",
    "Learn a new skill",
    "Plan weekend trip",
    "Study for exam",
    "Call a friend",
    "Buy groceries",
    "Watch a movie",
    "Meditate",
    "Do laundry",
    "Work on a project"
  ];

  // Filtered suggestions based on the user's input
  const filteredSuggestions = taskSuggestions.filter(task =>
    task.toLowerCase().includes(newTask.toLowerCase())
  );

  // Add a task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, category, completed: false }]);
      setNewTask("");
      setShowSuggestions(false);
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion) => {
    setNewTask(suggestion);
    setShowSuggestions(false);
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task with confirmation
  const deleteTask = (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }
  };

  // Clear completed tasks with confirmation
  const clearCompletedTasks = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    if (completedCount === 0) {
      alert("Il n'y a pas de tâches terminées à supprimer.");
      return;
    }
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${completedCount} tâche(s) terminée(s) ?`)) {
      const updatedTasks = tasks.filter((task) => !task.completed);
      setTasks(updatedTasks);
    }
  };

  // Filter tasks by name and search term
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  }).filter((task) => task.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="App">
      <header>
        <h1>Gestionnaire de Tâches</h1>
      </header>
      <main>
        <div className="task-input">
          <input
            type="text"
            placeholder="Ajouter une tâche..."
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {newTask && showSuggestions && filteredSuggestions.length > 0 && (
            <div className="suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="suggestion-item" 
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Personnel">Personnel</option>
            <option value="Professionnel">Professionnel</option>
          </select>
          <button onClick={addTask}>Ajouter</button>
        </div>

        <div className="task-search">
          <input
            type="text"
            placeholder="Rechercher une tâche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>

        <div className="task-filter">
          <button onClick={() => setFilter("All")}>Toutes</button>
          <button onClick={() => setFilter("Completed")}>Terminées</button>
          <button onClick={() => setFilter("Pending")}>En attente</button>
        </div>

        <div className="task-list">
          {filteredTasks.map((task, index) => (
            <div key={index} className={`task ${task.completed ? "completed" : ""}`}>
              <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
              <span className="category">[{task.category}]</span>
              <button onClick={() => deleteTask(index)}>Supprimer</button>
              <button onClick={() => toggleTaskCompletion(index)}>
                {task.completed ? "Marquer comme en cours" : "Marquer comme terminé"}
              </button>
            </div>
          ))}
        </div>

        <div className="task-actions">
          <button onClick={clearCompletedTasks}>Effacer les tâches terminées</button>
        </div>
      </main>
    </div>
  );
}

export default App;