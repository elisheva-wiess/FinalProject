const BASE_URL = "/api/";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "אירעה שגיאה בשרת");
  }
  return response.json();
}

// התמחות
export async function fetchSpecializations() {
  const res = await fetch(`${BASE_URL}Specialization/GetAllSpecializations`);
  return handleResponse(res);
}

// התחברות
export async function login(id: string) {
  const res = await fetch(`${BASE_URL}WebsiteConnection/Login/${id}`);
  return handleResponse(res);
}

// הרשמה
export async function signUp(patient: any) {
  const res = await fetch(`${BASE_URL}WebsiteConnection/SignUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });
  return handleResponse(res);
}

// קבלת מטפלים לפי שם התמחות
export async function getTherapistsBySpecialization(name: string) {
  const res = await fetch(
    `${BASE_URL}Specialization/GetTherapistsBySpecializationName?name=${encodeURIComponent(name)}`
  );
  return handleResponse(res);
}

// יתווספו פונקציות נוספות לפי צורך...
