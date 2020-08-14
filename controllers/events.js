//events.js

module.exports = function (app, models) {

    // INDEX
    app.get('/events-all', (req, res) => {
        models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
            res.render('events-index', { events: events });
        })
    })

    app.get('/events/new', (req, res) => {
        res.render('events-new', {});
      })

    // SHOW
    app.get('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
            res.render('events-show', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    });

    app.get('/events', (req, res) => {
        res.render('events-index', { events: events });
    })

      // CREATE
    app.post('/events', (req, res) => {
        models.Event.create(req.body).then(event => {
            // Redirect to events/:id
        res.redirect(`/events/${event.id}`)
        
        }).catch((err) => {
        console.log(err)
        });
    })

    // EDIT
    app.get('/events/:id/edit', (req, res) => {
        models.Event.findByPk(req.params.id).then((event) => {
        res.render('events-edit', { event: event });
        }).catch((err) => {
        console.log(err.message);
        })
    });

    //UPDATE
    app.put('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
        event.update(req.body).then(event => {
            res.redirect(`/events/${req.params.id}`);
        }).catch((err) => {
            console.log(err);
        });
        }).catch((err) => {
        console.log(err);
        });
    });

    app.delete('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
          event.destroy();
          res.redirect(`/`);
        }).catch((err) => {
          console.log(err);
        });
    })


}