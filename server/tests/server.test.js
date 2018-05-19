const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');

const {app}=require('./../server');
const {Todo}=require('./../models/todo');
const {User}=require('./../models/user');
const {todos,deleteTodos,users,populateUsers}=require('./seed/seed');

beforeEach(populateUsers);
beforeEach(deleteTodos);

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text="Test todo";

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        return done(err);//stops the function
      }
      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>done(e));
    });
  });

it('should not create new todo with invalid text',(done)=>{

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }
    });

    Todo.find().then((todos)=>{
      expect(todos.length).toBe(2);
      done();
    }).catch((e)=>done(e));
  });


});

describe('GET /todos',()=>{
  it("should get all todos",(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe("GET /todos/:id",()=>{
  it("Should return todo doc",(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });
  it("should return 404 when todo is not found",(done)=>{
    var id =new ObjectID();
    request(app)
    .get(`/todos/${id.toHexString()}`)
    .expect(404)
    .end(done);
  });
  it("should return 404 when non-objects ids",(done)=>{
      var id="112123";
      request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});


describe('DELETE /todos/:id',()=>{
  it('should delete a todo',(done)=>{
  var hexId=todos[1]._id.toHexString();
  request(app)
  .delete(`/todos/${hexId}`)
  .expect(200)
  .expect((res)=>{
    expect(res.body.todo._id).toBe(hexId);
  })
  .end((err,res)=>{
    if(err){
    return done(err);
    }

    Todo.findById(hexId).then((todo)=>{
      expect(todo).toNotExist();
      done();
    }).catch((e)=>done(e));
  });
});

it('should return 404 when todo not found',(done)=>{
  var id =new ObjectID();
  request(app)
  .delete(`/todos/${id.toHexString()}`)
  .expect(404)
  .end(done);
});
it('should return 404 if object id is invalid',(done)=>{
  var id="112123";
  request(app)
  .delete(`/todos/${id}`)
  .expect(404)
  .end(done);
})
});



describe("PATCH /todos/:id",()=>{
it("should update the todo",(done)=>{
  var id =todos[0]._id.toHexString();
  var text ="This is the updated one";
  request(app)
  .patch(`/todos/${id}`)
  .send({
    text:text,
    completed: true
  })
  .expect(200)
  .expect((res)=>{
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(true);
    expect(res.body.todo.completedAt).toBeA("number");
  })
  .end(done);

});
it("should clear completedAt when todo is not completed",(done)=>{

  var id =todos[1]._id.toHexString();
  var text ="This is the updated one";
  request(app)
  .patch(`/todos/${id}`)
  .send({
    text:text,
    completed: false
  })
  .expect(200)
  .expect((res)=>{
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(false);
    expect(res.body.todo.completedAt).toNotExist();
  })
  .end(done);
});

})


describe('GET /users/login',()=>{
  it('should return user if authenticated',(done)=>{
    request(app)
    .get('/users/login')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done); 
  });

  it('should return 401 if not authenticated',(done)=>{
    request(app)
    .get('/users/login')
    .expect(401)
    .expect((res)=>{
      expect(res.body).toEqual({});
    }).end(done);
  });
})


describe('Post /users',()=>{

it('should create a user ',(done)=>{

  var email="nk@gmail.com";
  var password="123abc!";

  request(app)
  .post('/users')
  .send({email,password})
  .expect(200)
  .expect((res)=>{
    expect(res.headers['x-auth']).toExist();
    expect(res.body._id).toExist();
    expect(res.body.email).toBe(email);
  })
  .end((error)=>{
    if(error){
      return done(error);
    }
    User.findOne({email}).then((user)=>{
      expect(user).toExist();
      expect(user.password).toNotBe(password);
      done();
    })
  });

})

it('it should return validation error if request invalid',(done)=>{
var email="invalids";
var password="123abc1!";
request(app)
.post('/users')
.send({email,password})
.expect(400)
.end(done);
})

it('it should not create user if email in use',(done)=>{

  request(app)
  .post("/users")
  .send({
    email:users[0].email,
    password:"Password12!"})
  .expect(400)
  .end(done);
})
})


describe("POST /users/login",()=>{

  it('should allow user to login',(done)=>{
    request(app)
    .post('/users/login')
    .send({
      email:users[1].email,
    password:users[1].password})
    .expect(200)
    .expect((res)=>{
      expect(res.headers['x-auth']).toExist();
    })
    .end((err,res)=>{
      if(err){
          return done(err);
      }
      User.findById(users[1]._id).then((user)=>{
        expect(user.tokens[0]).toInclude({
          access:'auth',
          token:res.headers['x-auth']
        });
        done();
      }).catch((err)=>done(e));
    })
  })

  it('should not allow login ',(done)=>{

    request(app)
    .post('/users/login')
    .send({
      email:users[1].email,
      password:"123"
    })
    .expect(401)
    .expect((res)=>{
      expect(res.headers['x-auth']).toNotExist();
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      done();
    })


  })
})