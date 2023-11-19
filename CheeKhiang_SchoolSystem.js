    const Schools = [
        {
            'school_name': 'NYP',
            'school_ID': '1111',
            'school_location': '180 Ang Mo Kio Avenue 8, Singapore 569830'
        },
        {
            'school_name': 'SP',
            'school_ID': '2222',
            'school_location': '500 Dover Road, Singapore 139651'
        },
        {
            'school_name': 'NP',
            'school_ID': '3333',
            'school_location': '535 Clementi Road, Singapore 599489'
        },
        {
            'school_name': 'RP',
            'school_ID': '4444',
            'school_location': '9 Woodlands Avenue 9, Singapore 738964'
        },
        {
            'school_name': 'TP',
            'school_ID': '5555',
            'school_location': '21 Tampines Ave 1, Singapore 529757'
        }
    ];
    
    const Students = [
        {
            'student_name': 'Sarah Chan',
            'student_ID': '123456A',
            'home_location': '156 Cecil Street, Far Eastern Bank Building, , 09-01 69544'
        },
        {
            'student_name': 'Dyan Lim',
            'student_ID': '234567B',
            'home_location': '221 Henderson Rd #07-12'
        },
        {
            'student_name': 'Adrian Chiang',
            'student_ID': '345678C',
            'home_location': '435 Orchard Rd #19-03 Wisma Atria S()'
        },
        {
            'student_name': 'Gwyneth Yee',
            'student_ID': '456789D',
            'home_location': '16 Mohamed Sultan Road #02-32'
        }
    ];
    
    const Courses = [
        {
            'school_ID': '1111',
            'course_name': 'Pharmaceutical Sciences',
            'course_ID': '1234567890A',
            'Vacancies': 40
        },
        {
            'school_ID': '5555',
            'course_name': 'Common Business',
            'course_ID': '0987654321H',
            'Vacancies': 25
        },
        {
            'school_ID': '4444',
            'course_name': 'Infocomm and Media',
            'course_ID': '0987345612D',
            'Vacancies': 37
        },
        {
            'school_ID': '1111',
            'course_name': 'Cyber Security',
            'course_ID': '2345987610P',
            'Vacancies': 16
        }
    ];
    
    const Enrollment = [
        {
            'course_ID': '2345987610P',
            'student_ID': '456789D'
        },
        {
            'course_ID': '0987654321H',
            'student_ID': '123456A'
        }
    ];


// View school details by name
const viewSchool = (name) => {
    return Schools.find((n) => n.school_name === name);
};

const getAllStudents = () => {
    return Students;
};

//view students details by their name
const viewStudentByName = (studentName) => {
    const foundStudent = Students.find(student => student.student_name === studentName);
    return foundStudent || null;
};

//view all courses
const getAllCourses = () => {
    return Courses;
};

//view all enrolled studentsID and their courseID
const getAllEnrollments = () => {
    return Enrollment;
};

//add a student to the list
const addStudent = (student) => {
    Students.push(student);
};

//remove student from the list
const removeStudent = (studentID) => {
    Students = Students.filter(student => student.student_ID !== studentID);
};

//edit student info
const editStudent = (studentID, updatedInfo) => {
    Students = Students.map(student => {
        if (student.student_ID === studentID) {
            return { ...student, ...updatedInfo };
        }
        return student;
    });
};

//enrolls student into course by studentID and courseID
//each course has a number of vacancies and everytime a student enrolls the vacancies drop by one
const enrollStudentInCourse = (courseID, studentID) => {
    const course = Courses.find(course => course.course_ID === courseID);
    const enrollment = { 'course_ID': courseID, 'student_ID': studentID };

    if (course && course.Vacancies > 0) {
        Enrollment.push(enrollment);
        course.Vacancies--;
        return true;  //if student can be enrolled
    } else {
        return false;  //if student cant be enrolled due to vacancy dropping below 0
    }
};

//to find all studenta studying under a certain course by name
const getStudentsEnrolledInCourseByName = (courseName) => {
    const course = Courses.find(course => course.course_name === courseName);
    
    if (!course) {
        return null; // if course is not found
    }

    const enrolledStudents = Enrollment
        .filter(enrollment => enrollment.course_ID === course.course_ID)
        .map(enrollment => getStudentById(enrollment.student_ID));

    return enrolledStudents;
};

module.exports = {
    viewSchool,
    getAllStudents,
    getAllCourses,
    getAllEnrollments,
    addStudent,
    removeStudent,
    editStudent,
    enrollStudentInCourse,
    viewStudentByName,
    getStudentsEnrolledInCourseByName
};

const schoolSystem = require('CheeKhiang_SchoolSystem.js');


// Add students
schoolSystem.addStudent({
    'student_name': 'Sarah Chan',
    'student_ID': '123456A',
    'home_location': '156 Cecil Street, Far Eastern Bank Building, , 09-01 69544'
});

schoolSystem.addStudent({
    'student_name': 'Dyan Lim',
    'student_ID': '234567B',
    'home_location': '221 Henderson Rd #07-12'
});

schoolSystem.addStudent({
    'student_name': 'Adrian Chiang',
    'student_ID': '345678C',
    'home_location': '435 Orchard Rd #19-03 Wisma Atria S()'
});

schoolSystem.addStudent({
    'student_name': 'Gwyneth Yee',
    'student_ID': '456789D',
    'home_location': '16 Mohamed Sultan Road #02-32'
});

console.log('All Students:', schoolSystem.getAllStudents());

// View student by name
const studentByName = schoolSystem.viewStudentByName('Nonexistent Student');
if (studentByName) {
    console.log('Student details by name:', studentByName);
} else {
    console.log('Student not found.');
}
// Remove a student
schoolSystem.removeStudent('456789D');

console.log('All Students after removing a student:', schoolSystem.getAllStudents());

// Edit a student
schoolSystem.editStudent('123456A', { 'home_location': '456 Updated Street' });

console.log('All Students after editing a student:', schoolSystem.getAllStudents());

// View school details
console.log('School details for NYP:', schoolSystem.viewSchool('NYP'));

// Enroll a student in a course
const enrollmentResult = schoolSystem.enrollStudentInCourse('2345987610P', '234567B');
console.log('Enrollment result:', enrollmentResult ? 'Successful' : 'Failed');

console.log('All Enrollments after enrolling a student:', schoolSystem.getAllEnrollments());
console.log('All Courses after enrolling a student:', schoolSystem.getAllCourses());

// Get students enrolled in a specific course by name
const studentsEnrolledInCourse = schoolSystem.getStudentsEnrolledInCourseByName('Cyber Security');
if (studentsEnrolledInCourse) {
    console.log('Students enrolled in course:', studentsEnrolledInCourse);
} else {
    // This block will execute if the course is not found
    console.log('Course not found.');
}


