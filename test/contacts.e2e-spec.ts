import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ContactsModule } from '../src/contacts/contacts.module';
import { ContactsService } from '../src/contacts/contacts.service';

describe('ContactsController (e2e)', () => {
  let app: INestApplication;
  let contact = { name: "Test", email: "test@test.com", age: 12, phone: 456321, tag: "123nieco" };
  let contact2 = { id: "0", name: "Test", email: "test@test.com", age: 12, phone: 456321, tag: "something" };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ContactsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/contacts (GET all contacts)', (done) => {
    return request(app.getHttpServer())
      .get('/contacts')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual([contact2])
        done();
    })
  });

  it('/contacts (POST create contact)', (done) => {
    return request(app.getHttpServer())
      .post('/contacts')
      .send(contact)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).toEqual({ message: "Contact created" })
        done();
      })
  });

  it('/:id/detail (GET contact by id)', (done) => {
    return request(app.getHttpServer())
      .get('/contacts/0/detail')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual(contact2)
        done();
      })
  });
  it('/filter (GET contact by filter)', (done) => {
    return request(app.getHttpServer())
      .get('/contacts/filter/?tag=something')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual(contact2)
        done();
      })
  });
  it('/contacts (Update contact)', (done) => {
    return request(app.getHttpServer())
      .put('/contacts/0')
      .send(contact)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({ message: "Contact updated"})
        done();
      })
  });
  it('/contacts (Update contact param)', (done) => {
    return request(app.getHttpServer())
      .patch('/contacts/0')
      .send({ tag: "abc" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({ message: "Contact param updated"})
        done();
      })
  });
  it('/contacts (Update contact param)', (done) => {
    return request(app.getHttpServer())
      .delete('/contacts/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({ message: "Contact deleted"})
        done();
      })
  });

});
