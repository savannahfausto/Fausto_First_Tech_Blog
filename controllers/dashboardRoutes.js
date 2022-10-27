const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ 
          model: Blog,
          attributes: [
            'id',
            'name', 
            'date_created'
          ], 
        }],
      });
      // console.log('userData', userData);
      const user = userData.get({ plain: true });
      //console.log('blogs', user)
      res.render('all-posts-admin', {
        layout: 'dashboard',
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Use withAuth middleware to prevent access to route
router.get('/new', withAuth, async (req, res) => {
    try {
      res.render('newpost', {
        layout: 'dashboard',
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    console.log('req.params.id', req.params.id);
    const blogData = await Blog.findByPk(req.params.id)
    const blog = blogData.get({ plain: true });
    //console.log('blog1', blog);
    
    res.render('editpost', {
      layout: 'dashboard',
      // blogPost,
      ...blog,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router