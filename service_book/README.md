# express
 <p>npm install</p>
 <p>npm run start</p>
 <p>реализован rest-api</p>
 <p>Реализована возможность загружать/скачивать файл по id</p>
 <p>Логирование</p>

Запуск приложения с docker hub ( docker run -it --rm -e PORT=3000 -p 80:3000 kukhmirov/netology:v0.0.1 )

Задание 2.6. База данных и хранение данных

Вставка данных двух книг
db.books.insertMany(
 [
     {
         title: "Book 1",
         description: "Description 1",
         authors: "Author 1,
         // другие поля книги
     },
     {
         title: "Book 2",
         description: "Description 2",
         authors: "Author 2",
         // другие поля книги
     },
 ]
);

Поиск по title
db.books.find({ title: "Название_книги" });

редактирования полей: description и authors коллекции books по _id записи
db.books.updateOne(
    { _id: ObjectId("идентификатор_записи") },
    { $set: { description: "Новое описание", authors: "Новый автор" } }
);
