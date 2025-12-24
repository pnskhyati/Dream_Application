
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { BookIcon, HeartIconSolid, RefreshIcon, WishlistComparisonView, ai, ScaleIcon, LocationIcon, NearbyCollegesView } from './common';
import { Type } from "@google/genai";

export const WishlistPage = ({ navigateTo, selectCourseAndNavigate, user }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [locating, setLocating] = useState(false);
  const [nearbyCollegesData, setNearbyCollegesData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
          throw new Error("User not authenticated");
      }
      
      // Path: /users/{{uid}}/Courses/Wishlist
      const docRef = doc(db, "users", user.uid, "Courses", "Wishlist");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
          const data = docSnap.data();
          // Map array of strings to objects for UI
          const items = ((data as any).wishlist_course || []).map((name: any) => ({ courseName: name }));
          setWishlist(items);
      } else {
          setWishlist([]);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const handleRemove = async (e, courseName) => {
      e.stopPropagation();
      if (!user) return;
      
      try {
          const docRef = doc(db, "users", user.uid, "Courses", "Wishlist");
          await updateDoc(docRef, {
              wishlist_course: arrayRemove(courseName)
          });
          
          setWishlist(prev => prev.filter(item => item.courseName !== courseName));
          // Clear comparison data if item removed affects it
          if (comparisonData) setComparisonData(null);
      } catch (err) {
          console.error("Error removing from wishlist:", err);
          alert("Failed to remove item.");
      }
  };

  const handleCompare = async () => {
      if (wishlist.length < 2) {
          alert("You need at least 2 courses in your wishlist to compare.");
          return;
      }
      
      setComparing(true);
      setComparisonData(null);
      setNearbyCollegesData(null); // Reset maps data on new comparison

      const courseNames = wishlist.map(w => w.courseName);
      const prompt = `Provide a comprehensive and detailed comparison for the following career paths in India: ${courseNames.join(', ')}. 
      
      For each course, return a JSON object with:
      - name (string): Course name
      - salaryRange (string): Average salary range (e.g., "₹4L - ₹8L")
      - growthOutlook (string): Industry growth outlook (e.g., "High Growth")
      - jobRoles (string): 2-3 key job roles (e.g., "Analyst, Developer")
      - keySkills (string): 3-4 most critical skills
      - topCompanies (string): 2-3 top hiring companies
      - duration (string): Typical course duration (e.g., "4 Years", "2 Years")
      - avgFees (string): Average total course fees in India (e.g., "₹5L - ₹15L")
      - admissionProcess (string): Brief on entrance exams or eligibility (e.g., "CAT, GMAT", "JEE Mains")
      - pros (string): 1-2 main benefits
      - cons (string): 1-2 main challenges
      - difficulty (string): "High", "Moderate", or "Low" difficulty to master
      
      Return a JSON array of these objects.`;

      try {
          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: {
                      type: Type.ARRAY,
                      items: {
                          type: Type.OBJECT,
                          properties: {
                              name: { type: Type.STRING },
                              salaryRange: { type: Type.STRING },
                              growthOutlook: { type: Type.STRING },
                              jobRoles: { type: Type.STRING },
                              keySkills: { type: Type.STRING },
                              topCompanies: { type: Type.STRING },
                              duration: { type: Type.STRING },
                              avgFees: { type: Type.STRING },
                              admissionProcess: { type: Type.STRING },
                              pros: { type: Type.STRING },
                              cons: { type: Type.STRING },
                              difficulty: { type: Type.STRING }
                          }
                      }
                  }
              }
          });
          
          const data = JSON.parse(response.text);
          setComparisonData(data);
      } catch (err) {
          console.error("Error generating comparison:", err);
          alert("Failed to compare courses. Please try again.");
      } finally {
          setComparing(false);
      }
  };

  const handleFindColleges = () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }
    
    setLocating(true);
    setNearbyCollegesData(null);

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        const courseNames = wishlist.map(w => w.courseName).join(', ');
        const prompt = `Find specific colleges near me (Latitude: ${latitude}, Longitude: ${longitude}) that offer these courses: ${courseNames}. 
        Provide a list with their names, estimated driving distances, and full addresses.`;
        
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    tools: [{ googleMaps: {} }],
                    toolConfig: {
                        retrievalConfig: {
                            latLng: { latitude, longitude }
                        }
                    }
                }
            });
            setNearbyCollegesData(response); 
        } catch (e) {
           console.error("Error fetching colleges:", e);
           alert("Could not find colleges at this time.");
        } finally {
            setLocating(false);
        }
    }, (err) => {
        console.error(err);
        setLocating(false);
        alert("Unable to retrieve your location. Please allow location access.");
    });
  };


  return (
    <div className="filter-container"> 
      <header className="header filter-header">
        <button onClick={() => navigateTo('dashboard')} className="back-button" aria-label="Go back">
          ← Back
        </button>
        <h1 className="header-title-filter">My Wishlist</h1>
        <div style={{ width: '80px' }}></div>
      </header>
      
      <main className="content-wrapper">
          {loading ? (
              <div className="loader"></div>
          ) : error ? (
              <div className="error-message">{error}</div>
          ) : wishlist.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                  <HeartIconSolid />
                  <h3 style={{ color: '#666', marginTop: '1rem' }}>Your wishlist is empty.</h3>
                  <button className="button primary" onClick={() => navigateTo('filter')} style={{ marginTop: '1rem' }}>
                      Explore Courses
                  </button>
              </div>
          ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', gap: '1rem' }}>
                     {comparisonData && (
                        <button 
                            className="button primary" 
                            onClick={handleFindColleges} 
                            disabled={locating}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#10b981' }}
                        >
                            <LocationIcon /> {locating ? "Locating..." : "Find Colleges Near Me"}
                        </button>
                     )}
                    <button 
                        className="button primary" 
                        onClick={handleCompare} 
                        disabled={comparing || wishlist.length < 2}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: wishlist.length < 2 ? '#ccc' : '' }}
                    >
                        <ScaleIcon /> {comparing ? "Generating Detailed Comparison..." : "Compare All (Detailed)"}
                    </button>
                </div>

                {comparisonData && (
                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ textAlign: 'center', color: '#333' }}>Detailed Course Comparison</h3>
                        <WishlistComparisonView data={comparisonData} />
                    </div>
                )}

                {locating && <div className="loader" style={{ margin: '2rem auto' }}></div>}

                {nearbyCollegesData && (
                    <NearbyCollegesView 
                        data={nearbyCollegesData} 
                        location={userLocation}
                        courses={wishlist.map(w => w.courseName)}
                    />
                )}

                <div className="career-grid" style={{ marginTop: comparisonData ? '3rem' : '0' }}>
                    {wishlist.map((item, index) => (
                    <div key={index} className="career-card" onClick={() => selectCourseAndNavigate({ name: item.courseName })} style={{ position: 'relative' }}>
                        <div className={`career-icon bg-btech`}>
                            {item.courseName.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="career-name">{item.courseName}</h3>
                        <p className="career-sub">Saved Course</p>
                        
                        <button 
                            onClick={(e) => handleRemove(e, item.courseName)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                color: '#e0245e',
                                zIndex: 2
                            }}
                            title="Remove from Wishlist"
                        >
                            <HeartIconSolid />
                        </button>
                    </div>
                    ))}
                </div>
              </>
          )}
      </main>
    </div>
  );
};
