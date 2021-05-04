"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    fs_1.default.readFile("./database.json", "utf-8", function (err, data) {
        if (err) {
            return res.status(404).send("Database does not exist");
        }
        else {
            res.status(200).json(JSON.parse(data));
        }
    });
});
router.get("/:id", (req, res) => {
    fs_1.default.readFile("./database.json", "utf-8", function (err, data) {
        const id = Number(req.params.id);
        if (err) {
            return res.status(404).send("Database does not exist");
        }
        else {
            let users = JSON.parse(data);
            let user = users.find((item) => item.id == id);
            if (!user) {
                return res.status(404).json("User not found");
            }
            else {
                res.status(200).json(user);
            }
        }
    });
});
router.post("/", (req, res) => {
    const body = req.body;
    fs_1.default.readFile('./database.json', "utf-8", (err, data) => {
        const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = body;
        if (!organization && !products && !marketValue && !address && !ceo && !country && !noOfEmployees && !employees) {
            return res.status(400).end("Input all required fields");
        }
        let newUser = {
            organization,
            createdAt: new Date(),
            updatedAt: new Date(),
            products,
            marketValue,
            address,
            ceo,
            country,
            id: 0,
            noOfEmployees,
            employees
        };
        if (err) {
            let result = [];
            newUser.id = 1;
            result.push(newUser);
            fs_1.default.writeFile("./database.json", JSON.stringify(result, null, 3), (err) => {
                if (err) {
                    return res.end("Error creating new user. Try again");
                }
                else {
                    console.log("Fileß written successfully");
                    res.status(201).json(newUser);
                }
            });
        }
        else {
            let users = JSON.parse(data);
            newUser.id = users[users.length - 1].id + 1;
            users.push(newUser);
            fs_1.default.writeFile("./database.json", JSON.stringify(users, null, 3), (err) => {
                if (err) {
                    return res.end("Error creating new user. Try again");
                }
                else {
                    res.status(201).json(newUser);
                }
            });
        }
    });
});
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    fs_1.default.readFile('./database.json', 'utf-8', function (err, data) {
        const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = body;
        //if(!organization && !products && !marketValue && !address && !ceo &&! country && !noOfEmployees && !employees){return res.status(400).end("Input all required fields")}
        if (err) {
            res.status(404).end("Database does not exist");
        }
        else {
            let users = JSON.parse(data);
            let user = users.find((item) => item.id == id);
            if (!user) {
                return res.status(404).end("User not found");
            }
            else {
                user.organization = organization || user.organization;
                user.updatedAt = new Date();
                user.products = products || user.products;
                user.marketValue = marketValue || user.marketValue;
                user.address = address || user.address;
                user.ceo = ceo || user.ceo;
                user.country = country || user.country;
                user.noOfEmployees = noOfEmployees || user.noOfEmployees;
                user.employees = employees || user.employees;
                fs_1.default.writeFile('./database.json', JSON.stringify(users, null, 3), (err) => {
                    if (err) {
                        return res.end("Error updating user. Try again");
                    }
                    else {
                        console.log("File written successfully");
                    }
                });
                res.status(201).json(user);
            }
        }
    });
});
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    fs_1.default.readFile('./database.json', 'utf-8', function (err, data) {
        if (err) {
            return res.status(400).end("Database does not exist");
        }
        else {
            let users = JSON.parse(data);
            let userIndex = users.findIndex((item) => item.id == id);
            if (userIndex === -1) {
                return res.status(404).end("User not found");
            }
            else {
                users.splice(userIndex, 1);
                fs_1.default.writeFile('./database.json', JSON.stringify(users, null, 3), (err) => {
                    if (err) {
                        return res.end("Error creating new user. Try again");
                    }
                    else {
                        res.status(204).send();
                    }
                });
            }
        }
    });
});
exports.default = router;
