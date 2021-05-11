
import app from "../index";
import supertest from "supertest";
const request = supertest(app);

let testData;
let id = "";
let createdAt = "";
let updatedAt = "";

  /**
 * Testing post a user endpoint by giving a existing user
 */ 
  describe('POST /api/users', () => {
    
    it("it should create a user", async () =>{
        const response = await request.post("/api/users")
        .send({
            
                organization: "PSG",
                products: [
                   "developers",
                   "pizza"
                ],
                marketValue: "90%",
                address: "sangotedo",
                ceo: "cn",
                country: "Taiwan",
                noOfEmployees: 2,
                employees: [
                   "james bond",
                   "jackie chan"
                ]
            
        })
        expect(response.status).toBe(201)
        testData = response.body;
        id = response.body.id;
        createdAt = response.body.createdAt;
    })
})
/**
 * Testing update a user endpoint by giving a existing user
 */ 
describe('PUT /api/users/:id', ()=>{
    it("it should update a user", async () =>{
        const response = await request.put(`/api/users/${id}`)
        expect(response.status).toBe(201)
    })
  })

  /**
 * Testing get a user endpoint by giving an existing user
 */ 
describe('GET /api/users/:id', () => {

    it("it should get a user", async () =>{
        const response = await request.get(`/api/users/${id}`)
        expect(response.status).toBe(200)
        updatedAt = response.body.updatedAt;
        expect (response.body).toStrictEqual(
            {
                organization: "PSG",
                createdAt: createdAt,
                updatedAt: updatedAt,
                products: [
                   "developers",
                   "pizza"
                ],
                marketValue: "90%",
                address: "sangotedo",
                ceo: "cn",
                country: "Taiwan",
                id: id,
                noOfEmployees: 2,
                employees: [
                   "james bond",
                   "jackie chan"
                ]
             }
        )
    })

})

/**
 * Testing get all users endpoint by giving the root url
 */ 
describe("GET /api/users", () => {

    it("it should get all users in the database", async () =>{
        const response = await request.get("/api/users")
        expect(response.status).toBe(200)
    })

})

/**
 * Testing get a user endpoint by giving a non-existing user
 */ 
 describe('GET /api/users/:id', () => {
    it('respond with json user not found', async () => {
        const response = await request.get("/api/users/0")
        expect(response.status).toBe(404)
    });
})

/**
 * Testing delete a user endpoint by giving an xisting user
 */ 
describe('DELETE /api/users/:id', () => {
    it('remove a user from the database', async () => {
        const response = await request.delete(`/api/users/${id}`);
        expect(response.status).toBe(204)
    });  
})

/**
 * Testing delete a user endpoint by giving a non-existing user
 */ 
describe('DELETE /api/users/:id', () => {
    it('remove a user from the database', async () => {
        const response = await request.delete("/api/users/0")
        expect(response.status).toBe(404)
    });  
})
