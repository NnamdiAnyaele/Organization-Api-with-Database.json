
import app from "../index";
import supertest from "supertest";
const request = supertest(app);

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
    })

})

/**
 * Testing update a user endpoint by giving a existing user
 */ 
describe('PUT /api/users/:id', ()=>{
    it("it should update a user", async () =>{
        const response = await request.put("/api/users/4")
        expect(response.status).toBe(201)
    })
  })

  /**
 * Testing get a user endpoint by giving an existing user
 */ 
describe('GET /api/users/:id', () => {

    it("it should get a user", async () =>{
        const response = await request.get("/api/users/1")
        expect(response.status).toBe(200)
        expect (response.body).toStrictEqual(
            {
                organization: "node ninja",
                createdAt: "2020-08-12T19:04:55.455Z",
                updatedAt: "2020-08-12T19:04:55.455Z",
                products: [
                   "developers",
                   "pizza"
                ],
                marketValue: "90%",
                address: "sangotedo",
                ceo: "cn",
                country: "Taiwan",
                id: 1,
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
 describe('GET /api/users/:id', async () => {
    it('respond with json user not found', async () => {
        const response = await request.get("/api/users/56")
        expect(response.status).toBe(404)
    });
})

/**
 * Testing delete a user endpoint by giving an xisting user
 */ 
describe('DELETE /api/users/:id', async () => {
    it('remove a user from the database', async () => {
        const response = await request.delete("/api/users/9")
        expect(response.status).toBe(204)
    });  
})

/**
 * Testing delete a user endpoint by giving a non-existing user
 */ 
describe('DELETE /api/users/:id', async () => {
    it('remove a user from the database', async () => {
        const response = await request.delete("/api/users/87")
        expect(response.status).toBe(404)
    });  
})
