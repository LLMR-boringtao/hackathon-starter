import AdminJS from 'adminjs';
import mongoose from 'mongoose';
import * as AdminJSMongoose from '@adminjs/mongoose';
import express from 'express';
import { buildRouter } from '@adminjs/express';

// Define the User Mongoose model
const userSchema = new mongoose.Schema({
    profile: {
        name: String,
        picture: String,
        location: String,
        website: String,
        gender: String,
    },
    tokens: [{
        kind: String,
        accessToken: String,
    }],
    email: String,
    github: String,
    createdAt: Date,
    updatedAt: Date,
    password: String,
});

const User = mongoose.model('User', userSchema);

AdminJS.registerAdapter({
   Resource: AdminJSMongoose.Resource,
   Database: AdminJSMongoose.Database,
});

const start = async () => {
   await mongoose.connect('mongodb://localhost:27017/test');
   
   const adminOptions = {
       resources: [User],
   };
   
   const admin = new AdminJS(adminOptions);

   const app = express();
   const router = buildRouter(admin);
   app.use(admin.options.rootPath, router);

   const PORT = 3030;
   app.listen(PORT, () => {
       console.log(`AdminJS is available under http://localhost:${PORT}${admin.options.rootPath}`);
   });
}

start();