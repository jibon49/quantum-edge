const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@quantumedge.tyowage.mongodb.net/?retryWrites=true&w=majority&appName=quantumedge`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const db = client.db("quantumDb");
    const usersCollection = db.collection("users");
    const jobsCollection = db.collection("jobs");



    // jobs related
    app.get('/jobs', async (req, res) => {
      try {
        const jobs = await jobsCollection.find().toArray();
        res.status(200).json(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Failed to fetch jobs' });
      }
    });

    app.get("/api/jobs/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const jobs = await jobsCollection
          .find({ "creatorEmail": email })
          .sort({ _id: -1 })
          .toArray();
        res.json(jobs);
        console.log("Fetching jobs for user:", email);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Create a new job
    app.post("/api/jobs", async (req, res) => {
      try {
        const jobData = req.body;
        
        // Validate required fields
        if (!jobData.title || !jobData.description || !jobData.creatorEmail) {
          return res.status(400).json({ message: "Title, description, and creator email are required" });
        }

        // Create job object with proper structure
        const newJob = {
          ...jobData,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await jobsCollection.insertOne(newJob);
        const createdJob = await jobsCollection.findOne({ _id: result.insertedId });
        
        res.status(201).json(createdJob);
        console.log("Job created for user:", jobData.creatorEmail);
      } catch (err) {
        console.error("Error creating job:", err);
        res.status(500).json({ message: err.message });
      }
    });

    // Update a job
    app.put("/api/jobs/:id", async (req, res) => {
      try {
        const jobId = req.params.id;
        const updateData = req.body;

        if (!ObjectId.isValid(jobId)) {
          return res.status(400).json({ message: "Invalid job ID" });
        }

        // Add updated timestamp
        updateData.updatedAt = new Date();

        const result = await jobsCollection.updateOne(
          { _id: new ObjectId(jobId) },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Job not found" });
        }

        const updatedJob = await jobsCollection.findOne({ _id: new ObjectId(jobId) });
        res.json(updatedJob);
        console.log("Job updated:", jobId);
      } catch (err) {
        console.error("Error updating job:", err);
        res.status(500).json({ message: err.message });
      }
    });

    // Delete a job
    app.delete("/api/jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await jobsCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Job not found" });
        }
        res.json({ message: "Job deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
