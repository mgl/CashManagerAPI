import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

const baseUrl = "http://localhost:8080";

const globalObject = {
  tokenJwt: '',
  accountNumber: '',
  firstname: 'Ichigo',
  lastname: 'Kurosaki',
  password: "shinigami",
  balance: 0
};

Deno.test("Create Account", async () => {
  const body = {
    "firstname": globalObject.firstname,
    "lastname": globalObject.lastname,
    "password": globalObject.password
  };

  const response = await fetch(baseUrl + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
  assertEquals(jsonResponse.message, "Account created successfully");

  globalObject.accountNumber = jsonResponse.data.account_number
  
});

Deno.test("Login", async () => {
  const body = {
    "account_number": globalObject.accountNumber,
    "password": globalObject.password,
  };

  console.log(globalObject);

  const response = await fetch(baseUrl + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const jsonResponse = await response.json();
  globalObject.tokenJwt = jsonResponse.token;

  assertEquals(jsonResponse.success, true);
  assertEquals(jsonResponse.message, "Successfully logged in");
  assertEquals(jsonResponse.token, globalObject.tokenJwt);
});

Deno.test("Update Account", async () => {
  const body = {
    "firstname": "Naruto",
    "lastname": "Uzumaki",
    "balance": 100
  }

  globalObject.firstname = body.firstname;
  globalObject.lastname = body.lastname;
  globalObject.balance = body.balance;

  const response = await fetch(baseUrl + `/api/accounts/${globalObject.accountNumber}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${globalObject.tokenJwt}`
    },
    body: JSON.stringify(body),
  });

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});

Deno.test("Get Account", async () => {
  const response = await fetch(baseUrl + `/api/accounts/${globalObject.accountNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${globalObject.tokenJwt}`
    },
  });

  const jsonResponse = await response.json();
  const datas = jsonResponse.data
  assertEquals(jsonResponse.success, true);
  assertEquals(datas.account_number, globalObject.accountNumber);
  assertEquals(datas.balance, globalObject.balance);
  assertEquals(datas.firstname, globalObject.firstname);
  assertEquals(datas.lastname, globalObject.lastname);
});

Deno.test("Get All Accounts", async () => {
  const response = await fetch(baseUrl + `/api/accounts/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${globalObject.tokenJwt}`
    },
  });

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});

Deno.test("Delete Account by num account", async () => {
  const response = await fetch(baseUrl + `/api/accounts/${globalObject.accountNumber}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${globalObject.tokenJwt}`
    },
  });

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});
