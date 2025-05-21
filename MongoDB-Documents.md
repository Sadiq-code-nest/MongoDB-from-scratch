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

4. **CRUD - Create Document**
database is collection of Documents

Field name regulations collected from MongoDB official website:

The field name _id is reserved
Field names cannot contain the null character.
insert documents command

db.collectionName.instertOne({})
db.collectionName.instertMany([{},{}])
db.collectionName.instert([{},{}])

**5. CRUD - Read Document**
Read / Find data

read data syntax: db.collectionName.find(query, projection)
read data in an easy way syntax: db.collectionName.find().pretty()
read a specific data syntax: db.collectionName.find({field: fieldValue})
example1: db.products.find(ObjectId("633d183e09743587af26fb07"))
example2: db.users.find({name: "anisul islam"}) remember value is case sentitive
limit data syntax: db.collectionName.find({field: fieldValue}).limit(NumberOfRows)
example: db.users.find({age: 31}).limit(2)
sorting: 1 for ascending, -1 for descending
example: db.products.find().sort({price: -1})
less than and greater than
example : db.myCollection.find({field1: {$gt:25}})
projection
example : db.students.find({name: "x"}, {name:0}) get every field without name
example : db.students.find({name: "x"}, {name:1}) get only field
example : db.students.find({name: "x"}, {_id:0, name:1}) get only field even without mongodb _id
**6. CRUD - Update Document**
Update Data -> $set operator helps to set update value to a field

update data syntax: db.collectionName.update(selection_item, update_data)
update data syntax: db.collectionName.updateOne(selection_item, update_data)
update data syntax: db.collectionName.updateMany(selection_item, update_data)
find one and update data syntax: db.collectionName.findOneAndUpdate(selection_item, update_data)
example: db.products.update({id:"1"},{$set:{price:32}})
**7. CRUD - Delete Document**
Delete data

delete data syntax: `db.collectionName.deleteOne(selection)
example: db.users.deleteOne({name:"anisul islam"})
delete data syntax: `db.collectionName.deleteOne()
delete many data syntax: `db.collectionName.deleteMany({selected_item})
delete many data syntax: `db.collectionName.deleteMany({})

