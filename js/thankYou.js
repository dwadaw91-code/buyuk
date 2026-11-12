// Birlashtirilgan Apps Script (Google Sheets + amoCRM) URL.
// amocrm-appscript.gs ni deploy qilib, /exec URL ni shu yerga qo'ying.
const APPSCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxdg8RK2oXrixptrvQCvZm2yTNqhKIALF_3XbaLI_xqZ9b-OqLPTpc8EAsNV13BFFupew/exec";

async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) {
    return;
  }

  const formDataObj = JSON.parse(formDataRaw);

  // Bitta so'rov — server ham Sheetga yozadi, ham amoCRM'ga yuboradi.
  const data = new FormData();
  data.append("sheetName", "Lead");
  data.append("Ism", formDataObj.Ism);
  data.append("Telefon raqam", formDataObj.TelefonRaqam);
  data.append("Royhatdan o'tgan vaqti", formDataObj.SanaSoat);

  try {
    const response = await fetch(APPSCRIPT_URL, {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      localStorage.removeItem("formData");
    } else {
      throw new Error("Apps Script response was not ok");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    const err = document.getElementById("errorMessage");
    if (err) err.style.display = "block";
  }
}

// Send data when page loads
window.onload = sendFormData;
