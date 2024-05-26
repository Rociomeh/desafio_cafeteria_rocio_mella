const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Test get", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        const body = response.body;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        expect(typeof body[0]).toBe("object");
    });

    it("Test delete", async () => {
        const nonExistentId = 999;
        const response = await request(server).delete(`/cafes/${nonExistentId}`).set('Authorization', 'Bearer someToken').send();
        const status = response.statusCode;
        expect(status).toBe(404);
    });

    it("Test post", async () => {
        const newCafe = { id: 5, nombre: "Café con leche", descripcion: "Delicioso café recién hecho" };
        const response = await request(server).post("/cafes").send(newCafe);
        const status = response.statusCode;
        const body = response.body;
        expect(status).toBe(201);
        expect(Array.isArray(body)).toBe(true);
        expect(body.find(cafe => cafe.id === newCafe.id)).toBeTruthy();
    });

    it("Test put", async () => {
        const cafeId = 1;
        const payload = { id: 2, nombre: "Amaretto", descripcion: "Descripción actualizada" };
        const response = await request(server).put(`/cafes/${cafeId}`).send(payload);
        const status = response.statusCode;
        expect(status).toBe(400);
    });
});