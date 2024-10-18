import { Hono } from "hono";
import { cors } from "hono/cors";
import { isNameValid } from "./lib/validators";

const app = new Hono();

app.use("/*", cors());

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

let students = [
    { id: "1", name: "Ola Normann" },
    { id: "2", name: "Kari Normann" },
    { id: "3", name: "Per Normann" },
    { id: "4", name: "Pål Normann" },
    { id: "5", name: "Nils Normann" },
    { id: "6", name: "Knut Normann" },
    { id: "7", name: "Kjell Normann" }
];

// - GET /api/students: Hent alle studenter
// - POST /api/students: Legg til en ny student
// - DELETE /api/students/:id: Fjern en student
// - PATCH /api/students/:id: Oppdatere navn på student


app.get("/api/students", (c) => {
    return c.json(students);
});


app.get("/api/students/:id", (c) => {
  const id = c.req.param("id");
  const student = students.filter((student) => student.id === id);
  return c.json(student);
}); 


app.post("/api/students", async (c) => {
  const data = await c.req.json();
  const { name } = data;
  if (!isNameValid(name))
    return c.json({ success: false, error: "Invalid name" }, { status: 400 });
	
	const student = { id: crypto.randomUUID(), name }
  students.push({ id: crypto.randomUUID(), name });
  return c.json({ success: true, data: student }, { status: 201 });
});


app.delete("/api/students/:id", (c) => {
  const id = c.req.param("id");
  students = students.filter((student) => student.id !== id);
  return c.json({ data: students });
});


app.patch("/api/students/:id", async (c) => {
  const id = c.req.param("id");
  const { name } = await c.req.json();
  students = students.map((student) =>
    student.id === id ? { ...student, name } : student
  );
  return c.json(students);
});

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

export default app;