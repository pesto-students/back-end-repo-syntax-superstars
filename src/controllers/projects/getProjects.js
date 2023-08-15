const Project = require("../../models/Project");
const mongoose = require('mongoose');

const getProjects = async(req, res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

    // const sort = {
    //   name: !req.query.name,
    //   createdAt: !req.query.date_created,
    //   modifiedAt: !req.query.date_modified,
    // }

    let filter = {user: new mongoose.Types.ObjectId(req.user.userId)};

    let sortBy = {
      createdAt: -1
    };

    if (req.query.name) {
      const regex = new RegExp(req.query.name, 'g');
      filter = {
        name: { $regex: regex }
      }
    };

    if (req.query.sort) {
      if(sort === title) {
        sort = {
          name: 1,
        }
      } else if (sort === created) {
        sort = {
          createdAt: -1
        }
      } else if (sort === modified) {
        sort = {
          modifiedAt: -1
        }
      }
    };
  
    const projects = await Project.aggregate([{
      $lookup: {
        from: "documents",
        localField: "_id",
        foreignField: "project",
        as: 'documentCount'
      }
    },
    {
      $addFields: {totalDocuments: { $size: "$documentCount"}}
    },
    {
      $match: filter
    },
    {
      $sort: sortBy
    }
    ]);

    if (projects.length === 0) 
      res.status(200).send(projects);

    res.status(200).send(projects);
  } catch(err) {
    console.log(err);
  }
};

const getLatestProjects = async(req, res) => {
  try {

    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

      const projects = await Project.aggregate([{
        $lookup: {
          from: "documents",
          localField: "_id",
          foreignField: "project",
          as: 'documentCount'
        }
      },
      {
        $addFields: {totalDocuments: { $size: "$documentCount"}}
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $limit: 5
      },
      {
        $match: { user: new mongoose.Types.ObjectId(req?.user?.userId) }
      }
      ]);
    if (projects.length === 0) 
      res.status(200).send(projects);

    res.status(200).send(projects);
  } catch(err) {
    console.log(err);
  }
};

module.exports = {getProjects, getLatestProjects};