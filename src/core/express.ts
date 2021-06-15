import bodyParser from 'body-parser';
import express, {Express} from 'express';

import cors from 'cors';

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PATCH, DELETE, PUT',
  allowedHeaders: 'Content-Type, Authorization',
};


const customizationExpress=(app: Express)=>{
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(require('morgan')('dev'));


  app.use(cors({
    origin: '*',
    methods: 'GET, POST, PATCH, DELETE, PUT',
    allowedHeaders: 'Content-Type, Authorization',

  }));

};

export default customizationExpress;
