import express, { Request, Response } from "express";
import cors from "cors";
import { courses, students } from "./database";
import { COURSE_STACK, TCourse, TStudent } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// pegar todos os cursos:

app.get("/coursers", (req: Request, res: Response) => {
  res.status(200).send(courses);
});

// pegar um curso:
app.get("/coursers/search", (req: Request, res: Response) => {
  const q = req.query.q as string;

  const search = courses.filter((course) =>
    course.name.toLowerCase().includes(q.toLowerCase())
  );

  if (search.length) {
    res.status(200).send(search);
  } else {
    res.status(400).send("Curso não encontrado");
  }
});

//criar um curso

app.post("/coursers", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const lessons = req.body.lessons as number;
  const stack = req.body.stack as COURSE_STACK;

  const couser: TCourse = {
    id,
    name,
    lessons,
    stack,
  };

  courses.push(couser);

  if (
    id !== "string" ||
    typeof name !== "string" ||
    typeof lessons !== "number" ||
    !stack
  ) {
    res.status(400).send("Error: Não foi possivel realizar cadastro");
  } else {
    res.status(201).send("Cadastro realizado com sucesso");
  }
});

//pesquisar todos os estudantes

app.get("/student", (req: Request, res: Response) => {
  res.status(200).send(students);
});

//pesquisar um aluno especifico

app.get("/student/search", (req: Request, res: Response) => {
  const q = req.query.q as string;

  const searchStudent = students.find((student) =>
    student.name.toLowerCase().includes(q.toLowerCase())
  );

  if (searchStudent) {
    res.status(200).send(students);
  } else {
    res.status(400).send("não foi possível encontrar esse estudante");
  }
});

app.post("/student", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const age = req.body.age as number;

  if (
    typeof id !== "string" ||
    typeof name !== "string" ||
    typeof age !== "number"
  ) {
    res.status(400).send("não foi possivel cadastrar o estudante");
  } else {
    const studentExist = students.find(
      (student) => student.name === name || student.id === id
    );

    if (studentExist) {
      res.status(400).send("Usuário já cadastrado...");
    } else {
      const student: TStudent = {
        id,
        name,
        age,
      };
      students.push(student);
      res.status(200).send("estudante cadastrado com sucesso");
    }
  }
});
