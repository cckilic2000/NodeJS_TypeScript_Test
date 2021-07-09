port 3000'e ayarlı
npm run start:dev

1 database table, 3 columns
1. column: name (type: text)
2. column: email (type: text)
3. column: id (type: serial)

table adı: test_db
database adı: postgres
kullanıcı adı: postgres
şifre: Cihan2000

src/pre-start/env/development.env dosyasına POSTGRES_URL yazılmalı.
uygulamada bulunan POSTGRES_URL = postgres://postgres:Cihan2000@localhost:5432/postgres