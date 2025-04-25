import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      const [isLoading, setIsLoading] = useState(false);
      const [isSidebarOpen, setSidebarOpen] = useState(false);
      const sidebarRef = useRef(null);
      const menuToggleRef = useRef(null);
      const [joinId, setjoinId] = useState("")
    
      useEffect(() => {


        const handleClickOutside = (event) => {
          if (
            isSidebarOpen && 
            sidebarRef.current && 
            !sidebarRef.current.contains(event.target) &&
            menuToggleRef.current &&
            !menuToggleRef.current.contains(event.target)
          ) {
            setSidebarOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isSidebarOpen]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        console.log('Form submitted:', formData);
      };
    
      const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
      };
    
      
     
    
      return (
        <div className="containers">
          <main className={`main-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <nav className="navbar">
              <div className="nav-start">
                <div className="logo">Study-Mitra</div>
              </div>
              <div className="nav-controls">
            <div className="search-bar">
              <input type="text" placeholder="Enter meeting code..." onChange={(e)=>{localStorage.setItem("id",e.target.value)}} />
                  <Link to='/JoinMeeting' className="join-btn">
                    <span className="btn-text">Join Now</span>
                    <span className="btn-icon">→</span>
                  </Link>
                </div>
                <button 
                  className="menu-toggle glow-animation" 
                  onClick={toggleSidebar}
                  ref={menuToggleRef}
                >
                  {isSidebarOpen ? '✕' : '☰'}
                </button>
            </div>
          </nav>
    
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
              <div className="sidebar-header">
                <span className="sidebar-logo">S</span>
                <h3 className="sidebar-title">Study-Mitra</h3>
              </div>
              <nav className="sidebar-nav">
                <button className="nav-item active">
                  <span className="nav-icon">🏠</span>
                  <span className="nav-text">Dashboard</span>
                </button>
                <button className="nav-item">
                  <span className="nav-icon">📅</span>
                  <span className="nav-text">Schedule</span>
                </button>
                <button className="nav-item">
                  <span className="nav-icon">📝</span>
                  <span className="nav-text">Notes</span>
                </button>
                <button className="nav-item">
                  <span className="nav-icon">🎥</span>
                  <span className="nav-text">Check Recording</span>
                </button>
                <button className="nav-item">
                  <span className="nav-icon">⏰</span>
                  <span className="nav-text">Set Reminder</span>
                </button>
                <button className="nav-item">
                  <span className="nav-icon">📞</span>
                  <span className="nav-text">Contact Us</span>
                </button>
                <button className="nav-item">
                  <span className="nav-icon">⚙️</span>
                  <span className="nav-text">Settings</span>
                </button>
                <button className="nav-item">
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">Analytics</span>
                </button>
                <button className="nav-item">
                  <span className="nav-icon">📚</span>
                  <span className="nav-text">Resources</span>
                </button>
              </nav>
              <div className="sidebar-footer">
                <div className="user-info">
                  <div className="user-avatar">👤</div>
                  <div className="user-details">
                    <span className="user-name">Student</span>
                    <span className="user-status">Online</span>
                  </div>
                </div>
              </div>
            </aside>
    
            <div className="main-content">
            <div className="welcome-section">
                <h1>Welcome to Study-Mitra</h1>
                <p>Your Ultimate Learning Companion</p>
                <div className="welcome-badges">
                  <span className="badge">Live Sessions</span>
                  <span className="badge">Smart Learning</span>
                  <span className="badge">24/7 Support</span>
                </div>
            </div>
    
            <div className="content-grid">
              <div className="profile-card">
                  <div className="card-blur"></div>
                  <h2>Quick Login</h2>
                  <form onSubmit={handleSubmit} className="compact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                    <button type="submit" className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                      {isLoading ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        <>
                          <span className="btn-text">Start Learning</span>
                          <span className="btn-icon">→</span>
                        </>
                      )}
                    </button>
                </form>
              </div>
    
              <div className="meeting-actions">
                <button className="action-btn">
                  <span className="btn-icon">📅</span>
                  Schedule Meeting
                </button>
                <Link to={'/InstantMeeting'} className="action-btn" >
                  <span className="btn-icon">⚡</span>
                  Start Instant Meeting
                    
                </Link>
                <button className="action-btn">
                  <span className="btn-icon">👥</span>
                  Create Mitr Group
                </button>
                <div className="storage-info">
                    <div className="storage-icon">💾</div>
                  <span>Storage: 2.4 GB</span>
                    <div className="storage-bar">
                      <div className="storage-progress" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
  )
}

export default Home