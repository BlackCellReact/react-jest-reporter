/**
 * Created by jlmconsulting on 4/15/18.
 */
const ReactJsonReporter = require('..');
const {MongoClient} = require('mongodb');
const testResults = null;
process.env.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017'
process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'tilstore'
let connection;
let db;

beforeAll(async() => {
    connection = await MongoClient.connect(process.env.DATABASE_URL);
    db = await connection.db(process.env.DATABASE_NAME);
});

afterAll(async() => {
    await connection.close();
    await db.close();
});
it('should aggregate docs from collection', async() => {
    const database = db.collection("jesttests");
    const ObjectID = require('mongodb').ObjectID
        , assert = require('assert')
        , pjson = require('../package.json');

    const reporter = (Notes, Str) => {
        const _ObjID = ObjectID().toString();
        const _status = "Success" || "Failed";
        const valid = ObjectID.isValid(_ObjID);

        let item = {
            "_id": ObjectID(_ObjID),
            "updatedBy": null,
            "updatedAt": new Date(),
            "createdBy": null,
            "createdAt": new Date(),
            "slug": "Jest" + +new Date(),
            "title": "Jest" + +new Date(),
            "components": [],
            "basePage": [],
            "__v": 1,
            "description": `<p>Tested @ ${new Date()}</p>`,
            "headline": Notes || "",
            "reactapp": pjson.name || "",
            "review": `<p>Tested @ ${new Date()}</p>`,
            "status": _status,
            "testing": `<pre>${JSON.stringify(Str)}</pre>`
        }
        if (valid)
            return item
        else
            throw error(ObjectID)
    }


    // const checkTest = it('checkTest', async() => {
    //     expect(reporter._options).toBe(Options)
    // })

    // console.log(ReactJsonReporter(testResults))

    await  database.insertOne(reporter('first test', ReactJsonReporter(testResults)), function (err, result) {
        assert.equal(null, err);
        console.log('Item inserted');


    });

})
it('should aggregate docs from collection', async() => {
    const database = db.collection("jesttests");
    const ObjectID = require('mongodb').ObjectID
        , assert = require('assert')
        , pjson = require('../package.json');

    const reporter = (Notes, Str) => {
        const _ObjID = ObjectID().toString();
        const _status = "Success" || "Failed";
        const valid = ObjectID.isValid(_ObjID);

        let item = {
            "_id": ObjectID(_ObjID),
            "updatedBy": null,
            "updatedAt": new Date(),
            "createdBy": null,
            "createdAt": new Date(),
            "slug": "Jest" + +new Date(),
            "title": "Jest" + +new Date(),
            "components": [],
            "basePage": [],
            "__v": 1,
            "description": `<p>Tested @ ${new Date()}</p>`,
            "headline": Notes || "",
            "reactapp": pjson.name || "",
            "review": `<p>Tested @ ${new Date()}</p>`,
            "status": _status,
            "testing": `<pre>${JSON.stringify(Str)}</pre>`
        }
        if (valid)
            return item
        else
            throw error(ObjectID)
    }


    // const checkTest = it('checkTest', async() => {
    //     expect(reporter._options).toBe(Options)
    // })

    // console.log(ReactJsonReporter(testResults))

    await  database.insertOne(reporter('first test', ReactJsonReporter(testResults)), function (err, result) {
        assert.equal(null, err);
        console.log('Item inserted');


    });

})
it('should aggregate docs from collectioncollectioncollectioncollectioncollection', async() => {
    const database = db.collection("jesttests");
    const ObjectID = require('mongodb').ObjectID
        , assert = require('assert')
        , pjson = require('../package.json');

    const reporter = (Notes, Str) => {
        const _ObjID = ObjectID().toString();
        const _status = "Success" || "Failed";
        const valid = ObjectID.isValid(_ObjID);

        let item = {
            "_id": ObjectID(_ObjID),
            "updatedBy": null,
            "updatedAt": new Date(),
            "createdBy": null,
            "createdAt": new Date(),
            "slug": "Jest" + +new Date(),
            "title": "Jest" + +new Date(),
            "components": [],
            "basePage": [],
            "__v": 1,
            "description": `<p>Tested @ ${new Date()}</p>`,
            "headline": Notes || "",
            "reactapp": pjson.name || "",
            "review": `<p>Tested @ ${new Date()}</p>`,
            "status": _status,
            "testing": `<pre>${JSON.stringify(Str)}</pre>`
        }
        if (valid)
            return item
        else
            throw error(ObjectID)
    }


    // const checkTest = it('checkTest', async() => {
    //     expect(reporter._options).toBe(Options)
    // })

    // console.log(ReactJsonReporter(testResults))

    await  database.insertOne(reporter('first test', ReactJsonReporter(testResults)), function (err, result) {
        assert.equal(null, err);
        console.log('Item inserted');


    });

})
