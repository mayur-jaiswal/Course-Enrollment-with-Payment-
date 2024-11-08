import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseList from "./CourseList";
import PaymentComponent from "./PaymentComponent"; 

export const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); 
  const [isOtpVerified, setIsOtpVerified] = useState(false); 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    console.log("Course selected:", course);
    setIsOtpVerified(true); 
  };

  return (
    <div className="App">
      <h1>Welcome to SciAstra</h1>
      <h2>Our Courses</h2>
      {courses.length > 0 ? (
        <CourseList courses={courses} onCourseSelect={handleCourseSelection} />
      ) : (
        <p>No courses available at the moment.</p>
      )}

      {selectedCourse && isOtpVerified && (
        <PaymentComponent
          courseId={selectedCourse.id}
          amount={selectedCourse.amount}
        />
      )}
    </div>
  );
};
