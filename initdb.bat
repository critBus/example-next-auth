@echo off
:: Set PostgreSQL bin directory and database credentials
set PGPATH="C:\Program Files\PostgreSQL\15\bin"
set PGUSER=postgres
set PGPASSWORD=postgres
set PGDATABASE=prueba_auth

:: Drop the database if it exists
echo Dropping database %PGDATABASE% if it exists...
%PGPATH%\dropdb -U %PGUSER% --if-exists %PGDATABASE%

:: Create the database
echo Creating database %PGDATABASE%...
%PGPATH%\createdb -U %PGUSER% %PGDATABASE%

echo Database reset completed successfully!
:: npx prisma migrate dev&&npx prisma db seed&&pnpm generate:locations&&pnpm run dev
npx prisma migrate dev&&pnpm run dev
