import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

const baseUrl = "http://localhost:8080";

const globalObject = {
  tokenJwt: "",
  accountNumber1: "",
  accountNumber2: "",
};

Deno.test("Create Account 1", async () => {
  const body = {
    "firstname": "Ichigo",
    "lastname": "Kurosaki",
    "password": "shinigami",
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

  globalObject.accountNumber1 = jsonResponse.data.account_number;
});

Deno.test("Create Account 2", async () => {
  const body = {
    "firstname": "Naruto",
    "lastname": "Uzumaki",
    "password": "shinobi",
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

  globalObject.accountNumber2 = jsonResponse.data.account_number;
});

Deno.test("Login", async () => {
  const body = {
    "account_number": globalObject.accountNumber1,
    "password": "shinigami",
  };

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

Deno.test("Update Account 1", async () => {
  const body = {
    "firstname": "Ichigo",
    "lastname": "Kurosaki",
    "balance": 100,
  };

  const response = await fetch(
    baseUrl + `/api/accounts/${globalObject.accountNumber1}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${globalObject.tokenJwt}`,
      },
      body: JSON.stringify(body),
    },
  );

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});

Deno.test("Transaction Account 1 to Account 2", async () => {
  const body = {
    "amount": 100,
    "fromAccountNumber": globalObject.accountNumber1,
    "toAccountNumber": globalObject.accountNumber2,
  };

  const response = await fetch(
    baseUrl + `/api/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${globalObject.tokenJwt}`,
      },
      body: JSON.stringify(body),
    },
  );

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.message, "Transaction successful");
});

Deno.test("Check transaction success Account 1", async () => {
  const response = await fetch(
    baseUrl + `/api/accounts/${globalObject.accountNumber1}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${globalObject.tokenJwt}`,
      },
    },
  );

  const jsonResponse = await response.json();
  const datas = jsonResponse.data;
  assertEquals(jsonResponse.success, true);
  assertEquals(datas.balance, 0);
});

Deno.test("Check transaction success Account 2", async () => {
  const response = await fetch(
    baseUrl + `/api/accounts/${globalObject.accountNumber2}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${globalObject.tokenJwt}`,
      },
    },
  );

  const jsonResponse = await response.json();
  const datas = jsonResponse.data;
  assertEquals(jsonResponse.success, true);
  assertEquals(datas.balance, 100);
});

Deno.test("Delete Accounts", async () => {
  const response = await fetch(
    baseUrl + `/api/accounts/${globalObject.accountNumber1}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${globalObject.tokenJwt}`,
      },
    },
  );

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);

  const response2 = await fetch(
    baseUrl + `/api/accounts/${globalObject.accountNumber2}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${globalObject.tokenJwt}`,
      },
    },
  );

  const jsonResponse2 = await response2.json();
  assertEquals(jsonResponse2.success, true);
});
