const express = require('express')
const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')

// init app & middleware
const app = express()
app.use(express.json())

// db connection
let db

connectToDb((err) => {
  if(!err){
    app.listen('3000', () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})

// routes
//get all products
app.get('/products', (req, res) => {
  // current page
  const page = req.query.p || 0
  const productsPerPage = 8
  
  let products = []

  db.collection('products')
    .find()
    .sort({subcategory: 1})
    .skip(page * productsPerPage)
    .limit(productsPerPage)
    .forEach(product => products.push(product))
    .then(() => {
      res.status(200).json(products)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})

//get specific subcategory
app.get('/products/subcategory/:subcategory', (req, res) => {
    // current page
    const page = req.query.p || 0
    const subcategoriesPerPage = 8
    
    let products = []
  
    db.collection('products')
      .find({subcategory : req.params.subcategory})
      .sort({subcategory: 1})
      .skip(page * subcategoriesPerPage)
      .limit(subcategoriesPerPage)
      .forEach(product => products.push(product))
      .then(() => {
        res.status(200).json(products)
      })
      .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
      })
  })

//get specific product 
app.get('/products/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    db.collection('products')
      .findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not fetch the document'})
      })
      
  } else {
    res.status(500).json({error: 'Could not fetch the document'})
  }

})




/*
//get likes
app.get('/products/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
  
      db.collection('products')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
          res.status(200).json(doc)
        })
        .catch(err => {
          res.status(500).json({error: 'Could not fetch the document'})
        })
        
    } else {
      res.status(500).json({error: 'Could not fetch the document'})
    }
  
  })*/


app.post('/likes/add', (req, res) => {
  const like = req.body

  db.collection('likes')
    .insertOne(like)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({err: 'Could not create new document'})
    })
})

app.delete('/likes/:id', (req, res) => {
  console.log(req.params.id)
  if (ObjectId.isValid(req.params.id)) {

  db.collection('likes')
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({error: 'Could not delete document'})
    })

  } else {
    res.status(500).json({error: 'Could not delete document'})
  }
})

/*app.patch('/books/:id', (req, res) => {
  const updates = req.body

  if (ObjectId.isValid(req.params.id)) {

    db.collection('books')
      .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not update document'})
      })

  } else {
    res.status(500).json({error: 'Could not update document'})
  }
})*/