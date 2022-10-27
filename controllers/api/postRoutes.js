const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

//create new post
router.post('/', withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//edit post by id 
router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try {
      const updatedBlog = await Blog.update({
        name: req.body.name,
        description: req.body.description,
        // ...req.body
        //changed from id to blogs.id
      }, { where: { id: req.params.id }});
      res.status(200).json(updatedBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//delete post by id
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router