import { assertEquals} from "https://deno.land/std@0.165.0/testing/asserts.ts";

const baseUrl = "http://localhost:8080"

Deno.test("Create Account", async () => {
  const body = {
    "account_number" : 12966372819,
    "firstname" : "Ichigo",
    "lastname" : "Kurosaki",
    "balance" : 100
  };

  const response = await fetch(baseUrl + '/api/accounts', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});

Deno.test("Create Account Already Created", async () => {
  const body = {
    "account_number" : 12966372819,
    "firstname" : "Ichigo",
    "lastname" : "Kurosaki",
    "balance" : 100
  };

  const response = await fetch(baseUrl + '/api/accounts', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, false);
});

Deno.test("Get All Account", async() => {
  const response = await fetch(baseUrl + '/api/accounts');
  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});

Deno.test("Get Account by num account", async() => {
  const response = await fetch(baseUrl + '/api/accounts/12966372819');
  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});

Deno.test("Get Account by num account not found", async() => {
  const response = await fetch(baseUrl + '/api/accounts/1296632819');
  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, false);
});

Deno.test("Update Account by num account", async() => {
  const body = {
    "firstname" : "Ichigo",
    "lastname" : "Kurosaki",
    "balance" : 100
  };

  const response = await fetch(baseUrl + '/api/accounts/12966372819', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});

Deno.test("Delete Account by num account", async() => {
  const response = await fetch(baseUrl + '/api/accounts/12966372819', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const jsonResponse = await response.json();
  assertEquals(jsonResponse.success, true);
});