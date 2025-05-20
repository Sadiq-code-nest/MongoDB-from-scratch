1. **RDBMS VS MongoDB terms**
Database → database
Tables → collections
Rows →  documents
Columns  → fields

2. **Environment setup**
mongod --version (mongodb server version)
mongosh  (mongodb shell version)

3. **Basic command**
show databases: show dbs
create / switch to a Database: use databaseName example: use productsDB
check the Database you are in : db 
drop database : db.dropDatabase()
collections-
show collections: show collections
create collection : db.createCollection(name, option)  -> example : db.createCollection("products")
drop collection : db.collectionName.drop()


