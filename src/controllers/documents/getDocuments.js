const Document = require("../../models/Document");
const mongoose = require('mongoose');

const getDocuments = async(req, res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

    let filter = {user: new mongoose.Types.ObjectId(req.user.userId)};

    let sortBy = {
      createdAt: -1
    };

    if (req.query.id) {
      const { id, is_file } = req.query;
      filter = {
        $and: [
          { project: new mongoose.Types.ObjectId(id) },
          { is_file: Boolean(is_file) }
        ]
        
      }
    };

    if (req.query.name) {
      const regex = new RegExp(req.query.name, 'g');
      filter = {
        name: { $regex: regex }
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
        $unwind: '$projectData',
      },
      {
        $match: filter
      },
      {
        $sort: sortBy
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

  //   const documents = await Document.find().populate({
  //     path: "project", select: "name",
  // });

    const {date} = req.params;
    let dateArr = [];
    console.log(req.params);
    if(date) {
      dateArr = date.split("-");
    }
    console.log(dateArr);
    const startDate = new Date(dateArr[0], dateArr[1] - 1, 1);
    const endDate = new Date(dateArr[0], dateArr[1], 1);

    const documents = await Document.aggregate([
    {
      $match: {
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
      res.status(200).send({message: "No documents found."});

    res.status(200).send(documents);
  } catch(err) {
    console.log(err);
  }
};

module.exports = { getDocuments, getDocumentsByWordCount };