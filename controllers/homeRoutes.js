const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('allposts', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        // {
        //   model: User,
        //   attributes: ['username'],
        // },
        // {
        //   model: Comment,
        //   attributes: ['body', 'date_created', 'blog_id', 'user_id'],
        //   include: [
        //     {
        //       model: User,
        //       attributes: ['username'],
        //     }
        //   ]
        // },
        User,
        {
          model: Comment,
          include: [{
                  model: User,
                  attributes: ['username'],
                }],
        },
      ],
    });

    const blogs = blogData.get({ plain: true });
    console.log('blogs1', blogs);
    res.render('singlepost', {
      ...blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
