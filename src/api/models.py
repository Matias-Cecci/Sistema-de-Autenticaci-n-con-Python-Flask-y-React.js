from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    pets = db.relationship("Pet", backref="user")
#    def __repr__(self):
#        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    breed = db.Column(db.String(250), unique=False, nullable=False)
    sterilized = db.Column(db.Boolean, unique=False, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)

    def serialize(self):
        return {
            "name": self.name,
            "age": self.age,
            "breed": self.breed,
            "sterilized": self.sterilized,
            "id": self.id
        }