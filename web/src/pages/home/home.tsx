import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { useQuery } from "../../hooks/api-call";
import { api } from "../../api";
import Spinner from "../../components/spinner/spinner";
import { GenerateType } from "../../types";
import FlashcardsGrid from "./components/grid/flashcards-grid";
import GenerateForm from "./components/form/generate-form";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [type, setType] = useState<GenerateType>("courseInfo");
  const [notes, setNotes] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [courseInfo, setCourseInfo] = useState({
    university: "",
    department: "",
    courseNumber: "",
    courseName: "",
  });
  const flashcards = useQuery({
    initialData: { flashcards: [], type: null },
    query: async () =>
      (await api.generateFlashcards({ type, notes, syllabus, courseInfo }))
        .data,
    callOnMount: false,
  });
  const cards = flashcards.data.flashcards;

  function handleBack() {
    flashcards.setData({ flashcards: [], type: null });
  }

  useEffect(() => {
    if (flashcards.error?.code === 401) {
      navigate("/product");
    }
  }, [flashcards.error?.code]);

  if (cards.length > 0) {
    return <FlashcardsGrid resp={flashcards.data} onBack={handleBack} />;
  }

  if (flashcards.loading) {
    return (
      <main className={styles["loading-main"]}>
        <div className={styles["loading-container"]}>
          <p className={styles["loading-header"]}>Generating Cards...</p>
          <p className={styles["loading-description"]}>
            This may take up to a minute depending on the size of information
            uploaded
          </p>
          <Spinner size={24} />
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles["text-container"]}>
        <p className={styles["section-header"]}>Generate Flashcards</p>
        <p className={styles.description}>
          Enter some information about your course to generate flashcards
        </p>
      </section>
      <section className={styles.form}>
        <div className={styles["type-select"]}>
          <label htmlFor="type-select">Generate Prompt</label>
          <select
            id="type-select"
            onChange={(e) =>
              setType(e.target.value as "notes" | "syllabus" | "courseInfo")
            }
          >
            <option value="courseInfo">Course Info</option>
            <option value="notes">Notes</option>
            <option value="syllabus">Syllabus</option>
          </select>
        </div>
        <div className={styles["input-container"]}>
          <GenerateForm
            type={type}
            notes={notes}
            syllabus={syllabus}
            courseInfo={courseInfo}
            setNotes={setNotes}
            setSyllabus={setSyllabus}
            setCourseInfo={setCourseInfo}
          />
        </div>
        <button
          onClick={flashcards.fetchData}
          disabled={flashcards.loading}
          className={styles["generate-btn"]}
        >
          Generate
        </button>
      </section>
    </main>
  );
}
