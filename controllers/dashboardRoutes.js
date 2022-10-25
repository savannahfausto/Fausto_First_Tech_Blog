const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//     try {
//       // Get all blogs and JOIN with user data
//       const blogData = await Blog.findAll({
//         where: {user_id: req.session.user_id},
//         include: [
//           {
//             model: User,
//             attributes: ['name'],
//           },
//         ],
//       });
  
//       // Serialize data so the template can read it
//       const blog = blogData.map((blog) => blog.get({ plain: true }));
  
//       // Pass serialized data and session flag into template
//       res.render('dashboard', { 
//         blogs: blog, 
//         logged_in: req.session.logged_in 
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

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
          ], }],
      });
      // console.log('userData', userData);
      const user = userData.get({ plain: true });
      console.log('user', user)
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
  
      res.render('editpost', {
        layout: 'dashboard',
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router