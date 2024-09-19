import Grid from "./Components/Grid";

type Student = { 
  id: string,
  name: string };

const demoStudents: Student[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
  { id: "4", name: "Alfie" },
];

function App() {
  return (
    <main>
      <Grid students={demoStudents}/>
    </main>
  );
}

export default App;