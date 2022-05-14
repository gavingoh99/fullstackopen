describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3000/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.contains('blogs');
    cy.contains('login').click();
  });
  it('user can login', function () {
    cy.contains('login').click();
    cy.get('#username').type('hellas');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('hellas logged in');
  });
  it('invalid user cannot login', function () {
    cy.contains('login').click();
    cy.get('#username').type('wrongUsername');
    cy.get('#password').type('wrongPassword');
    cy.get('#login-button').click();

    cy.get('.notification')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'hellas logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'hellas', password: 'password' });
    });
    it('new blog can be added', function () {
      cy.contains('create blog').click();
      const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl',
        likes: 5,
      };
      cy.get('#title').type(blog.title);
      cy.get('#author').type(blog.author);
      cy.get('#url').type(blog.url);
      cy.get('#likes').clear().type(blog.likes.toString());
      cy.get('#create-blog').click();

      cy.get('.notification')
        .should('contain', `a new blog ${blog.title} by ${blog.author} added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.contains('testTitle testAuthor');
    });
    describe('when three blogs exist in the db', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testTitle',
          author: 'testAuthor',
          url: 'testUrl',
          likes: 5,
        });
        cy.createBlog({
          title: 'anotherTitle',
          author: 'anotherAuthor',
          url: 'anotherUrl',
          likes: 3,
        });
        cy.createBlog({
          title: 'lastTitle',
          author: 'lastAuthor',
          url: 'lastUrl',
          likes: 1,
        });
      });

      it('likes can be increased with the like button', function () {
        cy.contains('anotherTitle').contains('view').click();
        cy.get('#like-button').click();
        cy.get('#blog-likes').should('contain', '4');
      });

      it('a blog can be deleted by the user who created it', function () {
        cy.contains('anotherTitle').contains('view').click();
        cy.contains('remove').click();
        cy.get('html').should('not.contain', 'anotherTitle anotherAuthor');
      });

      it('a blog cannot be deleted by a user who did not create it', function () {
        cy.request('POST', 'http://localhost:3000/api/users', {
          username: 'otherUser',
          password: 'otherPassword',
          name: 'other',
        });
        cy.login({ username: 'otherUser', password: 'otherPassword' });
        cy.contains('anotherTitle').contains('view').click();
        cy.contains('remove').click();
        cy.get('.notification')
          .should(
            'contain',
            'Only the user who added the blog post can delete it'
          )
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid');
      });

      it('blogs are arranged in ascending order of likes', function () {
        cy.get('[data-index=\'0\']').should('contain', 'lastTitle lastAuthor');
        cy.get('[data-index=\'2\']').should('contain', 'testTitle testAuthor');
      });
    });
  });
});
