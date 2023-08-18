const Document = require("../../models/Document");
const mongoose = require('mongoose');

const getDocuments = async(req, res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

    let filter = {user: new mongoose.Types.ObjectId(req.user.userId)};

    let sort = {
      createdAt: -1
    };

    if (req.query.id) {
      const { id, is_file } = req.query;
      filter = {
          project: new mongoose.Types.ObjectId(id),
          is_file: is_file === 'true',
      }
    };

    if (req.query.name) {
      const regex = new RegExp(req.query.name, 'g');
      filter = {
        name: { $regex: regex }
      }
    };

    if (req.query.sort) {
      if(req.query.sort === 'title') {
        sort = {
          name: 1,
        }
      } else if (req.query.sort === 'created') {
        sort = {
          createdAt: -1
        }
      } else if (req.query.sort === 'modified') {
        sort = {
          modifiedAt: -1
        }
      }
    };

    const documents = await Document.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: 'projectData'
        }
      },
      {
        $lookup: {
          from: "reports",
          localField: "_id",
          foreignField: "document",
          as: 'reportData'
        }
      },
      {
        $unwind: '$projectData',
      },
      {
        $match: filter
      },
      {
        $sort: sort
      }
    ]);

    if (documents.length === 0){
      return res.status(200).send({message: "No documents found."});
    } 

    return res.status(200).send(documents);
  } catch(err) {
    console.log(err);
  }
};

const getDocumentsByWordCount = async(req, res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

      const {date} = req.params;
      let dateArr = [];

      if(date) {
        dateArr = date.split("-");
      }
      const startDate = new Date(dateArr[0], dateArr[1] - 1, 1);
      const endDate = new Date(dateArr[0], dateArr[1], 1);

      const documents = await Document.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(req.user.userId),
            updatedAt: {
              $gte: startDate,
              $lt: endDate // First day of the next month
            }
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
            count: {$sum: "$words_count"}
          }
        },
      ]);

    if (documents.length === 0) 
      return res.status(200).send({message: "No documents found."});

    res.status(200).send(documents);
  } catch(err) {
    console.log(err);
  }
};

const getDocumentsById = async(req,res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

    const document = await Document.findOne({_id: req.params.id});

    if (document.length === 0) 
      res.status(200).send({message: "No documents found."});

    res.status(200).send(document);
  } catch(err) {
    console.log(err);
  }
}

module.exports = { getDocuments, getDocumentsByWordCount, getDocumentsById };