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

export const students = [
    { id: "1", name: "Ola Normann" },
    { id: "2", name: "Kari Normann" },
];

// - GET /api/students: Hent alle studenter
// - POST /api/students: Legg til en ny student
// - DELETE /api/students/:id: Fjern en student
// - PATCH /api/students/:id: Oppdatere navn på student


app.get("/api/students", (c) => {
    return c.json(students);
});


app.post("/api/students", async (c) => {
    const data = await c.req.json();
    const { name } = data;
    if (!isNameValid(name)) 
        return c.json({ success: false, error: "Invalid name" }, { status: 400 });


    students.push({ id: crypto.randomUUID(), name });
    return c.json(students, { status: 201 });
});


app.delete("/api/students/:id", (c) => {
    const id = c.req.param 
    
    const index = students.filter((student) => student.id === id);

    return c.json({ success: true });
});


app.patch("/api/students/:id", (c) => {
    const id = c.req.param;
    const student = c.body;

    

    return c.json(student);
});





export default app;