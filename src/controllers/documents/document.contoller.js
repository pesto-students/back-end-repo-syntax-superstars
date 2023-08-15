
const documents = require("./getDocuments");
const addDocument = require("./addDocument");
const editDocument = require("./editDocument");
const deleteDocument = require("./deleteDocument");

const { getDocuments, getDocumentsByWordCount} = documents;

module.exports = {
  getDocuments,
  getDocumentsByWordCount,
  addDocument,
  editDocument,
  deleteDocument
};