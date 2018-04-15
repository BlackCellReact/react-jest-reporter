/**
 * Created by jlmconsulting on 4/15/18.
 */
const fs = require('fs');
const readPkg = require('read-pkg');
const async = require('async');
const {MongoClient} = require('mongodb');
const packagedData = readPkg.sync(process.cwd())
const config = packagedData.reactJsonReporter || {};

process.env.DATABASE_URL = process.env.DATABASE_URL || config.mongoURL || 'mongodb://localhost:27017'
process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'tilstore'
process.env.COLLECTION_NAME = process.env.COLLECTION_NAME || 'jesttests'

module.exports = (testResults) => {
    const testResultsString = JSON.stringify(testResults);
    const outputFile = config.outputFile || './test-results.json';
    const formatData = (results) => {
        let text = '';

        text += `Total test suites: ${  results.numTotalTestSuites  }\r\n`;
        text += `Passed test suites: ${  results.numPassedTestSuites  }\r\n`;
        text += `Failed test suites: ${  results.numFailedTestSuites  }\r\n\r\n`;

        text += `Total tests: ${  results.numTotalTests  }\r\n`;
        text += `Passed tests: ${  results.numPassedTests  }\r\n`;
        text += `Failed tests: ${  results.numFailedTests  }\r\n`;

        return text;
    }

    async.autoInject({
        connection: (callBack)=> {
            MongoClient.connect(process.env.DATABASE_URL, (err, db) => {
                callBack(err, db);
            });
        },
        db: (connection, callBack)=> {
            callBack(null, connection.db(process.env.DATABASE_NAME));
        },
        database: (db, callBack)=> {
            callBack(null, db.collection(process.env.COLLECTION_NAME));
        },
        testResults: (database, callBack)=> {
            fs.writeFile(outputFile, testResultsString, (err) => {
                let report = {
                    testing:formatData(JSON.parse(fs.readFileSync(outputFile, 'utf8'))),
                    data:JSON.parse(fs.readFileSync(outputFile, 'utf8'))
                }
                
                callBack(err, report)
            });
        },
        reporter: (testResults, callBack)=> {
            const _status = testResults.data.success? "Success" : "Failed";
            const _title =testResults.data.testResults[0].testResults[0].fullName || 'No title'
            const ObjectID = require('mongodb').ObjectID
                , assert = require('assert')
                , _ObjID = ObjectID().toString();
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
                "headline": _title,
                "reactapp": packagedData.name || "",
                "review": `<p>Tested @ ${new Date()}</p>`,
                "status": _status,
                "testing": `<pre>${JSON.stringify(testResults.testing)}</pre>`
            }
            callBack(null, item)
        },
        saveResults: (database, reporter, callBack)=> {
            database.insertOne(reporter), (err, result) => {
                assert.equal(null, err);
                console.log('Item inserted', result);
                callBack(err, 'Item inserted')
            };

        }
    }, (err, results)=> {
        if (err)
            console.log('Error', err)
        results.connection.close();
        // fs.unlink(outputFile, (err) => {
        //     if (err) throw err;
        //     console.log('path/file.txt was deleted');
        // });

    })
    return testResults
};