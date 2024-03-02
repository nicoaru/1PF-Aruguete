import { Curso } from "src/app/core/models/curso.model";

export const mockCourses: Curso[] = [
    {
        id: 1,
        nombre: "React Js",
        descripcion: "Descubre el fascinante mundo de ReactJS, la biblioteca de JavaScript que ha revolucionado el desarrollo de interfaces de usuario en la web. Este curso te sumergirá en los fundamentos y las mejores prácticas de React, proporcionándote las habilidades necesarias para crear aplicaciones web interactivas y eficientes.",
        fechaInicio: new Date("2024-03-21T00:00:00.000Z"),
        fechaFin: new Date("2024-05-21T00:00:00.000Z")
    },
    {
        id: 2,
        nombre: "Angular",
        descripcion: "¡Sumérgete en el emocionante mundo de Angular y domina una de las plataformas de desarrollo web más poderosas y populares disponibles en la actualidad! Este curso te llevará desde los conceptos básicos hasta las técnicas avanzadas de Angular, permitiéndote construir aplicaciones web modernas, robustas y escalables.",
        fechaInicio: new Date("2024-03-08T00:00:00.000Z"),
        fechaFin: new Date("2024-05-08T00:00:00.000Z")
    },
    {
        id: 3,
        nombre: "NestJs",
        descripcion: "¡Explora la elegancia de NestJS, un framework de desarrollo en Node.js que combina lo mejor de Angular con las capacidades de Node para crear aplicaciones backend robustas y escalables! Este curso te sumergirá en el mundo de NestJS, desde los conceptos fundamentales hasta las técnicas avanzadas, permitiéndote construir servidores eficientes y modularizados.",
        fechaInicio: new Date("2024-04-15T00:00:00.000Z"),
        fechaFin: new Date("2024-06-21T00:00:00.000Z")
    },
    {
        id: 4,
        nombre: "SQL",
        descripcion: "Adéntrate en el mundo de las bases de datos relacionales con nuestro curso de SQL, diseñado para proporcionarte los conocimientos esenciales y las habilidades prácticas necesarias para gestionar eficientemente datos en sistemas de gestión de bases de datos (DBMS). Desde la creación de tablas hasta consultas avanzadas, este curso te equipará con las herramientas necesarias para trabajar con datos de manera efectiva.",
        fechaInicio: new Date("2024-05-21T00:00:00.000Z"),
        fechaFin: new Date("2024-07-12T00:00:00.000Z")
    },
    {
        id: 5,
        nombre: "Python",
        descripcion: "Curso de Python",
        fechaInicio: new Date("2024-02-15T03:00:00.000Z"),
        fechaFin: new Date("2024-05-16T03:00:00.000Z")
    }
];