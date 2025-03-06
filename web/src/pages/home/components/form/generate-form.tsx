type GenerateFormProps = {
  type: "notes" | "syllabus" | "courseInfo";
  notes: string;
  syllabus: string;
  courseInfo: {
    university: string;
    department: string;
    courseNumber: string;
    courseName: string;
  };
  setNotes: (notes: string) => void;
  setSyllabus: (syllabus: string) => void;
  setCourseInfo: (courseInfo: {
    university: string;
    department: string;
    courseNumber: string;
    courseName: string;
  }) => void;
};

export default function GenerateForm({
  type,
  notes,
  syllabus,
  courseInfo,
  setNotes,
  setSyllabus,
  setCourseInfo,
}: GenerateFormProps) {
  switch (type) {
    case "notes":
      return (
        <textarea
          placeholder="Notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      );
    case "syllabus":
      return (
        <textarea
          placeholder="Syllabus..."
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
        />
      );
    case "courseInfo":
      return (
        <>
          <div>
            <label htmlFor="university">University</label>
            <input
              id="university"
              placeholder="University of South Carolina"
              type="text"
              value={courseInfo.university}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, university: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <input
              id="department"
              placeholder="Computer Science"
              type="text"
              value={courseInfo.department}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, department: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="course-number">Course Number</label>
            <input
              id="course-number"
              placeholder="CSCE 311"
              type="text"
              value={courseInfo.courseNumber}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, courseNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="course-name">Course Name</label>
            <input
              id="course-name"
              placeholder="Operating Systems"
              type="text"
              value={courseInfo.courseName}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, courseName: e.target.value })
              }
            />
          </div>
        </>
      );
  }
}
