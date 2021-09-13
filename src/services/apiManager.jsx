import Cookies from "js-cookie";
import { fetchNutritionistLoginFailure, fetchNutritionistLoginLogout, fetchNutritionistLoginRequest, fetchNutritionistLoginSuccess } from "store/actions/nutritionistActions";
import { fetchNutritionistRegisterFailure, fetchNutritionistRegisterRequest, fetchNutritionistRegisterSuccess, fetchNutritionistRegisterUnregister } from "store/actions/nutritionistActions";
import { fetchNutritionistsFailure, fetchNutritionistsRequest, fetchNutritionistsSuccess } from "store/actions/nutritionistActions";
import { fetchPatientLoginFailure, fetchPatientLoginLogout, fetchPatientLoginRequest, fetchPatientLoginSuccess } from "store/actions/patientActions";
import { fetchPatientRegisterFailure, fetchPatientRegisterRequest, fetchPatientRegisterSuccess, fetchPatientRegisterUnregister } from "store/actions/patientActions";
import { fetchPatientsFailure, fetchPatientsRequest, fetchPatientsSuccess } from "store/actions/patientActions";


const baseUrl = "https://follownut-back.herokuapp.com";

// ------------------------------------------------------------------------------------------
// -------------------- BELOW ARE ALL THE NUTRITIONIST RELATED FUNCTIONS --------------------
// ------------------------------------------------------------------------------------------

// BELOW IS THE FUNCTION TO CREATE A NEW NUTRITIONIST
export const nutritionistRegisterFetch = (nutritionistData) => {
  return (dispatch) => {
    let token
    dispatch(fetchNutritionistRegisterRequest());
    fetch(baseUrl + "/api/nutritionist/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(nutritionistData),
    })
      .then((response) => {
        if (response.headers.get("authorization")) {
          token = response.headers.get("authorization").split("Bearer ")[1];
        }
        return response.json()
      })
      .then((response ) => {
        if (response.errors || response.error) {
          dispatch(fetchNutritionistRegisterFailure(response.errors));
        } else {
          Cookies.set("nutritionist_token_cookie", token);
          Cookies.set("nutritionist_id_cookie", response.data.id);
          dispatch(fetchNutritionistRegisterSuccess(response));
        }
      });
  };
};


// BELOW IS THE FUNCTION TO LOG IN A NUTRITIONIST
export const nutritionistLoginFetch = (nutritionistData) => {

  return (dispatch) => {
    let token;
    dispatch(fetchNutritionistLoginRequest());
    fetch(baseUrl + "/api/nutritionist/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(nutritionistData),
    })
      .then((response) => {
        if (response.headers.get("authorization")) {
        token = response.headers.get("authorization").split("Bearer ")[1];
        }
        return response.json();
      })
      .then((response) => {
        if (response.errors || response.error) {
          dispatch(fetchNutritionistLoginFailure(response.errors));
        } else {
          Cookies.set("nutritionist_token_cookie", token);
          Cookies.set('nutritionist_id_cookie',response.data.id);
          dispatch(fetchNutritionistLoginSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO LOG IN A NUTRITIONIST WITH COOKIES
export const loginNutritionistWithCookie = async() =>{
  const token = Cookies.get('nutritionist_token_cookie');
  const id = Cookies.get('nutritionist_id_cookie');

  const cookiesConfig = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(baseUrl + `/api/v1/nutritionists/${id}`, cookiesConfig)
  const cookieData = await response.json();
  if (!cookieData.error) {
    return true;
  } else {
    return false;
  }
};


// BELOW IS THE FUNCTION TO LOG OUT A NUTRITIONIST
export const nutritionistLogout = () => {
  return (dispatch) => {
    dispatch(fetchNutritionistRegisterUnregister())
    dispatch(fetchNutritionistLoginLogout())
  }
};

// BELOW IS THE FUNCTION TO FETCH ALL NUTRITIONISTS
export const nutritionistsFetch = () => {
  return (dispatch) => {
    dispatch(fetchNutritionistsRequest());
    fetch(baseUrl + "/api/v1/nutritionists", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchNutritionistsFailure(response.errors));
        } else {
          dispatch(fetchNutritionistsSuccess(response));
        }
      });
  };
};

// ------------------------------------------------------------------------------------------
// -------------------- BELOW ARE ALL THE PATIENT RELATED FUNCTIONS --------------------
// ------------------------------------------------------------------------------------------


// BELOW IS THE FUNCTION TO CREATE A NEW PATIENT
export const patientRegisterFetch = (patientData) => {
  return (dispatch) => {
    let token
    dispatch(fetchPatientRegisterRequest());
    fetch(baseUrl + "/api/patient/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(patientData),
    })
      .then((response) => {
        if (response.headers.get("authorization")) {
          token = response.headers.get("authorization").split("Bearer ")[1];
        }
        return response.json()
      })
      .then((response ) => {
        if (response.errors || response.error) {
          dispatch(fetchPatientRegisterFailure(response.errors));
        } else {
          Cookies.set("patient_token_cookie", token);
          Cookies.set("patient_id_cookie", response.data.id);
          dispatch(fetchPatientRegisterSuccess(response));
        }
      });
  };
};


// BELOW IS THE FUNCTION TO LOG IN A PATIENT
export const patientLoginFetch = (patientData) => {

  return (dispatch) => {
    let token;
    dispatch(fetchPatientLoginRequest());
    fetch(baseUrl + "/api/patient/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(patientData),
    })
      .then((response) => {
        if (response.headers.get("authorization")) {
        token = response.headers.get("authorization").split("Bearer ")[1];
        }
        return response.json();
      })
      .then((response) => {
        if (response.errors || response.error) {
          dispatch(fetchPatientLoginFailure(response.errors));
        } else {
          Cookies.set("patient_token_cookie", token);
          Cookies.set('patient_id_cookie',response.data.id);
          dispatch(fetchPatientLoginSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO LOG IN A PATIENT WITH COOKIES
export const loginPatientWithCookie = async() =>{
  const token = Cookies.get('patient_token_cookie');
  const id = Cookies.get('patient_id_cookie');

  const cookiesConfig = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(baseUrl + `/api/v1/patients/${id}`, cookiesConfig)
  const cookieData = await response.json();
  if (!cookieData.error) {
    return true;
  } else {
    return false;
  }
};


// BELOW IS THE FUNCTION TO LOG OUT A PATIENT
export const patientLogout = () => {
  return (dispatch) => {
    dispatch(fetchPatientRegisterUnregister())
    dispatch(fetchPatientLoginLogout())
  }
};

// BELOW IS THE FUNCTION TO FETCH ALL PATIENTS
export const patientsFetch = () => {
  return (dispatch) => {
    dispatch(fetchPatientsRequest());
    fetch(baseUrl + "/api/v1/patients", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchPatientsFailure(response.errors));
        } else {
          dispatch(fetchPatientsSuccess(response));
        }
      });
  };
};