
const documents = require("./getDocuments");
const addDocument = require("./addDocument");
const editDocument = require("./editDocument");
const deleteDocument = require("./deleteDocument");

const { getDocuments, getDocumentsByWordCount, getDocumentsById} = documents;

module.exports = {
  getDocuments,
  getDocumentsByWordCount,
  getDocumentsById,
  addDocument,
  editDocument,
  deleteDocument
};