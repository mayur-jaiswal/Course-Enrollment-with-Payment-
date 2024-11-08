import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
  return (
    <div className="course-list">
      {courses.length > 0 ? (
        courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
        <p>No courses to display.</p>
      )}
    </div>
  );
};

export default CourseList;
